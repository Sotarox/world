package io.sotaro.backend.exception;


import org.springframework.security.core.AuthenticationException;

public class MailNotFoundException extends AuthenticationException {
    public MailNotFoundException(String message) {
        super(message);
    }
}
