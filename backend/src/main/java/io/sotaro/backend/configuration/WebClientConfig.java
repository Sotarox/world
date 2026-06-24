package io.sotaro.backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient.Builder webClientBuilder() {
        ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(configurer ->
                        configurer.defaultCodecs().maxInMemorySize(5 * 1024 * 1024)) // 5 MB
                .build();

        return WebClient.builder()
                .exchangeStrategies(strategies)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
    }

    @Bean("acCountriesWebClient")
    public WebClient webClient(WebClient.Builder webClientBuilder) {
        return webClientBuilder.clone()
                .baseUrl("https://countries.dev")
                .build();
    }

    @Bean("worldBankWebClient")
    public WebClient webClientWorldBank(WebClient.Builder webClientBuilder) {
        return webClientBuilder.clone()
                .baseUrl("https://api.worldbank.org/v2")
                .build();
    }
}
