package io.sotaro.backend.service;

import io.sotaro.backend.model.CountryDto;
import io.sotaro.backend.model.CountryEntity;
import io.sotaro.backend.model.PopulationRankDto;
import io.sotaro.backend.model.PopulationRankEntity;
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

    public CountryDto getCountryByIso2(String countryIso2) {
        Optional<CountryEntity> optionalEntity = countryRepository.findByCountryIso2(countryIso2);
        CountryEntity entity = optionalEntity.orElseThrow();
        return convertToDto(entity);
    }

    public List<PopulationRankDto> getAllPopulationRanks() {
        return countryRepository.findPopulationRank().stream()
                .map(this::convertToPopulationRankDto)
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

    private PopulationRankDto convertToPopulationRankDto(PopulationRankEntity entity) {
        return new PopulationRankDto(
                entity.getDbId(),
                entity.getCountryIso2(),
                entity.getContinent(),
                entity.getCountryName(),
                entity.getPopulation(),
                entity.getRank());
    }
}
