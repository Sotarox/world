package io.sotaro.backend.model;

public record CountryDto(Long dbId,
                         String id,
                         String capital,
                         String currencyCode,
                         String fipsCode,
                         String countryIso2,
                         String countryIso3,
                         String continent,
                         String countryId,
                         String countryName,
                         String currencyName,
                         String countryIsoNumeric,
                         String phonePrefix,
                         int population
) {
}
