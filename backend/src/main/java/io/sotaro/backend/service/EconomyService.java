package io.sotaro.backend.service;

import io.sotaro.backend.dao.WorldBankDAO;
import io.sotaro.backend.model.WbInfoWrapperEntity;
import io.sotaro.backend.model.WbEconomyInfoDto;
import io.sotaro.backend.model.WbEconomyWrapperDto;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class EconomyService {
    private final WorldBankDAO worldBankDAO;
    public EconomyService(WorldBankDAO worldBankDAO) {this.worldBankDAO = worldBankDAO;}

    @Cacheable(
            value = "economy",
            key = "#iso2",
            unless = "#result == null"
    )
    public WbEconomyWrapperDto getEconomyInfo(String iso2) {
        WbInfoWrapperEntity entity = worldBankDAO.getEconomyInfo(iso2);
        WbEconomyWrapperDto dto = new WbEconomyWrapperDto();
        dto.setPage(entity.getMetaInfo().getPage());
        dto.setPages(entity.getMetaInfo().getPages());
        dto.setPerPage(entity.getMetaInfo().getPer_page());
        dto.setTotal(entity.getMetaInfo().getTotal());
        dto.setSourceId(entity.getMetaInfo().getSourceid());
        dto.setLastUpdated(entity.getMetaInfo().getLastupdated());
        if (entity.getData() == null) {
            return dto;
        }
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
                WbEconomyInfoDto atomicInfoDto = new WbEconomyInfoDto();
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
