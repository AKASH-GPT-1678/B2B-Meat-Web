package com.meatbackend.backend.io;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class SellerDocumentsRequestDTO {

    @NotBlank(message = "FSSAI Licence is required")
    private String fssaiLicence;

    @NotBlank(message = "Udyam License is required")
    private String udyamLicense;

    @NotBlank(message = "Trading License is required")
    private String tradingLicense;

    @NotBlank(message = "Aadhar card URL is required")
    private String aadharcardUrl;

}
