package io.sotaro.backend.repository;

import io.sotaro.backend.model.CountryEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class CountryRepositoryTest {
    @Autowired
    CountryRepository countryRepository;

    @Test
    void givenSingleCountryInDB_whenFindByCorrectId_thenReturnCorrectEntity(){
        CountryEntity countryEntity = buildCountryEntity("GER");
        countryRepository.saveAndFlush(countryEntity);
        Optional<CountryEntity> optionalCountryEntity = countryRepository.findByCountryIso2(countryEntity.getCountryIso2());
        assertTrue(optionalCountryEntity.isPresent());
        CountryEntity foundCountry = optionalCountryEntity.get();
        assertEquals(countryEntity.getCountryIso2(), foundCountry.getCountryIso2());
    }

    CountryEntity buildCountryEntity(String iso2){
        CountryEntity countryEntity = new CountryEntity();
        countryEntity.setId("");
        countryEntity.setCapital("");
        countryEntity.setCurrencyCode("");
        countryEntity.setFipsCode("");
        countryEntity.setCountryIso2(iso2);
        countryEntity.setCountryIso3("");
        countryEntity.setContinent("");
        countryEntity.setCountryId("");
        countryEntity.setCountryName("");
        countryEntity.setCurrencyName("");
        countryEntity.setCountryIsoNumeric("");
        countryEntity.setPhonePrefix("");
        countryEntity.setPopulation(0);
        return countryEntity;
    }
}
