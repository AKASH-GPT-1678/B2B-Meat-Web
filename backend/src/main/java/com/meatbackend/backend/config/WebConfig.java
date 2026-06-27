package com.meatbackend.backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${spring.web.cors.allowed-origins")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:3000",
                        "https://b2-b-meat-web-pdvm.vercel.app",  // remove trailing slash
                        "https://b2-b-meat-web-pdvm-8dyn8jl35-akash-gupta-s-projects-b3af644f.vercel.app",
                        allowedOrigins

                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
