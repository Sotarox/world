package io.sotaro.backend.repository;

import io.sotaro.backend.model.CountryEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class CountryRepositoryTest {
    @Autowired
    CountryRepository countryRepository;

    @Autowired
    TestEntityManager entityManager;

    @Test
    void givenNewCountry_whenSave_thenSuccess(){
        CountryEntity countryEntity = buildCountryEntity("123");
        CountryEntity insertedCountry = countryRepository.saveAndFlush(countryEntity);
        CountryEntity persisted = entityManager.find(CountryEntity.class, insertedCountry.getDbId());
        assertEquals(persisted.getDbId(), countryEntity.getDbId());
    }

    CountryEntity buildCountryEntity(String id){
        CountryEntity countryEntity = new CountryEntity();
        countryEntity.setId(id);
        countryEntity.setCapital("");
        countryEntity.setCurrencyCode("");
        countryEntity.setFipsCode("");
        countryEntity.setCountryIso2("");
        countryEntity.setCountryIso3("");
        countryEntity.setContinent("");
        countryEntity.setCountryId("");
        countryEntity.setCountryName("");
        countryEntity.setCurrencyName("");
        countryEntity.setCountryIsoNumeric("");
        countryEntity.setPhonePrefix("");
        countryEntity.setPopulation(1000);
        return countryEntity;
    }
}
