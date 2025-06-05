package io.sotaro.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Countries")
public class PopulationRankEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dbid")
    private Long dbId;

    @Column(name = "country_iso2", unique = true)
    private String countryIso2;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "continent")
    private String continent;

    @Column(name = "population", nullable = true)
    private Integer population;

    @Column(name = "rank")
    private Integer rank;
}
