package io.sotaro.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.sotaro.backend.configuration.CustomCorsConfiguration;
import io.sotaro.backend.configuration.SecurityConfig;
import io.sotaro.backend.exception.ResourceNotFoundException;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CountryController.class)
@Import({SecurityConfig.class, CustomCorsConfiguration.class})
public class CountryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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
            ResultActions resultActions = mockMvc.perform(get(BASE_URI + "/US"))
                    .andDo(print())
                    .andExpect(status().isOk());
            MvcResult result = resultActions.andReturn();
            String contentAsString = result.getResponse().getContentAsString();
            CountryDto resultDto = objectMapper.readValue(contentAsString, CountryDto.class);
            assertEquals(countryDto, resultDto);
        }

        @Test
        void givenAnEntity_findByNonExistingIso2_throwsNotFoundException() throws Exception {
            when(countryService.getCountryByIso2("XY")).thenThrow(ResourceNotFoundException.class);
            ResultActions resultActions = mockMvc.perform(get(BASE_URI + "/XY"))
                    .andDo(print())
                    .andExpect(status().isNotFound());
        }

        @Test
        void whenFindByInvalidIso2Length_thenThrowBadRequestException() throws Exception {
            ResultActions resultActions = mockMvc.perform(get(BASE_URI + "/USA"))
                    .andDo(print())
                    .andExpect(status().isBadRequest());
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
