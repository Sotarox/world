package io.sotaro.backend.model;

public record JwtLifespanDto(
        long expiresAtEpochMs
) {
}
