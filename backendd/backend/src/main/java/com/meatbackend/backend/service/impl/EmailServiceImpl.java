package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.io.OtpRequestDto;
import com.meatbackend.backend.model.EmailEntity;
import com.meatbackend.backend.model.OtpModel;
import com.meatbackend.backend.model.User;
import com.meatbackend.backend.repository.OtpRepository;
import com.meatbackend.backend.repository.UserRepository;
import com.meatbackend.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


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
        System.out.println(otpRequestDto.getUserEmail());
        Timestamp currentTime  = new Timestamp(System.currentTimeMillis());
        long difference = currentTime.getTime() - savedOtp.getCreatedOn().getTime();

        if (difference > 120000) {
            throw new IllegalStateException("OTP Expired");
        } else if (otpRequestDto.getOtp().equals(savedOtp.getOtp())) {
            return true;
        }

        return false;
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
