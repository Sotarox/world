package io.sotaro.backend.controller;

import io.sotaro.backend.model.MailRequestDto;
import io.sotaro.backend.service.MailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mail")
public class MailController {

    private final MailService mailService;

    @PostMapping("/inquiry")
    public void sendInquiryMail(@Valid @RequestBody MailRequestDto request) {
        mailService.sendSimpleMail(
                "bluceislee@gmail.com",
                request.title(),
                request.description()
        );
    }
}

