package io.sotaro.backend.service;

import io.sotaro.backend.dao.AcCountryDAO;
import io.sotaro.backend.model.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AcCountryService {
    private final AcCountryDAO acCountryDao;
    public AcCountryService(AcCountryDAO acCountryDao) {
        this.acCountryDao = acCountryDao;
    }

    public List<AcCountryNavDto> getCountriesNav() {
        return acCountryDao.getAcCountries().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private AcCountryNavDto convertToDto(AcCountry countryEntity) {
        return new AcCountryNavDto(
                countryEntity.getName(),
                countryEntity.getAlpha2Code(),
                countryEntity.getSubregion(),
                countryEntity.getRegion(),
                countryEntity.getPopulation(),
                countryEntity.getArea()
        );
    }
}
