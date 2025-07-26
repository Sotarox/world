package io.sotaro.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = "/test_populate_countries.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class CountryControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    private static final String BASE_URI = "/api/countries";

    @Test
    void given_when_thenReturnCorrectDto() throws Exception {
        mockMvc.perform(get(BASE_URI + "/US"))
                .andDo(print())
                .andExpect(status().isOk());
    }

}
