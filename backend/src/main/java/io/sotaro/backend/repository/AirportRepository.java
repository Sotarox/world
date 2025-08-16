package io.sotaro.backend.repository;

import io.sotaro.backend.model.AirportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AirportRepository extends JpaRepository<AirportEntity, Long> {
    List<AirportEntity> findByCountryIso2(String countryIso2);

}
