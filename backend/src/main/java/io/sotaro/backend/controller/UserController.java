package io.sotaro.backend.controller;

import io.sotaro.backend.model.UserDto;
import io.sotaro.backend.model.UserEntity;
import io.sotaro.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        // Get mail address from UserDetails
        String mail = userDetails.getUsername();
        UserEntity userEntity = userRepository.findByMail(mail);
        UserDto userDto = new UserDto(
                userEntity.getMail(),
                userEntity.getUsername()
        );
        return ResponseEntity.ok(userDto);
    }
}
