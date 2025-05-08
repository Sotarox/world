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
        return new CountryDto(countryEntity.getDbid(),
                countryEntity.getId(),
                countryEntity.getCapital(),
                countryEntity.getCurrency_code(),
                countryEntity.getFips_code(),
                countryEntity.getCountry_iso2(),
                countryEntity.getCountry_iso3(),
                countryEntity.getContinent(),
                countryEntity.getCountry_id(),
                countryEntity.getCountry_name(),
                countryEntity.getCurrency_name(),
                countryEntity.getCountry_iso_numeric(),
                countryEntity.getPhone_prefix(),
                countryEntity.getPopulation());
    }
}
