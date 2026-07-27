package io.sotaro.backend.controller;

import io.sotaro.backend.model.MessageDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/test")
    public ResponseEntity<MessageDto> adminTest() {
        return ResponseEntity.ok(new MessageDto("You can access this endpoint because you are an admin!"));
    }
}
