package io.sotaro.backend.model;
import jakarta.validation.constraints.NotBlank;

public record MailRequestDto(
        @NotBlank String title,
        @NotBlank String description
) {}
