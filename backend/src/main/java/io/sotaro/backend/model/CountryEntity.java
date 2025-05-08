package io.sotaro.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "countries")
public class CountryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dbid;
    private String id;
    private String capital;
    private String currency_code;
    private String fips_code;
    private String country_iso2;
    private String country_iso3;
    private String continent;
    private String country_id;
    private String country_name;
    private String currency_name;
    private String country_iso_numeric;
    private String phone_prefix;
    private String population;
}
