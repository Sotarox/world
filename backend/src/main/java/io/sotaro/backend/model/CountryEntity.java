package io.sotaro.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Countries")
public class CountryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dbid")
    private Long dbId;

    @Column(name = "id")
    private String id;

    @Column(name = "capital")
    private String capital;

    @Column(name = "currency_code")
    private String currencyCode;

    @Column(name = "fips_code")
    private String fipsCode;

    @Column(name = "country_iso2", unique = true)
    private String countryIso2;

    @Column(name = "country_iso3")
    private String countryIso3;

    @Column(name = "continent")
    private String continent;

    @Column(name = "country_id")
    private String countryId;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "currency_name")
    private String currencyName;

    @Column(name = "country_iso_numeric")
    private String countryIsoNumeric;

    @Column(name = "phone_prefix")
    private String phonePrefix;

    @Column(name = "population", nullable = true)
    private Integer population;
}
