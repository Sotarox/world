package io.sotaro.backend.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class WbEconomyWrapperDto {
    private int page;
    private int pages;
    private int perPage;
    private int total;
    private String sourceId;
    private String lastUpdated;
    private List<WbEconomyInfoDto> data = new ArrayList<>();
}
