package io.sotaro.backend.configuration;

import io.sotaro.backend.security.AuthEntryPointJwt;
import io.sotaro.backend.security.AuthTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
public class SecurityConfig {

    private final CustomCorsConfiguration customCorsConfiguration;
    private final AuthEntryPointJwt unauthorizedHandler;
    private final AuthTokenFilter authTokenFilter;
    private final String[] CSRF_DEACTIVATED_ENDPOINTS = {"/api/auth/login", "/api/auth/signup", "/api/auth/verify-email"};
    private final String[] PROTECTED_ENDPOINTS = {"/api/auth/test/protected", "/api/user/**"};

    public SecurityConfig(
            CustomCorsConfiguration customCorsConfiguration,
            AuthEntryPointJwt unauthorizedHandler,
            AuthTokenFilter authTokenFilter
    ) {
        this.customCorsConfiguration = customCorsConfiguration;
        this.unauthorizedHandler = unauthorizedHandler;
        this.authTokenFilter = authTokenFilter;
    }
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // CSRF cookie is required for POST, PUT, DELETE requests
                .csrf(csrf ->
                        csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                        .ignoringRequestMatchers(CSRF_DEACTIVATED_ENDPOINTS)
                )
                .cors(c -> c.configurationSource(customCorsConfiguration))
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(unauthorizedHandler)
                )
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                .requestMatchers(PROTECTED_ENDPOINTS).authenticated()
                                .anyRequest().permitAll()
                );
        // Add the JWT Token filter before the UsernamePasswordAuthenticationFilter
        httpSecurity.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
