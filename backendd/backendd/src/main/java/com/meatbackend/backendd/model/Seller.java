package com.meatbackend.backendd.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seller")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String address;
    @Column(unique = true)
    private String email;
    private Long pincode;
    private Timestamp EstYear;
    private String BusinessType;
    private Long Contact;
    private Long alternateContact;
    private String fssaiLicence;
    private String UdyamLicense;
    private String tradingLicense;
    private String aadharcardUrl;
    private boolean KycVerified;

    private Timestamp createdOn;
    private Timestamp updatedOn;

    // Corrected: mappedBy should match the field name in ProductModel
    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductModel> products = new ArrayList<>();

    @OneToMany(mappedBy = "seller" , cascade = CascadeType.ALL , orphanRemoval = true)
    private List<Blog> blogs = new ArrayList<>();

}
