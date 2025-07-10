package io.sotaro.backend.controller;

import io.sotaro.backend.configuration.CustomCorsConfiguration;
import io.sotaro.backend.configuration.SecurityConfig;
import io.sotaro.backend.model.CountryDto;
import io.sotaro.backend.service.CountryService;
import io.sotaro.backend.service.PopulationRankService;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CountryController.class)
@Import({SecurityConfig.class, CustomCorsConfiguration.class})
public class CountryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CountryService countryService;

    @MockitoBean
    private PopulationRankService populationRankService;

    private static final String BASE_URI = "/api/countries";

    @Nested
    class GetCountryByCountryIso2 {

        @Test
        void givenAnEntity_findByCorrectIso2_returnCorrectDto() throws Exception {
            CountryDto countryDto = buildCountryDto("US");
            when(countryService.getCountryByIso2("US")).thenReturn(countryDto);
            mockMvc.perform(get(BASE_URI + "/US"))
                    .andExpect(status().isOk());
        }
    }

    CountryDto buildCountryDto(String iso2) {
        return new CountryDto(
                0L,
                "id",
                "capital",
                "currencyCode",
                "fipsCode",
                iso2,
                "countryIso3",
                "continent",
                "countryId",
                "countryName",
                "currencyName",
                "countryIsoNumeric",
                "phonePrefix",
                0
        );
    }
}
