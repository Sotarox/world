package io.sotaro.backend.controller;

import io.sotaro.backend.model.CountryDto;
import io.sotaro.backend.service.CountryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CountryController {
    private final CountryService countryService;

    public CountryController(CountryService countryService){
        this.countryService = countryService;
    }

    @GetMapping("/countries")
    public List<CountryDto> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/countries/{countryIso2}")
    public CountryDto getCountryByCountryIso2(@PathVariable String countryIso2) {
        return countryService.getCountryByIso2(countryIso2);
    }
}
