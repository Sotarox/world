package io.sotaro.backend.controller;

import io.sotaro.backend.model.AirportDto;
import io.sotaro.backend.model.CountryDto;
import io.sotaro.backend.service.AirportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AirportController {

    private final AirportService airportService;

    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping("/airports/{countryIso2}")
    public List<AirportDto> getAirportsByCountryIso2(@PathVariable String countryIso2) {
        return airportService.getAirportByCountryIso2(countryIso2);
    }
}
