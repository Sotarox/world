package io.sotaro.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.util.List;

@Data
@JsonDeserialize(using = WbBaseInfoDeserializer.class)
public class WbBaseInfo {
    private MetaInfo metaInfo;
    private List<WbAtomicInfo> data;

    @Data
    public static class MetaInfo {
        private int page;
        private int pages;
        private int per_page;
        private int total;
        private String sourceid;
        private String lastupdated;
    }
}
