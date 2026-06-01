package io.sotaro.backend.controller;

import io.sotaro.backend.model.CountryDto;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Sql(scripts = "/test_populate_countries.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/test_populate_airports.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/clean_up.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class CountryControllerIntegrationTest extends BaseIntegrationTest {

    private static final String BASE_URI = "/api/countries";

    @Nested
    class GetCountryByCountryIso2 {
        @Test
        void whenFindByCorrectIso2_thenReturnCorrectDto() throws Exception {
            ResultActions resultActions = mockMvc.perform(get(BASE_URI + "/US"))
                    .andDo(print())
                    .andExpect(status().isOk());
            MvcResult result = resultActions.andReturn();
            String contentAsString = result.getResponse().getContentAsString();
            CountryDto resultDto = objectMapper.readValue(contentAsString, CountryDto.class);
            assertEquals("US", resultDto.countryIso2());
            assertEquals("United States", resultDto.countryName());
            assertEquals("Washington", resultDto.capital());
            assertEquals(3, resultDto.totalNumberOfAirports());
        }

        @Test
        void whenFindByNonExistingIso2_thenThrowNotFoundException() throws Exception {
            ResultActions resultActions = mockMvc.perform(get(BASE_URI + "/XY"))
                    .andDo(print())
                    .andExpect(status().isNotFound());
        }

    }

}
