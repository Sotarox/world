package io.sotaro.backend.configuration;

import io.sotaro.backend.exception.*;
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

import static io.sotaro.backend.util.ErrorDtoBuilder.buildErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDto> handleResourceNotFoundException(HttpServletRequest req, ResourceNotFoundException ex) {
        return buildErrorResponse(req, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND,
                "Resource Not Found");
    }

    // For path/query/request-body parameter validation
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ MethodArgumentNotValidException.class, HandlerMethodValidationException.class, ConstraintViolationException.class })
    public ResponseEntity<ErrorDto> handleValidationException(HttpServletRequest req, Exception ex){
        return buildErrorResponse(req, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST,
                "Invalid format is used in request parameter");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MailAlreadyTakenException.class })
    public ResponseEntity<ErrorDto> handleMailAlreadyTakenException(HttpServletRequest req, Exception ex){
        return buildErrorResponse(req, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST, ex.getMessage());
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler({MailNotVerifiedException.class })
    public ResponseEntity<ErrorDto> handleMailNotVerifiedException(HttpServletRequest req, Exception ex){
        return buildErrorResponse(req, HttpStatus.FORBIDDEN, ErrorCode.EMAIL_NOT_VERIFIED, ex.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({InvalidMailVerifyTokenException.class })
    public ResponseEntity<ErrorDto> handleInvalidMailVerifyTokenException(HttpServletRequest req, Exception ex){
        return buildErrorResponse(req, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST, ex.getMessage());
    }

}
