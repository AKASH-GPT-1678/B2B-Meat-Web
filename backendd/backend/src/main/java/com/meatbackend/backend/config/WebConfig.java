package com.meatbackend.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // allow all routes
                .allowedOrigins("http://localhost:3000","https://b2-b-meat-web-pdvm.vercel.app/","https://b2-b-meat-web-pdvm-8dyn8jl35-akash-gupta-s-projects-b3af644f.vercel.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
