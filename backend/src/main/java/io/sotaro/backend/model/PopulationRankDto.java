package io.sotaro.backend.model;

public record PopulationRankDto(Long dbId,
                                String countryIso2,
                                String continent,
                                String countryName,
                                Integer population,
                                Integer rank
) {
}
