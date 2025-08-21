package com.meatbackend.backend.io;


import lombok.Data;

@Data
public class ForgotPasswordResponse {

    private boolean success;
    private String message;
}
