package com.meatbackend.backendd.service;

import com.meatbackend.backendd.io.SellerRequestDTO;
import com.meatbackend.backendd.io.SellerResponseDTO;

public interface SellerService {


    SellerResponseDTO createSeller(SellerRequestDTO sellerRequestDTO);

    void deleteSeller(String email);



}
