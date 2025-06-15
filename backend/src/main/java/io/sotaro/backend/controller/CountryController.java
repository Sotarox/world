package io.sotaro.backend.controller;

import io.sotaro.backend.model.CountryDto;
import io.sotaro.backend.model.PopulationRankDto;
import io.sotaro.backend.service.CountryService;
import io.sotaro.backend.service.PopulationRankService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api")
public class CountryController {
    private final CountryService countryService;
    private final PopulationRankService populationRankService;

    public CountryController(CountryService countryService, PopulationRankService populationRankService){
        this.countryService = countryService;
        this.populationRankService = populationRankService;
    }

    @GetMapping("/countries")
    public ResponseEntity<List<CountryDto>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }

    @GetMapping("/countries/{countryIso2}")
    public ResponseEntity<CountryDto> getCountryByCountryIso2(@PathVariable String countryIso2) {
        return ResponseEntity.ok(countryService.getCountryByIso2(countryIso2));
    }

    @GetMapping("/countries/rank/population/world")
    public ResponseEntity<List<PopulationRankDto>> getAllPopulationRank(){
        return ResponseEntity.ok(populationRankService.getPopulationRanks());
    }

    @GetMapping("/countries/rank/population/world/{countryIso2}")
    public ResponseEntity<PopulationRankDto> getPopulationRankWorld(@PathVariable String countryIso2){
        return ResponseEntity.ok(populationRankService.getPopulationRankWorld(countryIso2));
    }

    @GetMapping("/countries/rank/population/continent/{continentCode}/country/{countryIso2}")
    public ResponseEntity<PopulationRankDto> getPopulationRankContinent(@PathVariable String continentCode, @PathVariable String countryIso2){
        return ResponseEntity.ok(populationRankService.getPopulationRankContinent(continentCode, countryIso2));
    }
}
