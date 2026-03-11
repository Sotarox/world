package io.sotaro.backend.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(@NonNull String resourcePath, @NonNull Resource location) throws IOException {
                        Resource resource = location.createRelative(resourcePath);
                        
                        // If resource exists, return it
                        if (resource.exists() && resource.isReadable()) {
                            return resource;
                        }
                        
                        // Try adding .html extension (for SSG routes like /about -> about.html)
                        Resource htmlResource = location.createRelative(resourcePath + ".html");
                        if (htmlResource.exists() && htmlResource.isReadable()) {
                            return htmlResource;
                        }
                        
                        // Try index.html in subdirectory (for /about/ -> about/index.html)
                        Resource indexResource = location.createRelative(resourcePath + "/index.html");
                        if (indexResource.exists() && indexResource.isReadable()) {
                            return indexResource;
                        }
                        
                        // Fallback to index.html for SPA-style routing (if needed)
                        return new ClassPathResource("/static/index.html");
                    }
                });
    }
}
