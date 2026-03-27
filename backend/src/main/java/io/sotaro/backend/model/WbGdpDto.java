package io.sotaro.backend.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class WbGdpDto {
    private int page;
    private int pages;
    private int perPage;
    private int total;
    private String sourceId;
    private String lastUpdated;
    private List<WbGdpAtomicInfoDto> data = new ArrayList<>();
}
