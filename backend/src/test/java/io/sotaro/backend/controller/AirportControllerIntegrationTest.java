package io.sotaro.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.sotaro.backend.model.AirportDto;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = "/test_populate_airports.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/clean_up.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class AirportControllerIntegrationTest {

    private static final String BASE_URI = "/api/airports";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    class GetAirportsByCountryIso2 {

        @Test
        void whenCountryHasAirports_thenReturnAirportDtos() throws Exception {
            MvcResult result = mockMvc.perform(get(BASE_URI + "/US"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andReturn();

            List<AirportDto> airports = objectMapper.readValue(
                    result.getResponse().getContentAsString(),
                    new TypeReference<>() {}
            );

            assertEquals(1472, airports.size());
            assertTrue(airports.stream().anyMatch(airport ->
                    "AAF".equals(airport.iataCode())
                            && "US".equals(airport.countryIso2())
                            && "Apalachicola Regional".equals(airport.airportName())
                            && "United States".equals(airport.countryName())
            ));
        }

        @Test
        void whenIso2IsLowerCase_thenNormalizeToUpperCase() throws Exception {
            MvcResult result = mockMvc.perform(get(BASE_URI + "/us"))
                    .andExpect(status().isOk())
                    .andReturn();

            List<AirportDto> airports = objectMapper.readValue(
                    result.getResponse().getContentAsString(),
                    new TypeReference<>() {}
            );

            assertFalse(airports.isEmpty());
            assertTrue(airports.stream().allMatch(airport -> "US".equals(airport.countryIso2())));
        }

        @Test
        void whenCountryHasNoAirports_thenReturnEmptyList() throws Exception {
            MvcResult result = mockMvc.perform(get(BASE_URI + "/ZZ"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andReturn();

            List<AirportDto> airports = objectMapper.readValue(
                    result.getResponse().getContentAsString(),
                    new TypeReference<>() {}
            );

            assertTrue(airports.isEmpty());
        }
    }
}
