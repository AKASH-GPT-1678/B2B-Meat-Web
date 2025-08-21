package com.meatbackend.backend.exception;

public class SellerAlreadyExistsException extends RuntimeException {
    public SellerAlreadyExistsException(String message) {
        super(message);
    }
}
