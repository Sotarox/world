package io.sotaro.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserSignInDto (
        @NotBlank
//        @Size(min = 3, max = 20)
//        @Pattern(regexp = "^[\\x20-\\x7E]+$", message = "Username must contain only ASCII characters")
        String mail,
        @NotBlank
        @Size(min = 3, max = 100)
        @Pattern(regexp = "^[\\x20-\\x7E]+$", message = "Password must contain only ASCII characters")
        String password
){}
