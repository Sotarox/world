package io.sotaro.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.sotaro.backend.exception.ErrorCode;
import io.sotaro.backend.model.ErrorDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class AuthEntryPointJwt  implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    public AuthEntryPointJwt(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ErrorDto errorDto = ErrorDto.builder()
                .errorCode(ErrorCode.UNAUTHENTICATED)
                .errorMessage(authException.getMessage())
                .endpoint(String.join(" ", request.getMethod(), request.getRequestURI()))
                .timestamp(LocalDateTime.now().toString())
                .build();

        objectMapper.writeValue(response.getOutputStream(), errorDto);
    }
}