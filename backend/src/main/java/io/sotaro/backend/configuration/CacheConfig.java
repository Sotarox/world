package io.sotaro.backend.configuration;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {
    private static final int MAX_CACHE_SIZE = 300;
        private static final String[] WEEKLY_CACHES = {"country", "countries", "countryNavs"};
        private static final String[] MONTHLY_CACHES = {"economy"};

    @Bean
    public CacheManager weeklyCacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager();

        registerCachesWithExpiryDuration(manager, WEEKLY_CACHES, 7);
        registerCachesWithExpiryDuration(manager, MONTHLY_CACHES, 30);

        return manager;
    }

    private void registerCachesWithExpiryDuration(CaffeineCacheManager manager, String[] cacheNames, int days) {
        for (String cacheName : cacheNames) {
            manager.registerCustomCache(
                    cacheName,
                    Caffeine.newBuilder()
                            .maximumSize(MAX_CACHE_SIZE)
                            .expireAfterAccess(days, TimeUnit.DAYS)
                            .build()
            );
        }
    }
}

