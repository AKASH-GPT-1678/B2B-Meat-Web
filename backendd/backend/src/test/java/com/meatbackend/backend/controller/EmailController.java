package com.meatbackend.backend.controller;

import com.meatbackend.backend.model.EmailEntity;
import com.meatbackend.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendmail")
    public String sendMail(@RequestBody EmailEntity emailEntity) {
        return emailService.sendSimpleMail(emailEntity);
    }
}
