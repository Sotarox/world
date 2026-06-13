package io.sotaro.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserSignInDto (

        @Schema(description = "User's email address", example = "test@test.com")
        @NotBlank
        @Email()
        String mail,

        @Schema(description = "User's password", example = "test1")
        @NotBlank
        @Size(min = 3, max = 100)
        @Pattern(regexp = "^[\\x20-\\x7E]+$", message = "Password must contain only ASCII characters")
        String password
){}
