package io.sotaro.backend.model;

public record ErrorDto(
        String errorMessage,
        String endpoint,
        String exception,
        String timestamp
) {
}
