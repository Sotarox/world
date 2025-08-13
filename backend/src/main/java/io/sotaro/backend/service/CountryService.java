package io.sotaro.backend.service;

import io.sotaro.backend.exception.ResourceNotFoundException;
import io.sotaro.backend.model.*;
import io.sotaro.backend.repository.AirportRepository;
import io.sotaro.backend.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CountryService {
    private final CountryRepository countryRepository;
    private final AirportRepository airportRepository;
    public CountryService(CountryRepository countryRepository, AirportRepository airportRepository) {
        this.countryRepository = countryRepository;
        this.airportRepository = airportRepository;
    }

    public List<CountryDto> getAllCountries() {
        return countryRepository.findAll().stream()
                .map(country -> {
                    List<AirportEntity> airports = airportRepository.findByCountryIso2(country.getCountryIso2());
                    return convertToDto(country, airports.size());
                })
                .collect(Collectors.toList());
    }

    public CountryDto getCountryByIso2(String countryIso2) throws ResourceNotFoundException {
        Optional<CountryEntity> optionalEntity = countryRepository.findByCountryIso2(countryIso2);
        CountryEntity entity = optionalEntity.orElseThrow(
                () -> new ResourceNotFoundException(
                        String.format("Country Not Found by countryIso2: %s", countryIso2))
        );
        List<AirportEntity> airports = airportRepository.findByCountryIso2(countryIso2);
        return convertToDto(entity, airports.size());
    }

    private CountryDto convertToDto(CountryEntity countryEntity, int totalNumberOfAirports) {
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
                countryEntity.getPopulation(),
                totalNumberOfAirports
        );
    }
}
