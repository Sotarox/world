package io.sotaro.backend.model;

public record TokenDto(
        String token,
        String type,
        String mail
) {
}
