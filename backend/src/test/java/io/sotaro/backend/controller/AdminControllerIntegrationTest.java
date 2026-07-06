package io.sotaro.backend.controller;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Sql(scripts = "/test_populate_users.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/clean_up.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class AdminControllerIntegrationTest extends BaseSecurityIntegrationTest {

    private final String LOGIN_URI = "/api/auth/login";
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
            String requestBody = """
                    {
                        "mail": "example1@test.com",
                        "password": "password1"
                    }
                    """;
            MvcResult result = mockMvc.perform(post(LOGIN_URI)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andReturn();

            mockMvc.perform(get(AUTHORIZATION_REQUIRED_URI)
                            .cookie(result.getResponse().getCookie("jwtToken")))
                    .andExpect(status().isForbidden());

        }

        @Test
        void whenAccessWithRoleAdmin_thenReturnSuccess() throws Exception {
            String requestBody = """
                    {
                        "mail": "admin@test.com",
                        "password": "admin"
                    }
                    """;
            MvcResult result = mockMvc.perform(post(LOGIN_URI)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andReturn();

            mockMvc.perform(get(AUTHORIZATION_REQUIRED_URI)
                            .cookie(result.getResponse().getCookie("jwtToken")))
                    .andExpect(status().isOk());

        }
    }
}
