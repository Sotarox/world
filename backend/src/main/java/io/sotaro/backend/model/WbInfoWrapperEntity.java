package io.sotaro.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.util.List;

@Data
@JsonDeserialize(using = WbInfoWrapperEntityDeserializer.class)
public class WbInfoWrapperEntity {
    private MetaInfo metaInfo;
    private List<WbInfoEntity> data;

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
