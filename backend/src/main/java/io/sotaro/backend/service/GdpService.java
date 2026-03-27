package io.sotaro.backend.service;

import io.sotaro.backend.dao.WorldBankDAO;
import io.sotaro.backend.model.WbBaseInfo;
import io.sotaro.backend.model.WbGdpAtomicInfoDto;
import io.sotaro.backend.model.WbGdpDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GdpService {
    private final WorldBankDAO worldBankDAO;
    public GdpService(WorldBankDAO worldBankDAO) {this.worldBankDAO = worldBankDAO;}

    public WbGdpDto getGdpInfo(String iso2) {
        WbBaseInfo entity = worldBankDAO.getGdpInfo(iso2);
        WbGdpDto dto = new WbGdpDto();
        dto.setPage(entity.getMetaInfo().getPage());
        dto.setPages(entity.getMetaInfo().getPages());
        dto.setPerPage(entity.getMetaInfo().getPer_page());
        dto.setTotal(entity.getMetaInfo().getTotal());
        dto.setSourceId(entity.getMetaInfo().getSourceid());
        dto.setLastUpdated(entity.getMetaInfo().getLastupdated());

        entity.getData().forEach(atomicInfoEntity -> {
            // check if the Entity's year exists already in DTO
            String year = atomicInfoEntity.getDate();
            boolean isYearAlreadyInData = dto.getData().stream().anyMatch(element -> year.equals(element.getYear()));
            String indicator = atomicInfoEntity.getIndicator().getId();
            if (isYearAlreadyInData) {
                dto.getData().stream()
                        .filter(element -> year.equals(element.getYear()))
                        .findFirst()
                        .ifPresent(existingElement -> {
                            if (indicator.equals("NY.GDP.MKTP.CD")) {
                                existingElement.setGdpValue(atomicInfoEntity.getValue());
                            } else if (indicator.equals("NY.GDP.MKTP.KD.ZG")) {
                                existingElement.setGrowthRate(atomicInfoEntity.getValue());
                            }
                        });
            } else {
                WbGdpAtomicInfoDto atomicInfoDto = new WbGdpAtomicInfoDto();
                atomicInfoDto.setYear(year);
                if (indicator.equals("NY.GDP.MKTP.CD")) {
                    atomicInfoDto.setGdpValue(atomicInfoEntity.getValue());
                } else if (indicator.equals("NY.GDP.MKTP.KD.ZG")){
                    atomicInfoDto.setGrowthRate(atomicInfoEntity.getValue());
                }
                dto.getData().add(atomicInfoDto);
            }
        });
        return dto;
    }
}
