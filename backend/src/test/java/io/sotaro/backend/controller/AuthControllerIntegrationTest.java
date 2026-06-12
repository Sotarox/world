package io.sotaro.backend.controller;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Sql(scripts = "/test_populate_users.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/clean_up.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class AuthControllerIntegrationTest extends BaseSecurityIntegrationTest {

    private final String BASE_URI = "/api/auth";
    private final String SIGNUP_URI = BASE_URI + "/signup";
    private final String SIGNIN_URI = BASE_URI + "/signin";
    private final String AUTH_TEST_URI = BASE_URI + "/test/user";

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
    class Signin {
        @Test
        void whenSigninWithValidCredentials_thenReturnJwtToken() throws Exception {
            String requestBody = """
                    {
                        "mail": "example1@test.com",
                        "password": "password1"
                    }
                    """;
            MvcResult result = mockMvc.perform(post(SIGNIN_URI)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andReturn();

            String responseContent = result.getResponse().getContentAsString();
            assertTrue(responseContent.contains("token"));
        }

        @Test
        void whenSigninWithInvalidCredentials_thenReturnUnauthorized() throws Exception {
            String requestBody = """
                    {
                        "mail": "example1@test.com",
                        "password": "wrongpassword"
                    }
                    """;
            mockMvc.perform(post(SIGNIN_URI)
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
            // First, sign in to get a valid JWT token
            String requestBody = """
                    {
                        "mail": "example1@test.com",
                        "password": "password1"
                    }
                    """;
            MvcResult result = mockMvc.perform(post(SIGNIN_URI)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(requestBody))
                    .andExpect(status().isOk())
                    .andReturn();

            String contentAsString = result.getResponse().getContentAsString();
            String token = objectMapper.readTree(contentAsString).get("token").asText();

            // Now, access the protected endpoint with the token
            mockMvc.perform(get(AUTH_TEST_URI)
                            .header("Authorization", "Bearer " + token))
                    .andExpect(status().isOk());

        }

    }
}
