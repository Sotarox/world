package io.sotaro.backend.model;

public interface PopulationRankProjection {
    Long getDbId();
    String getCountryIso2();
    String getCountryName();
    String getContinent();
    Integer getPopulation();
    Integer getCountCountries();
    Integer getRank();
}
