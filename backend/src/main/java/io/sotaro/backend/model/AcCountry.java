package io.sotaro.backend.model;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class AcCountry {
    private String name;
    private List<String> topLevelDomain;
    private String alpha2Code;
    private String alpha3Code;
    private List<String> callingCodes;
    private String capital;
    private List<String> altSpellings;
    private String subregion;
    private String region;
    private long population;
    private List<Double> latlng;
    private String demonym;
    private Double area;
    private List<String> timezones;
    private List<String> borders;
    private String nativeName;
    private String numericCode;
    private Flags flags;
    private List<Currency> currencies;
    private List<Language> languages;
    private Map<String, String> translations;
    private String flag;
    private List<RegionalBloc> regionalBlocs;
    private String cioc;
    private boolean independent;

    @Data
    public static class Flags {
        private String svg;
        private String png;
    }

    @Data
    public static class Currency {
        private String code;
        private String name;
        private String symbol;
    }

    @Data
    public static class Language {
        private String iso639_1;
        private String iso639_2;
        private String name;
        private String nativeName;
    }

    @Data
    public static class RegionalBloc {
        private String acronym;
        private String name;
    }
}
