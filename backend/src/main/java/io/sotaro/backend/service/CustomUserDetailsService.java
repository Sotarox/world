package io.sotaro.backend.service;

import io.sotaro.backend.exception.MailNotFoundException;
import io.sotaro.backend.model.UserEntity;
import io.sotaro.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String mail) throws MailNotFoundException {
        UserEntity userEntity = userRepository.findByMail(mail);
        if (userEntity == null) {
            throw new MailNotFoundException("User Not Found by mail address: " + mail);
        }
        List<SimpleGrantedAuthority> authorities = switch (userEntity.getRole()) {
            // Admin's role is superset of User's role
            case "ADMIN" -> List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER")
            );
            case "USER" -> List.of(
                    new SimpleGrantedAuthority("ROLE_USER")
            );
            default -> throw new IllegalArgumentException("Unknown role: " + userEntity.getRole());
        };
        return new User(
                userEntity.getMail(),
                userEntity.getPassword(),
                authorities
        );
    }
}