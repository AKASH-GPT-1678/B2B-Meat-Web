package com.meatbackend.backendd.service;

import com.meatbackend.backendd.io.OtpRequestDto;
import com.meatbackend.backendd.model.EmailEntity;

public interface EmailService {

    String sendSimpleMail(EmailEntity emailEntity);

    Boolean verifyOtp(OtpRequestDto otpRequestDto);


}
