package io.sotaro.backend.controller;

import io.sotaro.backend.model.UserEntity;
import io.sotaro.backend.model.UserSignInDto;
import io.sotaro.backend.repository.UserRepository;
import io.sotaro.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/signin")
    public String authenticateUser(@RequestBody UserSignInDto user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.username(),
                        user.password()
                )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtil.generateToken(userDetails.getUsername());
    }
    @PostMapping("/signup")
    public String registerUser(@RequestBody UserSignInDto user) {
        if (userRepository.existsByUsername(user.username())) {
            return "Error: Username is already taken!";
        }
        // Create new user's account
        UserEntity newUserEntity = new UserEntity(
                null,
                user.username(),
                encoder.encode(user.password())
        );
        userRepository.save(newUserEntity);
        return "User registered successfully!";
    }

    @GetMapping("/test/user")
    public String userAccess() {
        return "Only authenticated users can see this.";
    }
}
