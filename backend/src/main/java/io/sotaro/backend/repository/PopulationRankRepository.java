package io.sotaro.backend.repository;

import io.sotaro.backend.model.PopulationRankEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PopulationRankRepository extends JpaRepository<PopulationRankEntity, Long> {
    @Query(
            value = """
                    SELECT
                        dbid, country_iso2, country_name, continent, population,
                        COUNT(*) over () AS count_countries,
                        RANK() OVER (
                            ORDER BY
                                  CASE
                                      WHEN population IS NULL THEN 1
                                      ELSE 0
                                  END,
                                  population DESC
                        ) AS rank
                    FROM
                        Countries;
                    """,
            nativeQuery = true)
    List<PopulationRankEntity> findPopulationRank();

    @Query(
            value = """
                    SELECT *
                         FROM
                            (
                                SELECT dbid, country_iso2, country_name, continent, population,
                                COUNT(*) over () AS count_countries,
                                RANK() OVER (
                                    ORDER BY
                                        CASE
                                            WHEN population IS NULL THEN 1
                                            ELSE 0
                                        END,
                                        population DESC
                                ) AS rank
                                FROM Countries
                            ) rank_result
                    WHERE
                        country_iso2 = :countryIso2;
                    """
            , nativeQuery = true)
    Optional<PopulationRankEntity> findPopulationRankByCountryIso2(@Param("countryIso2") String countryIso2);
}
