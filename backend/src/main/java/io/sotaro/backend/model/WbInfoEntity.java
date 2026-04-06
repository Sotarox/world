package io.sotaro.backend.model;

import lombok.Data;

@Data
public class WbInfoEntity {
    private Indicator indicator;
    private Country country;
    private String countryiso3code;
    private String date;
    private Double value;
    private String unit;
    private String obs_status;
    private int decimal;

    @Data
    public static class Indicator {
        private String id;
        private String value;
    }

    @Data
    public static class Country {
        private String id;
        private String value;
    }
}
