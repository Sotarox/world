package io.sotaro.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.lang.Nullable;

public record UserUpdateDto(

        @Schema(description = "User's email address", example = "user@test.com", maxLength = 20)
        @Nullable
        @Email()
        String mail,

        @Schema(description = "User's name", example = "John Doe", maxLength = 20)
        @Nullable
        String username,

        @Schema(description = "User's password", example = "user")
        @Nullable
        @Size(min = 3, max = 100)
        @Pattern(regexp = "^[\\x20-\\x7E]+$", message = "Password must contain only ASCII characters")
        String password
){}
