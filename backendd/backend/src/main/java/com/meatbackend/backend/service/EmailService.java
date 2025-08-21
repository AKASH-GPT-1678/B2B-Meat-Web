package com.meatbackend.backend.service;

import com.meatbackend.backend.io.OtpRequestDto;
import com.meatbackend.backend.model.EmailEntity;

public interface EmailService {

    String sendSimpleMail(EmailEntity emailEntity);

    Boolean verifyOtp(OtpRequestDto otpRequestDto);


}
