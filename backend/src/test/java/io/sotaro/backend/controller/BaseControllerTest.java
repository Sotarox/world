package io.sotaro.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.sotaro.backend.configuration.CustomCorsConfiguration;
import io.sotaro.backend.configuration.SecurityConfig;
import io.sotaro.backend.security.AuthEntryPointJwt;
import io.sotaro.backend.security.AuthTokenFilter;
import io.sotaro.backend.security.JwtUtil;
import io.sotaro.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@Import({SecurityConfig.class,
        CustomCorsConfiguration.class,
        JwtUtil.class,
        AuthTokenFilter.class,
        CustomUserDetailsService.class,
        AuthEntryPointJwt.class
})
public abstract class BaseControllerTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;
}
