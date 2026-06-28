package io.sotaro.backend.controller;

import io.sotaro.backend.exception.ErrorCode;
import io.sotaro.backend.model.*;
import io.sotaro.backend.repository.UserRepository;
import io.sotaro.backend.security.JwtUtil;
import io.sotaro.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static io.sotaro.backend.util.ErrorDtoBuilder.buildErrorResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${custom.cookie.secure:true}")
    private boolean isCookieSecure;

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserSignInDto user, HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        // Use mail address instead of username
                        user.mail(),
                        user.password()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        if (!userRepository.findByMail(user.mail()).isVerified()) {
            return buildErrorResponse(
                    request,
                    HttpStatus.FORBIDDEN,
                    ErrorCode.EMAIL_NOT_VERIFIED,
                    "Email address is not yet verified. Please check your inbox for the verification email."
            );
        }
        String token = jwtUtil.generateToken(userDetails.getUsername());
        Cookie cookie = new Cookie("jwtToken", token);
        cookie.setHttpOnly(true);
        if (isCookieSecure) { cookie.setSecure(true);}
        cookie.setPath("/");
        // Align cookie max age with JWT expiration time (in seconds)
        cookie.setMaxAge(jwtUtil.getExpirationInSecond());
        response.addCookie(cookie);
        return ResponseEntity.ok(new JwtLifespanDto(jwtUtil.getExpiresAtEpochMs(token)));
    }

    @GetMapping("/logout")
    public ResponseEntity<MessageDto> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwtToken", "");
        cookie.setHttpOnly(true);
        if (isCookieSecure) { cookie.setSecure(true); }
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok(new MessageDto("Log out successfully!"));
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageDto> registerUser(@Valid @RequestBody UserSignInDto user) {
        if (userRepository.existsByMail(user.mail())) {
            MessageDto messageDto = new MessageDto("Error: Mail address is already taken!");
            return ResponseEntity.badRequest().body(messageDto);
        }
        // Create new user's account
        UserEntity newUserEntity = UserEntity.builder()
                .id(null)
                .mail(user.mail())
                .username(null)
                .password(encoder.encode(user.password()))
                .isVerified(false)
                .build();
        userRepository.save(newUserEntity);
        userService.sendVerificationEmail(user.mail());
        MessageDto messageDto = new MessageDto("User registered successfully!");
        return ResponseEntity.ok(messageDto);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<MessageDto> verifyEmail(@RequestParam String token) {
        if (!jwtUtil.validateJwtToken(token)) {
            MessageDto messageDto = new MessageDto("Invalid or expired verification token");
            return ResponseEntity.badRequest().body(messageDto);
        }
        return userService.handleVerification(token);
    }

    @GetMapping("/test/protected")
    public ResponseEntity<MessageDto> userAccess() {
        MessageDto messageDto = new MessageDto("Only authenticated users can see this.");
        return ResponseEntity.ok(messageDto);
    }
}
