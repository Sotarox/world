package io.sotaro.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.sotaro.backend.config.TestMailConfig;
import io.sotaro.backend.model.AirportDto;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Import(TestMailConfig.class)
@AutoConfigureMockMvc(addFilters = false)
@Sql(scripts = "/test_populate_airports.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/clean_up.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class AirportControllerIntegrationTest {

    private static final String BASE_URI = "/api/airports";

    private static final Set<String> US_AIRPORT_IATA_CODES = Set.of("AAF", "ABE", "ABQ");
    private static final Set<String> DE_AIRPORT_IATA_CODES = Set.of("AAH", "AGB");

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    class GetAirportsByCountryIso2 {

        @Test
        void whenCountryHasAirports_thenReturnAllAirportsForThatCountry() throws Exception {
            List<AirportDto> airports = performGetAndParse(BASE_URI + "/US");

            assertEquals(3, airports.size());
            assertEquals(US_AIRPORT_IATA_CODES, iataCodes(airports));
            assertTrue(airports.stream().allMatch(airport -> "US".equals(airport.countryIso2())));
            assertTrue(airports.stream().allMatch(airport -> "United States".equals(airport.countryName())));

            AirportDto apalachicola = airports.stream()
                    .filter(airport -> "AAF".equals(airport.iataCode()))
                    .findFirst()
                    .orElseThrow();
            assertEquals("Apalachicola Regional", apalachicola.airportName());
            assertEquals("KAAF", apalachicola.icaoCode());
        }

        @Test
        void whenIso2IsLowerCase_thenNormalizeToUpperCase() throws Exception {
            List<AirportDto> airports = performGetAndParse(BASE_URI + "/us");

            assertEquals(3, airports.size());
            assertEquals(US_AIRPORT_IATA_CODES, iataCodes(airports));
        }

        @Test
        void whenGermanyHasAirports_thenReturnTwoGermanAirports() throws Exception {
            List<AirportDto> airports = performGetAndParse(BASE_URI + "/DE");

            assertEquals(2, airports.size());
            assertEquals(DE_AIRPORT_IATA_CODES, iataCodes(airports));
            assertTrue(airports.stream().allMatch(airport -> "DE".equals(airport.countryIso2())));
            assertTrue(airports.stream().allMatch(airport -> "Germany".equals(airport.countryName())));
        }

        @Test
        void whenCountryNotExists_thenReturnEmptyList() throws Exception {
            List<AirportDto> airports = performGetAndParse(BASE_URI + "/XY");

            assertTrue(airports.isEmpty());
        }
    }

    private List<AirportDto> performGetAndParse(String uri) throws Exception {
        MvcResult result = mockMvc.perform(get(uri))
                .andExpect(status().isOk())
                .andReturn();

        return objectMapper.readValue(
                result.getResponse().getContentAsString(),
                new TypeReference<>() {}
        );
    }

    private static Set<String> iataCodes(List<AirportDto> airports) {
        return airports.stream()
                .map(AirportDto::iataCode)
                .collect(Collectors.toSet());
    }
}
