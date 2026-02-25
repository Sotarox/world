package io.sotaro.backend.model;

public record AcCountryNavDto(
        String name,
        String alpha2Code,
        String subregion,
        String region,
        long population,
        Double area
) {}

