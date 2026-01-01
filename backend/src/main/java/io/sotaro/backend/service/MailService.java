package io.sotaro.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "mail.enabled", havingValue = "true")
public class MailService {

    private final String forwardTo;
    private final JavaMailSender mailSender;

    public MailService(
            @Value("${mail.forward.to}") String forwardTo,
            JavaMailSender mailSender
    ) {
        this.forwardTo = forwardTo;
        this.mailSender = mailSender;
    }


    public void sendSimpleMail(String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(forwardTo);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }

    public void sendHtmlMail(String to, String subject, String html) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true); // true = HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new IllegalStateException("Failed to send mail", e);
        }
    }
}
