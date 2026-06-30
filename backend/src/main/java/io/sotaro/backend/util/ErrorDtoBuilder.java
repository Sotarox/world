package io.sotaro.backend.util;

import io.sotaro.backend.exception.ErrorCode;
import io.sotaro.backend.model.ErrorDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

public class ErrorDtoBuilder {
    public static ResponseEntity<ErrorDto> buildErrorResponse(HttpServletRequest req, HttpStatus httpStatus, ErrorCode errorCode, Exception ex) {
        ErrorDto errorDto = ErrorDto.builder()
                .errorCode(errorCode)
                .errorMessage(ex.getMessage())
                .endpoint(String.join(" ", req.getMethod(), req.getRequestURI()))
                .timestamp(LocalDateTime.now().toString())
                .build();
        return ResponseEntity
                .status(httpStatus)
                .body(errorDto);
    }

    // Overloaded method for cases where exception is not needed
    public static ResponseEntity<ErrorDto> buildErrorResponse(HttpServletRequest req, HttpStatus httpStatus, ErrorCode errorCode, String errorMessage) {
        ErrorDto errorDto = ErrorDto.builder()
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .endpoint(String.join(" ", req.getMethod(), req.getRequestURI()))
                .timestamp(LocalDateTime.now().toString())
                .build();
        return ResponseEntity
                .status(httpStatus)
                .body(errorDto);
    }
}
