package io.sotaro.backend.service;

import io.sotaro.backend.model.PopulationRankDto;
import io.sotaro.backend.model.PopulationRankProjection;
import io.sotaro.backend.repository.PopulationRankRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PopulationRankService {
    private final PopulationRankRepository populationRankRepository;

    public PopulationRankService(PopulationRankRepository populationRankRepository){
        this.populationRankRepository = populationRankRepository;
    }

    public List<PopulationRankDto> getPopulationRanks() {
        return populationRankRepository.findPopulationRank().stream()
                .map(this::convertProjectionToDto)
                .collect(Collectors.toList());
    }

    public PopulationRankDto getPopulationRankWorld(String countryIso2) {
        Optional<PopulationRankProjection> optionalProjection =
                populationRankRepository.findPopulationRankByCountryIso2(countryIso2);
        PopulationRankProjection projection = optionalProjection.orElseThrow();
        return convertProjectionToDto(projection);
    }

    public PopulationRankDto getPopulationRankContinent(String continentCode, String countryIso2) {
        Optional<PopulationRankProjection> optionalProjection =
                populationRankRepository.findPopulationRankByCountryIso2AndContinentCode(continentCode, countryIso2);
        PopulationRankProjection projection = optionalProjection.orElseThrow();
        return convertProjectionToDto(projection);
    }

    private PopulationRankDto convertProjectionToDto(PopulationRankProjection projection) {
        return new PopulationRankDto(
                projection.getDbId(),
                projection.getCountryIso2(),
                projection.getContinent(),
                projection.getCountryName(),
                projection.getPopulation(),
                projection.getCountCountries(),
                projection.getRank());
    }
}
