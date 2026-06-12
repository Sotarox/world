package io.sotaro.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
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
}
