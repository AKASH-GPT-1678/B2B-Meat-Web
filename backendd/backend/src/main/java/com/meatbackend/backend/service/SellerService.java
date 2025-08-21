package com.meatbackend.backend.service;

import com.meatbackend.backend.io.*;

public interface SellerService {


    SellerResponseDTO createSeller(SellerRequestDTO sellerRequestDTO);



//
//    void deleteSeller(String email);
//
//    String verifyKyc(SellerDocumentsFileUploadRequestDTO documents);

    DocumentUrls uploadKycDocuments(SellerDocumentsFileUploadRequestDTO requestDTO);





}
