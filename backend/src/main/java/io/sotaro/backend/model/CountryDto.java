package io.sotaro.backend.model;

public record CountryDto(Long dbid,
                         String id,
                         String capital,
                         String currency_code,
                         String fips_code,
                         String country_iso2,
                         String country_iso3,
                         String continent,
                         String country_id,
                         String country_name,
                         String currency_name,
                         String country_iso_numeric,
                         String phone_prefix,
                         String population
) {
}
