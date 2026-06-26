package io.sotaro.backend.util;

import io.sotaro.backend.model.ErrorDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

public class ErrorDtoBuilder {
    public static ResponseEntity<ErrorDto> buildErrorResponse(HttpServletRequest req, Exception ex, HttpStatus httpStatus, String errorMessage) {
        ErrorDto errorDto = new ErrorDto(
                errorMessage,
                String.join(" ", req.getMethod(), req.getRequestURI()),
                ex.getMessage(),
                LocalDateTime.now().toString()
        );
        return ResponseEntity
                .status(httpStatus)
                .body(errorDto);
    }

    // Overloaded method for cases where exception is not needed
    public static ResponseEntity<ErrorDto> buildErrorResponse(HttpServletRequest req, HttpStatus httpStatus, String errorMessage) {
        ErrorDto errorDto = new ErrorDto(
                errorMessage,
                String.join(" ", req.getMethod(), req.getRequestURI()),
                null,
                LocalDateTime.now().toString()
        );
        return ResponseEntity
                .status(httpStatus)
                .body(errorDto);
    }
}
