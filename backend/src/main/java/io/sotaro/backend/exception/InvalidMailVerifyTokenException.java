package io.sotaro.backend.exception;


public class InvalidMailVerifyTokenException extends RuntimeException {
    public InvalidMailVerifyTokenException() {

        super("Email address is not yet verified. Please check your inbox for the verification email.");
    }
}
