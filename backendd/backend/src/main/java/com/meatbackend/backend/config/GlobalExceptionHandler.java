package com.meatbackend.backend.config;

import com.meatbackend.backend.exception.EmailNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class GlobalExceptionHandler {
    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleEmailNotFound(EmailNotFoundException ex) {
        Map<String, Object> errorBody = new HashMap<>();
        errorBody.put("timestamp", LocalDateTime.now());
        errorBody.put("status", HttpStatus.NOT_FOUND.value());
        errorBody.put("error", "Email Not Found");
        errorBody.put("message", ex.getMessage());
        errorBody.put("isVerified", ex.isVerified);

        return new ResponseEntity<>(errorBody, HttpStatus.NOT_FOUND);
    }
}
