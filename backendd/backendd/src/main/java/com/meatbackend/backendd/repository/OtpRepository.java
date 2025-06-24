package com.meatbackend.backendd.repository;

import com.meatbackend.backendd.model.OtpModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<OtpModel , Long> {

    OtpModel findTopByUserEmailOrderByCreatedOnDesc(String userEmail);


}
