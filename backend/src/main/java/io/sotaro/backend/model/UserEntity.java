package io.sotaro.backend.model;

import io.sotaro.backend.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String mail;

    @Column(unique = true, length = 20)
    private String username;

    @Column(nullable = false, length = 100)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private String password;

    @Column(name = "is_verified")
    private boolean isVerified;

    @Enumerated(EnumType.STRING)
    private UserRole role;
}
