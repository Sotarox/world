package io.sotaro.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "airports")
public class AirportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dbid")
    private Long dbId;

    @Column(name = "id")
    private String id;

    @Column(name = "gmt")
    private String gmt;

    @Column(name = "airport_id")
    private String airportId;

    @Column(name = "iata_code")
    private String iataCode;

    @Column(name = "city_iata_code")
    private String cityIataCode;

    @Column(name = "icao_code")
    private String icaoCode;

    @Column(name = "country_iso2", unique = true)
    private String countryIso2;

    @Column(name = "geoname_id")
    private String geonameId;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "airport_name")
    private String airportName;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "timezone")
    private String timezone;
}
