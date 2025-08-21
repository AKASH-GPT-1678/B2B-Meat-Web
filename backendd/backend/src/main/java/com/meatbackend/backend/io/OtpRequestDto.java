package com.meatbackend.backend.io;


import lombok.Data;

@Data
public class OtpRequestDto {

    private String otp;
    private String userEmail;


}
