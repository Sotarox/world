package io.sotaro.backend.controller;

import io.sotaro.backend.model.WbEconomyWrapperDto;
import io.sotaro.backend.service.EconomyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EconomyController {
    private final EconomyService economyService;
    EconomyController(EconomyService economyService) {
        this.economyService = economyService;
    }

    @GetMapping("/gdp/{iso2}")
    public ResponseEntity<WbEconomyWrapperDto> getGdpInfo2ByIso2(@PathVariable String iso2){
        return ResponseEntity.ok(economyService.getEconomyInfo(iso2));
    }
}
