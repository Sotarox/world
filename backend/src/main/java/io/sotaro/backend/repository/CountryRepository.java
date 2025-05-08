package io.sotaro.backend.repository;

import io.sotaro.backend.model.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<CountryEntity, Long> {
}
