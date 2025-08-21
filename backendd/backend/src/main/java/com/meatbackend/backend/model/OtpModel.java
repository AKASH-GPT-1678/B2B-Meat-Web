package com.meatbackend.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "otp")
@NoArgsConstructor
@AllArgsConstructor
public class OtpModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String otp;
    private String userEmail;
    private Timestamp createdOn;
}
