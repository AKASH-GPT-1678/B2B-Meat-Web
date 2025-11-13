package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.exception.SellerAlreadyExistsException;
import com.meatbackend.backend.io.*;
import com.meatbackend.backend.model.Seller;
import com.meatbackend.backend.model.User;
import com.meatbackend.backend.repository.SellerRepository;
import com.meatbackend.backend.repository.UserRepository;
import com.meatbackend.backend.service.FileUploadService;
import com.meatbackend.backend.service.SellerService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.NoSuchElementException;


@Service
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;

    private final FileUploadService fileUploadService;

    private final UserRepository userRepository;

    public SellerServiceImpl(SellerRepository sellerRepository, FileUploadService fileUploadService, UserRepository userRepository){
        this.sellerRepository = sellerRepository;
        this.fileUploadService = fileUploadService;
        this.userRepository = userRepository;

    }




    @Override
    public SellerResponseDTO createSeller(SellerRequestDTO sellerRequestDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new NoSuchElementException("No User with Such EMail found"));

       if (user.getSeller() != null){
           throw new SellerAlreadyExistsException("Seller Already Exisst with Such User");

       }

            Seller newSeller = new Seller();
            newSeller.setId(user.getId());

            newSeller.setName(sellerRequestDTO.getName());
            newSeller.setAddress(sellerRequestDTO.getAddress());
            newSeller.setPincode(sellerRequestDTO.getPincode());
            newSeller.setEstYear(sellerRequestDTO.getEstYear());
            newSeller.setBusinessEmail(sellerRequestDTO.getBusinessEmail());
            newSeller.setBusinessType(sellerRequestDTO.getBusinessType());
            newSeller.setContact(sellerRequestDTO.getContact());
            newSeller.setAlternateContact(sellerRequestDTO.getAlternateContact());
            newSeller.setKycVerified(false);
            newSeller.setCreatedOn(new Timestamp(System.currentTimeMillis()));


            user.setSeller(newSeller);
            user.setUserSeller(true);
            userRepository.save(user);

            SellerResponseDTO response = new SellerResponseDTO();
            response.setId(newSeller.getId());
            response.setName(newSeller.getName());
            response.setCreatedOn(newSeller.getCreatedOn());
            response.setKycVerified(newSeller.isKycVerified());
            response.setStatus(true);

            return response;


    }


//    @Override
//    public void deleteSeller(String email) {
//
//        Seller seller = sellerRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("No Account with this Email found" + email));
//
//
//
//        sellerRepository.delete(seller);
//
//
//
//
//    }

//    @Override
//    public String verifyKyc(SellerDocumentsFileUploadRequestDTO verificationDocuments) {
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String email = authentication.getName();
//
//        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
//            throw new InvalidAuthenticationCodeException("User is not authenticated");
//        }
//
//        Seller seller = sellerRepository.findByEmail(email).
//                orElseThrow(
//                        ()-> new IllegalArgumentException("No Seller found with this email" + email)
//                );
//
//
//                ;
//
//
//        DocumentUrls alldocumentUrls = uploadKycDocuments(verificationDocuments);
//        seller.setFssaiLicence(alldocumentUrls.getFssaiLicenceUrl());
//        seller.setAadharcardUrl(alldocumentUrls.getAadharcardUrl());
//        seller.setUdyamLicense(alldocumentUrls.getUdyamLicenseUrl());
//        seller.setTradingLicense(alldocumentUrls.getTradingLicenseUrl());
//        seller.setKycVerified(true);
//
//        sellerRepository.save(seller);
//
//
//
//
//        return "Documents Uploaded Sucessfully";
//    }

    @Override
    public DocumentUrls uploadKycDocuments(SellerDocumentsFileUploadRequestDTO requestDTO) {
        String fssaiLicence = fileUploadService.uploadFile(requestDTO.getFssaiLicence());
        String udyamLicence = fileUploadService.uploadFile(requestDTO.getUdyamLicense());
        String tradingLicence = fileUploadService.uploadFile(requestDTO.getTradingLicense());
        String adharCardUrl = fileUploadService.uploadFile(requestDTO.getAadharcard());

        DocumentUrls documentUrls = new DocumentUrls();
        documentUrls.setFssaiLicenceUrl(fssaiLicence);
        documentUrls.setUdyamLicenseUrl(udyamLicence);
        documentUrls.setTradingLicenseUrl(tradingLicence);
        documentUrls.setAadharcardUrl(adharCardUrl);

        return documentUrls;
    }


}
