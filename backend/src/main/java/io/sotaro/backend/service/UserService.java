package io.sotaro.backend.service;

import io.sotaro.backend.model.UserDto;
import io.sotaro.backend.model.UserEntity;
import io.sotaro.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getCurrentUser(String mail) {
        UserEntity userEntity = userRepository.findByMail(mail);
        return new UserDto(
                userEntity.getMail(),
                userEntity.getUsername()
        );
    }
}
