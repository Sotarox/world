package io.sotaro.backend.controller;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.jdbc.Sql;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Sql(scripts = "/test_populate_users.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/clean_up.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class AdminControllerIntegrationTest extends BaseSecurityIntegrationTest {

    private final String AUTHORIZATION_REQUIRED_URI = "/api/admin/test";

    @Nested
    class AuthorizationRequiredEndpoint {

        @Test
        void whenAccessWithoutToken_thenReturnUnauthorized() throws Exception {
            mockMvc.perform(get(AUTHORIZATION_REQUIRED_URI))
                    .andExpect(status().isUnauthorized());
        }

        @Test
        void whenAccessWithRoleUser_thenReturnForbidden() throws Exception {
            String jwtToken = jwtUtil.generateToken("example1@test.com");

            mockMvc.perform(get(AUTHORIZATION_REQUIRED_URI)
                            .cookie(new Cookie("jwtToken", jwtToken)))
                    .andExpect(status().isForbidden());
        }

        @Test
        void whenAccessWithRoleAdmin_thenReturnSuccess() throws Exception {
            String jwtToken = jwtUtil.generateToken("admin@test.com");

            mockMvc.perform(get(AUTHORIZATION_REQUIRED_URI)
                            .cookie(new Cookie("jwtToken", jwtToken)))
                    .andExpect(status().isOk());
        }
    }
}
