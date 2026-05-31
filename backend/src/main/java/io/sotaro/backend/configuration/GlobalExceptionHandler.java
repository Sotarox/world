package io.sotaro.backend.configuration;

import io.sotaro.backend.exception.ResourceNotFoundException;
import io.sotaro.backend.model.ErrorDto;
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

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDto> handleResourceNotFoundException(HttpServletRequest req, ResourceNotFoundException ex) {
        return buildResponseBody(req, ex, HttpStatus.NOT_FOUND,
                "Resource Not Found");
    }

    // For path/query/request-body parameter validation
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ MethodArgumentNotValidException.class, HandlerMethodValidationException.class, ConstraintViolationException.class })
    public ResponseEntity<ErrorDto> handleValidationException(HttpServletRequest req, Exception ex){
        return buildResponseBody(req, ex, HttpStatus.BAD_REQUEST,
                "Invalid format is used in request parameter");
    }

    private ResponseEntity<ErrorDto> buildResponseBody(HttpServletRequest req, Exception ex, HttpStatus httpStatus, String errorMessage) {
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
}
