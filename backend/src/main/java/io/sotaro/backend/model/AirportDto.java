package io.sotaro.backend.model;


public record AirportDto(
        Long dbid,
        String id,
        String gmt,
        String airportId,
        String iataCode,
        String cityIataCode,
        String icaoCode,
        String countryIso2,
        String geonameId,
        String latitude,
        String longitude,
        String airportName,
        String countryName,
        String phoneNumber,
        String timezone
) {
}
