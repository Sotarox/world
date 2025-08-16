package io.sotaro.backend.configuration;

import io.sotaro.backend.exception.ResourceNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFoundException(HttpServletRequest req, ResourceNotFoundException ex) {
        return buildResponseBody(req, ex, HttpStatus.NOT_FOUND,
                "Resource Not Found");
    }

    // For path/query/request-body parameter validation
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ MethodArgumentNotValidException.class, HandlerMethodValidationException.class, ConstraintViolationException.class })
    public ResponseEntity<Map<String, Object>> handleValidationException(HttpServletRequest req, Exception ex){
        return buildResponseBody(req, ex, HttpStatus.BAD_REQUEST,
                "Invalid format is used in request parameter");
    }

    private ResponseEntity<Map<String, Object>> buildResponseBody(HttpServletRequest req, Exception ex, HttpStatus httpStatus, String errorMessage) {
        Map<String, Object> body = new HashMap<>();
        body.put("Timestamp", LocalDateTime.now());
        body.put("Endpoint", String.join(" ", req.getMethod(), req.getRequestURI()));
        body.put("Error overview", errorMessage);
        body.put("Exception message", ex.getMessage());
        return ResponseEntity
                .status(httpStatus)
                .body(body);
    }
}
