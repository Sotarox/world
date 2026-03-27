package io.sotaro.backend.model;

import lombok.Data;

@Data
public class WbGdpAtomicInfoDto {
    private String year;
    private Double gdpValue;
    private Double growthRate;
}