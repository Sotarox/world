package io.sotaro.backend.service;

import io.sotaro.backend.model.AirportDto;
import io.sotaro.backend.model.AirportEntity;
import io.sotaro.backend.repository.AirportRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AirportService {
    private final AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public List<AirportDto> getAirportByCountryIso2(String countryIso2){
        List<AirportEntity> entities = airportRepository.findByCountryIso2(countryIso2);
        if (!entities.isEmpty()) {
            return entities.stream().
                    map(this::convertToDto).collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    private AirportDto convertToDto(AirportEntity entity) {
        return new AirportDto(
            entity.getDbId(),
            entity.getId(),
            entity.getGmt(),
            entity.getAirportId(),
            entity.getIataCode(),
            entity.getCityIataCode(),
            entity.getIcaoCode(),
            entity.getCountryIso2(),
            entity.getGeonameId(),
            entity.getLatitude(),
            entity.getLongitude(),
            entity.getAirportName(),
            entity.getCountryName(),
            entity.getPhoneNumber(),
            entity.getTimezone()
        );
    }
}
