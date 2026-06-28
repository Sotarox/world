package io.sotaro.backend.model;

import io.sotaro.backend.exception.ErrorCode;
import lombok.Builder;

@Builder
public record ErrorDto(
        ErrorCode errorCode,
        String errorMessage,
        String endpoint,
        String timestamp
) {
}
