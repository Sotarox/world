package io.sotaro.backend.controller;

import io.sotaro.backend.model.UserDto;
import io.sotaro.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        // Get mail address from UserDetails
        String mail = userDetails.getUsername();
        UserDto userDto = userService.getCurrentUser(mail);
        return ResponseEntity.ok(userDto);
    }
}
