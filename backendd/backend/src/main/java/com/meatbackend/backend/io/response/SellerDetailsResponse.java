package com.meatbackend.backend.io.response;


import com.meatbackend.backend.model.Blog;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerDetailsResponse {

    private UUID id;
    private String name;
    private String address;
    private String businessEmail;
    private Long pincode;
    private Timestamp estYear;
    private String businessType;
    private Long contact;
    private Long alternateContact;
    private String fssaiLicence;
    private String udyamLicense;
    private String tradingLicense;
    private String aadharcardUrl;
    private boolean kycVerified;
    private Timestamp createdOn;
    private Timestamp updatedOn;


    private List<ProductResponse> products;
    private List<Blog> blogs;
}