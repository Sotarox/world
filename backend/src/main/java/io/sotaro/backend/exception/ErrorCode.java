package io.sotaro.backend.exception;

// The purpose of this enum is the situation, where Frontend can
// multiple error reason for the same HTTP status code.
// For example login endpoint can return 403 for two different reasons:
// 1. User is not allowed to login because of wrong credentials
// 2. User is not allowed to login because of email is not validated yet
public enum ErrorCode {
    NOT_FOUND,
    BAD_REQUEST,
    UNAUTHENTICATED,
    FORBIDDEN,
    WRONG_CREDENTIALS,
    EMAIL_NOT_VERIFIED,
}
