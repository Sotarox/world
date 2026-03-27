package io.sotaro.backend.model;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class WbInfoWrapperEntityDeserializer extends JsonDeserializer<WbInfoWrapperEntity> {
    @Override
    public WbInfoWrapperEntity deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        JsonNode root = p.getCodec().readTree(p);
        
        WbInfoWrapperEntity result = new WbInfoWrapperEntity();
        
        // Root is an array: [metadata, [data]]
        if (root.isArray() && root.size() >= 2) {
            // First element: metadata
            JsonNode metaNode = root.get(0);
            if (metaNode.isObject()) {
                WbInfoWrapperEntity.MetaInfo metaInfo = new WbInfoWrapperEntity.MetaInfo();
                metaInfo.setPage(metaNode.get("page").asInt());
                metaInfo.setPages(metaNode.get("pages").asInt());
                metaInfo.setPer_page(metaNode.get("per_page").asInt());
                metaInfo.setTotal(metaNode.get("total").asInt());
                metaInfo.setSourceid(metaNode.get("sourceid").asText());
                metaInfo.setLastupdated(metaNode.get("lastupdated").asText());
                result.setMetaInfo(metaInfo);
            }
            
            // Second element: data array
            JsonNode dataNode = root.get(1);
            if (dataNode.isArray()) {
                List<WbInfoEntity> dataList = new ArrayList<>();
                for (JsonNode itemNode : dataNode) {
                    WbInfoEntity info = ctxt.readTreeAsValue(itemNode, WbInfoEntity.class);
                    dataList.add(info);
                }
                result.setData(dataList);
            }
        }
        
        return result;
    }
}
