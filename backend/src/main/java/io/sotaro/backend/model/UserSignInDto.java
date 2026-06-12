package io.sotaro.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserSignInDto (
        // Email regex from OWASP Validation Regex Repository
        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9_+&*-] + (?:\\\\.[a-zA-Z0-9_+&*-] + )*@(?:[a-zA-Z0-9-]+\\\\.) + [a-zA-Z]{2,7}", message = "Invalid email format")
        String mail,
        @NotBlank
        @Size(min = 3, max = 100)
        @Pattern(regexp = "^[\\x20-\\x7E]+$", message = "Password must contain only ASCII characters")
        String password
){}
