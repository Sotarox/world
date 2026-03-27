package io.sotaro.backend.controller;

import io.sotaro.backend.dao.WorldBankDAO;
import io.sotaro.backend.model.WbBaseInfo;
import io.sotaro.backend.model.WbGdpDto;
import io.sotaro.backend.service.GdpService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class WorldBankController {
    private final GdpService gdpService;
    WorldBankController(GdpService gdpService) {
        this.gdpService = gdpService;
    }

    @GetMapping("/gdp/{iso2}")
    public ResponseEntity<WbGdpDto> getGdpInfo2ByIso2(@PathVariable String iso2){
        return ResponseEntity.ok(gdpService.getGdpInfo(iso2));
    }
}
