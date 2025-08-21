package com.meatbackend.backend.repository;

import com.meatbackend.backend.model.OtpModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<OtpModel , Long> {

    OtpModel findTopByUserEmailOrderByCreatedOnDesc(String userEmail);
    OtpModel findByUserEmailAndOtp(String userEmail, String otp);
    OtpModel findByUserEmail(String userEmail);


}
