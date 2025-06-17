package io.sotaro.backend.controller;

import io.sotaro.backend.model.AcCountry;
import io.sotaro.backend.dao.AcCountryDAO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AcCountryController {
    AcCountryDAO acCountryDAO;

    AcCountryController(AcCountryDAO acCountryDAO) {
        this.acCountryDAO = acCountryDAO;
    }

    @GetMapping("/accountries/{countryIso2}")
    public ResponseEntity<AcCountry> getCountryByCountryIso2(@PathVariable String countryIso2) {
        return ResponseEntity.ok(acCountryDAO.getAcCountry(countryIso2));
    }
}
