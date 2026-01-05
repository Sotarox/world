package io.sotaro.backend.service;

import io.sotaro.backend.dao.AcCountryDAO;
import io.sotaro.backend.model.*;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AcCountryService {
    private final AcCountryDAO acCountryDao;
    public AcCountryService(AcCountryDAO acCountryDao) {
        this.acCountryDao = acCountryDao;
    }

    @Cacheable(
        value = "countries",
        key = "'all'",
        unless = "#result == null"
    )
    public List<AcCountry> getCountries() {
        return acCountryDao.getAcCountries().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Cacheable(
        value = "country",
        key = "#countryIso2",
        unless = "#result == null"
    )
    public AcCountry getCountryByCountryIso2(String countryIso2) {
        return convertToDto(acCountryDao.getAcCountry(countryIso2));
    }

    @Cacheable(
            value = "countryNavs",
            key = "'all'",
            unless = "#result == null"
    )
    public List<AcCountryNavDto> getCountriesNav() {
        return acCountryDao.getAcCountries().stream()
                .map(this::convertToNavDto)
                .collect(Collectors.toList());
    }

    private AcCountry convertToDto(AcCountry countryEntity) {
        String modifiedRegion = unifyArcticRegion(countryEntity.getRegion());
        countryEntity.setRegion(modifiedRegion);
        return countryEntity;
    }

    private AcCountryNavDto convertToNavDto(AcCountry countryEntity) {
        return new AcCountryNavDto(
                countryEntity.getName(),
                countryEntity.getAlpha2Code(),
                countryEntity.getSubregion(),
                unifyArcticRegion(countryEntity.getRegion()),
                countryEntity.getPopulation(),
                countryEntity.getArea()
        );
    }

    private String unifyArcticRegion(String entityRegion) {
        if (entityRegion.equals("Antarctic Ocean") || entityRegion.equals("Polar")) {
            return "Antarctic";
        } else {
            return entityRegion;
        }
    }
}
