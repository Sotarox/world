package io.sotaro.backend.controller;

import io.sotaro.backend.model.AcCountry;
import io.sotaro.backend.dao.AcCountryDAO;
import io.sotaro.backend.model.AcCountryNavDto;
import io.sotaro.backend.service.AcCountryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AcCountryController {
    AcCountryService acCountryService;

    AcCountryController(AcCountryService acCountryService) {
        this.acCountryService = acCountryService;
    }

    @GetMapping("/accountries")
    public ResponseEntity<List<AcCountry>> getCountries() {
        return ResponseEntity.ok(acCountryService.getCountries());
    }

    @GetMapping("/accountries/nav")
    public ResponseEntity<List<AcCountryNavDto>> getCountriesNav() {
        return ResponseEntity.ok(acCountryService.getCountriesNav());
    }
    @GetMapping("/accountries/{countryIso2}")
    public ResponseEntity<AcCountry> getCountryByCountryIso2(@PathVariable String countryIso2) {
        return ResponseEntity.ok(acCountryService.getCountryByCountryIso2(countryIso2));
    }
}
