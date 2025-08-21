package com.meatbackend.backend.io;


import lombok.Data;

@Data
public class VerifyEmailDto {


    public String message;
    public String status;
    public String method;
}
