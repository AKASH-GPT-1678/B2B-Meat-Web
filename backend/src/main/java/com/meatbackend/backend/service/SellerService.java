package com.meatbackend.backend.service;

import com.meatbackend.backend.io.*;
import com.meatbackend.backend.io.request.SellerDocumentsFileUploadRequestDTO;
import com.meatbackend.backend.io.request.SellerRequestDTO;
import com.meatbackend.backend.io.response.SellerDetailsResponse;
import com.meatbackend.backend.io.response.SellerResponseDTO;

import java.util.UUID;

public interface SellerService {


    SellerResponseDTO createSeller(SellerRequestDTO sellerRequestDTO);



//
//    void deleteSeller(String email);
//
//    String verifyKyc(SellerDocumentsFileUploadRequestDTO documents);

    DocumentUrls uploadKycDocuments(SellerDocumentsFileUploadRequestDTO requestDTO);

    SellerDetailsResponse getSellerDetails(UUID sellerId);





}
