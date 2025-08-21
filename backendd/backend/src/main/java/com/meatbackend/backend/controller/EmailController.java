package com.meatbackend.backend.controller;

import com.meatbackend.backend.io.OtpRequestDto;
import com.meatbackend.backend.model.EmailEntity;
import com.meatbackend.backend.service.EmailService;
import com.meatbackend.backend.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/sendmail")
    public String sendMail(@RequestBody EmailEntity emailEntity) {
        return emailService.sendSimpleMail(emailEntity);
    }


    @GetMapping("/verify")
    public Boolean verifyOtp(@RequestBody OtpRequestDto otpRequestDto){

        return emailService.verifyOtp(otpRequestDto);

    }

    @GetMapping("/resend")
    public Boolean resendOtp(@RequestBody OtpRequestDto otpRequestDto){
        return null;
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file){

        return fileUploadService.uploadFile(file);

    }
}
