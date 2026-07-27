package io.sotaro.backend.controller;

import io.sotaro.backend.exception.InvalidMailVerifyTokenException;
import io.sotaro.backend.model.JwtLifespanDto;
import io.sotaro.backend.model.MessageDto;
import io.sotaro.backend.model.UserSignInDto;
import io.sotaro.backend.security.JwtUtil;
import io.sotaro.backend.service.AuthService;
import io.sotaro.backend.service.CookieService;
import io.sotaro.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;
    @Autowired
    UserService userService;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    CookieService cookieService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody UserSignInDto user, HttpServletRequest request, HttpServletResponse response) {
        UserDetails userDetails = authService.authenticate(user);
        userService.checkMailAlreadyVerified(user.mail());
        String token = jwtUtil.generateToken(userDetails.getUsername());
        Cookie cookie = cookieService.createJwtCookie(token);
        response.addCookie(cookie);
        return ResponseEntity.ok(new JwtLifespanDto(jwtUtil.getExpiresAtEpochMs(token)));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageDto> logout(HttpServletResponse response) {
        Cookie logoutJwtCookie = cookieService.createLogoutJwtCookie();
        response.addCookie(logoutJwtCookie);
        Cookie logoutCsrfCookie = cookieService.createLogoutCSRFTokenCookie();
        response.addCookie(logoutCsrfCookie);
        return ResponseEntity.ok(new MessageDto("Log out successfully!"));
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageDto> registerUser(@Valid @RequestBody UserSignInDto user) {
        return userService.registerUser(user);
    }

    @GetMapping("/verify-email")
    public ResponseEntity<MessageDto> verifyEmail(@RequestParam String token) {
        if (!jwtUtil.validateJwtToken(token)) {
            throw new InvalidMailVerifyTokenException();
        }
        return userService.handleMailVerification(token);
    }

    @GetMapping("/test/protected")
    public ResponseEntity<MessageDto> userAccess() {
        MessageDto messageDto = new MessageDto("Only authenticated users can see this.");
        return ResponseEntity.ok(messageDto);
    }
}
