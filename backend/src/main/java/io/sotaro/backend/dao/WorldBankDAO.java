package io.sotaro.backend.dao;

import io.sotaro.backend.model.WbInfoWrapperEntity;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class WorldBankDAO {
    private final WebClient webClient;
    private final String uri = "/country/{iso2}/indicators/NY.GDP.MKTP.KD.ZG;NY.GDP.MKTP.CD?source=2&mrv=20&format=json";

    public WorldBankDAO(@Qualifier("worldBankWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    public WbInfoWrapperEntity getEconomyInfo(String iso2) {
        return webClient.get()
                .uri(uri, iso2)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error(new RuntimeException("Client Error: " + response.statusCode())))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server Error: " + response.statusCode())))
                .bodyToMono(WbInfoWrapperEntity.class)
                .block();
    }
}
