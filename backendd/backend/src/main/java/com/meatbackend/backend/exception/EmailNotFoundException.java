package com.meatbackend.backend.exception;

public class EmailNotFoundException extends RuntimeException {
    public final boolean isVerified;

    // Constructor with message only
    public EmailNotFoundException(String message) {
        super(message);
        this.isVerified = false; // default value
    }
}


