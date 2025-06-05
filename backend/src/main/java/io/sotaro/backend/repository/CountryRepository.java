package io.sotaro.backend.repository;

import io.sotaro.backend.model.CountryEntity;
import io.sotaro.backend.model.PopulationRankEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<CountryEntity, Long> {
    Optional<CountryEntity> findByCountryIso2(String countryIso2);
}
