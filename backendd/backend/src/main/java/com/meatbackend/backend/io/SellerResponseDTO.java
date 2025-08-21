package com.meatbackend.backend.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerResponseDTO {

    private UUID id;

    private String name;

    private Timestamp createdOn;

    private boolean Status;

    private boolean KycVerified;



}
