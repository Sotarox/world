package io.sotaro.backend.exception;


public class MailNotVerifiedException extends RuntimeException {
    public MailNotVerifiedException() {

        super("Email address is not yet verified. Please check your inbox for the verification email.");
    }
}
