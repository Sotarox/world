package io.sotaro.backend.dao;

import io.sotaro.backend.model.AcCountry;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
@Service
public class AcCountryDAO {
    private final WebClient webClient;
    public AcCountryDAO(WebClient webClient) {
        this.webClient = webClient;
    }
    public AcCountry getAcCountry(String iso2) {
        return webClient.get()
                .uri("/alpha/{iso2}", iso2)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.error(new RuntimeException("Client Error: " + response.statusCode())))
                .onStatus(HttpStatusCode::is5xxServerError, response ->
                        Mono.error(new RuntimeException("Server Error: " + response.statusCode())))
                .bodyToMono(AcCountry.class)
                .block();
    }
}
