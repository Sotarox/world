package io.sotaro.backend.exception;


public class MailAlreadyTakenException extends RuntimeException {
    public MailAlreadyTakenException() {

        super("Mail address is already taken by another user");
    }
}
