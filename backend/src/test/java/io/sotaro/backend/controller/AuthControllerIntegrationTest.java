package io.sotaro.backend.controller;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Sql(scripts = "/test_populate_users.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/clean_up.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class AuthControllerIntegrationTest extends BaseSecurityIntegrationTest {

    private final String BASE_URI = "/api/auth";
    private final String SIGNUP_URI = BASE_URI + "/signup";
    private final String LOGIN_URI = BASE_URI + "/login";
    private final String AUTH_TEST_URI = BASE_URI + "/test/protected";

    @Nested
    class Signup {
        @Test
        void whenSignupWithValidCredentials_thenReturnOk() throws Exception {
            String requestBody = """
                    {
                        "mail": "new@test.com",
                        "password": "new-password"
                    }
                    """;
            mockMvc.perform(post(SIGNUP_URI)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk());
        }

        @Test
        void whenSignupWithExistingMail_thenReturnBadRequest() throws Exception {
            String requestBody = """
                    {
                        "mail": "example1@test.com",
                        "password": "password1"
                    }
                    """;
            mockMvc.perform(post(SIGNUP_URI)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    class Login {
        @Test
        void whenLoginWithValidCredentials_thenReturnJwtTokenInCookie() throws Exception {
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
                    .andExpect(cookie().exists("jwtToken"))
                    .andExpect(cookie().secure("jwtToken", true))
                    .andExpect(cookie().httpOnly("jwtToken", true))
                    .andReturn();

            String responseContent = result.getResponse().getContentAsString();
            assertTrue(responseContent.contains("expiresAtEpochMs"));
        }

        @Test
        void whenLoginWithInvalidCredentials_thenReturnUnauthorized() throws Exception {
            String requestBody = """
                    {
                        "mail": "example1@test.com",
                        "password": "wrongpassword"
                    }
                    """;
            mockMvc.perform(post(LOGIN_URI)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isUnauthorized());
        }
    }

    @Nested
    class ProtectedEndpoint {
        @Test
        void whenAccessProtectedEndpointWithoutToken_thenReturnUnauthorized() throws Exception {
            mockMvc.perform(get(AUTH_TEST_URI))
                    .andExpect(status().isUnauthorized());
        }

        @Test
        void whenAccessProtectedEndpointWithValidToken_thenReturnOk() throws Exception {
            // First, log in to get a valid JWT token
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

            // Now, access the protected endpoint with the token
            mockMvc.perform(get(AUTH_TEST_URI)
                            .cookie(result.getResponse().getCookie("jwtToken")))
                            .andExpect(status().isOk());

        }

    }
}
