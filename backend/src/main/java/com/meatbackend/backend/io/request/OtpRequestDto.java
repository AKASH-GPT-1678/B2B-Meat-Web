package com.meatbackend.backend.io.request;


import lombok.Data;

@Data
public class OtpRequestDto {

    private String otp;
    private String userEmail;


}
