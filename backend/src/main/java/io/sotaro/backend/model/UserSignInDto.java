package io.sotaro.backend.model;

import jakarta.validation.constraints.NotBlank;

public record UserSignInDto (
        @NotBlank String username,
        @NotBlank String password
){}
