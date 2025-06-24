package com.meatbackend.backendd.service.impl;

import com.meatbackend.backendd.io.OtpRequestDto;
import com.meatbackend.backendd.model.EmailEntity;
import com.meatbackend.backendd.model.OtpModel;
import com.meatbackend.backendd.model.User;
import com.meatbackend.backendd.repository.OtpRepository;
import com.meatbackend.backendd.repository.UserRepository;
import com.meatbackend.backendd.service.EmailService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;


@Service
public class EmailServiceImpl implements EmailService {

    @Autowired private JavaMailSender javaMailSender;
    private final OtpRepository otpRepository;
    private final UserRepository userRepository;

    @Value("${spring.mail.username}") private String sender;

    public EmailServiceImpl(OtpRepository otpRepository , UserRepository userRepository) {
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
    }



    @Override
    public String sendSimpleMail(EmailEntity emailEntity) {
        try{

            SimpleMailMessage mailMessage = new SimpleMailMessage();

            String Otp = this.generateOtp();




            mailMessage.setFrom(sender);
            mailMessage.setTo(emailEntity.getRecipient());
            mailMessage.setText(Otp);
            mailMessage.setSubject(emailEntity.getSubject());

            Timestamp timestamp = new Timestamp(System.currentTimeMillis());


            OtpModel newOtp = new OtpModel();
            newOtp.setOtp(Otp);
            newOtp.setUserEmail(emailEntity.getRecipient());
            newOtp.setCreatedOn(timestamp);


            javaMailSender.send(mailMessage);
            otpRepository.save(newOtp);
            return "Mail Sent Successfully...";

        }
        catch (Exception e){
            return "Error while sending mail!!!";

        }
    }

    @Override
    public Boolean verifyOtp(OtpRequestDto otpRequestDto) {
        OtpModel savedOtp = otpRepository.findTopByUserEmailOrderByCreatedOnDesc(otpRequestDto.getUserEmail());
        Timestamp currentTime  = new Timestamp(System.currentTimeMillis());
        long difference = currentTime.getTime() - savedOtp.getCreatedOn().getTime();

        if (difference > 120000) {
            throw new IllegalStateException("OTP Expired");
        } else if (otpRequestDto.getOtp().equals(savedOtp.getOtp())) {
            return true;
        }

        return false; // OTP didn't match
    }


    public String generateOtp() {

        StringBuilder otp = new StringBuilder();

        int run = 4;

        while (run != 0) {
            double a = Math.random();
            int rand = (int) (a * 10);

            otp.append(rand);
            run--;

        }
        ;
        System.out.println(otp);

        return otp.toString();

    }


    public User createUser(User user){
        User newUser = userRepository.save(user);
        return newUser;




    }







}
