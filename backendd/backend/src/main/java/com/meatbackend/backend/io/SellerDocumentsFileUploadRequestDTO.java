package com.meatbackend.backend.io;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SellerDocumentsFileUploadRequestDTO {
    private MultipartFile fssaiLicence;
    private MultipartFile udyamLicense;
    private MultipartFile tradingLicense;
    private MultipartFile aadharcard;

}
