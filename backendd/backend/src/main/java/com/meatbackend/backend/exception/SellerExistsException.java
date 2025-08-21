package com.meatbackend.backend.exception;

public class SellerExistsException extends RuntimeException {
    public SellerExistsException(String message) {
        super(message);
    }
}
