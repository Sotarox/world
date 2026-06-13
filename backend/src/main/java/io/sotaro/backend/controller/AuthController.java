package io.sotaro.backend.controller;

import io.sotaro.backend.model.MessageDto;
import io.sotaro.backend.model.TokenDto;
import io.sotaro.backend.model.UserEntity;
import io.sotaro.backend.model.UserSignInDto;
import io.sotaro.backend.repository.UserRepository;
import io.sotaro.backend.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<TokenDto> authenticateUser(@Valid @RequestBody UserSignInDto user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        // Use mail address instead of username
                        user.mail(),
                        user.password()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        TokenDto tokenDto = new TokenDto(
                jwtUtil.generateToken(userDetails.getUsername()),
                "Bearer",
                userDetails.getUsername() // Return mail address instead of username
                );
        return ResponseEntity.ok(tokenDto);
    }
    @PostMapping("/signup")
    public ResponseEntity<MessageDto> registerUser(@Valid @RequestBody UserSignInDto user) {
        if (userRepository.existsByMail(user.mail())) {
            MessageDto messageDto = new MessageDto("Error: Mail address is already taken!");
            return ResponseEntity.badRequest().body(messageDto);
        }
        // Create new user's account
        UserEntity newUserEntity = new UserEntity(
                null,
                user.mail(),
                null,
                encoder.encode(user.password())
        );
        userRepository.save(newUserEntity);
        MessageDto messageDto = new MessageDto("User registered successfully!");
        return ResponseEntity.ok(messageDto);
    }

    @GetMapping("/test/user")
    public ResponseEntity<MessageDto> userAccess() {
        MessageDto messageDto = new MessageDto("Only authenticated users can see this.");
        return ResponseEntity.ok(messageDto);
    }
}
