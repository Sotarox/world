package io.sotaro.backend.service;

import io.sotaro.backend.model.MessageDto;
import io.sotaro.backend.model.UserDto;
import io.sotaro.backend.model.UserEntity;
import io.sotaro.backend.repository.UserRepository;
import io.sotaro.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final MailService mailService;

    @Value("${custom.base-url}")
    private String baseUrl;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, MailService mailService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.mailService = mailService;
    }

    public UserDto getCurrentUser(String mail) {
        UserEntity userEntity = userRepository.findByMail(mail);
        return new UserDto(
                userEntity.getMail(),
                userEntity.getUsername()
        );
    }

    public void sendVerificationEmail(String mail) {
        String token = jwtUtil.generateVerificationToken(mail);
        String verifyUrl = baseUrl + "/api/auth/verify?token=" +
                URLEncoder.encode(token, StandardCharsets.UTF_8);

        String message = "Click below to verify your email:\n" + verifyUrl;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailService.sendSimpleMail(mail, "Verify your email", message);
    }

    public ResponseEntity<MessageDto> handleVerification(String token) {
        String mailAddress = jwtUtil.getMailFromToken(token);
        UserEntity user = userRepository.findByMail(mailAddress);

        if (user.isVerified()) {
            MessageDto messageDto = new MessageDto("Email is already verified");
            return ResponseEntity.badRequest().body(messageDto);
        }

        user.setVerified(true);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageDto("Email verification successful"));
    }
}
