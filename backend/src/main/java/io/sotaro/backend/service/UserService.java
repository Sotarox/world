package io.sotaro.backend.service;

import io.sotaro.backend.exception.MailAlreadyTakenException;
import io.sotaro.backend.exception.MailNotVerifiedException;
import io.sotaro.backend.model.MessageDto;
import io.sotaro.backend.model.UserDto;
import io.sotaro.backend.model.UserEntity;
import io.sotaro.backend.model.UserSignInDto;
import io.sotaro.backend.repository.UserRepository;
import io.sotaro.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final MailService mailService;
    private final PasswordEncoder encoder;

    @Value("${custom.base-url}")
    private String baseUrl;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, MailService mailService, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.mailService = mailService;
        this.encoder = encoder;
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
        String verifyUrl = baseUrl + "/verify-email?token=" +
                URLEncoder.encode(token, StandardCharsets.UTF_8);

        String message = "Click below to verify your email:\n" + verifyUrl;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailService.sendSimpleMail(mail, "Verify your email", message);
    }

    public void checkMailAlreadyVerified(String mail) {
        UserEntity user = userRepository.findByMail(mail);
        if (!user.isVerified()) {
            throw new MailNotVerifiedException();
        }
    }

    public ResponseEntity<MessageDto> handleMailVerification(String token) {
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

    public ResponseEntity<MessageDto> registerUser(UserSignInDto user){
        if (userRepository.existsByMail(user.mail())) {
            throw new MailAlreadyTakenException();
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
        sendVerificationEmail(user.mail());
        MessageDto messageDto = new MessageDto("User registered successfully!");
        return ResponseEntity.ok(messageDto);
    }

}
