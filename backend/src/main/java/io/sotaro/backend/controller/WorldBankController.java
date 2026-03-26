package io.sotaro.backend.controller;

import io.sotaro.backend.dao.WorldBankDAO;
import io.sotaro.backend.model.WbBaseInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorldBankController {
    private final WorldBankDAO worldBankDAO;
    WorldBankController(WorldBankDAO worldBankDAO) { this.worldBankDAO = worldBankDAO; }

    @GetMapping("/gdp/{iso2}")
    public ResponseEntity<WbBaseInfo> getGdpInfoByIso2(@PathVariable String iso2){
        return ResponseEntity.ok(worldBankDAO.getGdpInfo(iso2));
    }
}
