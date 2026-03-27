package io.sotaro.backend.model;

import lombok.Data;

@Data
public class WbEconomyInfoDto {
    private String year;
    private Double gdpValue;
    private Double growthRate;
}