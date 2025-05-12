package io.sotaro.backend.repository;

import io.sotaro.backend.model.AirportEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AirportRepository extends JpaRepository<AirportEntity, Long> {
    List<AirportEntity> findByCountryIso2(String countryIso2);
}
