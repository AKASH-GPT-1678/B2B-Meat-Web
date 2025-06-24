package com.meatbackend.backendd.service.impl;

import com.meatbackend.backendd.io.SellerRequestDTO;
import com.meatbackend.backendd.io.SellerResponseDTO;
import com.meatbackend.backendd.model.Seller;
import com.meatbackend.backendd.repository.SellerRepository;
import com.meatbackend.backendd.service.SellerService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


@Service
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;

    public SellerServiceImpl(SellerRepository sellerRepository){
        this.sellerRepository = sellerRepository;

    }





    @Override
    public SellerResponseDTO createSeller(SellerRequestDTO sellerRequestDTO) {


        Seller seller = sellerRepository.findByEmail(sellerRequestDTO.getEmail())
                .orElseGet(() -> {
                    Seller newSeller = new Seller();
                    newSeller.setName(sellerRequestDTO.getName());
                    newSeller.setAddress(sellerRequestDTO.getAddress());
                    newSeller.setPincode(sellerRequestDTO.getPincode());
                    newSeller.setEstYear(sellerRequestDTO.getEstYear());
                    newSeller.setEmail(sellerRequestDTO.getEmail());
                    newSeller.setBusinessType(sellerRequestDTO.getBusinessType());
                    newSeller.setContact(sellerRequestDTO.getContact());
                    newSeller.setAlternateContact(sellerRequestDTO.getAlternateContact());
                    newSeller.setFssaiLicence(sellerRequestDTO.getFssaiLicence());
                    newSeller.setUdyamLicense(sellerRequestDTO.getUdyamLicense());
                    newSeller.setTradingLicense(sellerRequestDTO.getTradingLicense());
                    newSeller.setAadharcardUrl(sellerRequestDTO.getAadharcardUrl());

                    newSeller.setKycVerified(false);
                    newSeller.setCreatedOn(new Timestamp(System.currentTimeMillis()));

                    return sellerRepository.save(newSeller);
                });


        SellerResponseDTO response = new SellerResponseDTO();
        response.setKycVerified(seller.isKycVerified());
        response.setName(seller.getName());
        response.setStatus(true);
        response.setCreatedOn(seller.getCreatedOn());
        response.setId(seller.getId());

        return response;

}

    @Override
    public void deleteSeller(String email) {

        Seller seller = sellerRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No Account with this Email found" + email));



        sellerRepository.delete(seller);




    }


}
