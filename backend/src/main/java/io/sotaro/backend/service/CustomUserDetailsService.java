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
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority("ROLE_".concat(userEntity.getRole().name()));
        return new User(
                userEntity.getMail(),
                userEntity.getPassword(),
                List.of(authority)
        );
    }
}