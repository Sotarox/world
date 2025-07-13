package io.sotaro.backend.service;

import io.sotaro.backend.exception.ResourceNotFoundException;
import io.sotaro.backend.model.*;
import io.sotaro.backend.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public CountryDto getCountryByIso2(String countryIso2) throws ResourceNotFoundException {
        Optional<CountryEntity> optionalEntity = countryRepository.findByCountryIso2(countryIso2);
        CountryEntity entity = optionalEntity.orElseThrow(
                () -> new ResourceNotFoundException(
                        String.format("Country Not Found by countryIso2: %s", countryIso2))
        );
        return convertToDto(entity);
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
