package io.sotaro.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserDto(

        @Schema(description = "User's email address", example = "test@test.com")
        @NotBlank
        @Email()
        String mail,

        @Schema(description = "User's name", example = "John Doe")
        @Email()
        String username
){}
