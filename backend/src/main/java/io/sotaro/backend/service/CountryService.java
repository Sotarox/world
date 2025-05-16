package io.sotaro.backend.service;

import io.sotaro.backend.model.CountryDto;
import io.sotaro.backend.model.CountryEntity;
import io.sotaro.backend.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryService {
    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<CountryDto> getAllCountries() {
        return countryRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CountryDto convertToDto(CountryEntity countryEntity) {
        return new CountryDto(countryEntity.getDbId(),
                countryEntity.getId(),
                countryEntity.getCapital(),
                countryEntity.getCurrencyCode(),
                countryEntity.getFipsCode(),
                countryEntity.getCountryIso2(),
                countryEntity.getCountryIso3(),
                countryEntity.getContinent(),
                countryEntity.getCountryId(),
                countryEntity.getCountryName(),
                countryEntity.getCurrencyName(),
                countryEntity.getCountryIsoNumeric(),
                countryEntity.getPhonePrefix(),
                countryEntity.getPopulation());
    }
}
