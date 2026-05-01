package com.meatbackend.backend.controller;


import com.meatbackend.backend.io.request.SellerRequestDTO;
import com.meatbackend.backend.io.response.SellerDetailsResponse;
import com.meatbackend.backend.io.response.SellerResponseDTO;
import com.meatbackend.backend.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/seller")
public class SellerController {



    private final SellerService sellerService;

    public SellerController(SellerService sellerService){
        this.sellerService = sellerService;

    }


    @PostMapping("/create")
    public ResponseEntity<SellerResponseDTO> createSeller(@RequestBody  SellerRequestDTO sellerRequestDTO){
       SellerResponseDTO newSeller = sellerService.createSeller(sellerRequestDTO);
       return ResponseEntity.ok().body(newSeller);


    };

//    @PostMapping("/verifyKyc")
//    public ResponseEntity<String> uploadDocumentsforKyc(@ModelAttribute SellerDocumentsFileUploadRequestDTO documents){
//        String uploadResponse = sellerService.verifyKyc(documents);
//        return ResponseEntity.ok().body(uploadResponse);
//    };
//
//
//    @GetMapping("/delete")
//    public String deleteSeller(String email){
//        sellerService.deleteSeller(email);
//
//        return "Seller Deleted Successfully";
//    }

    @GetMapping("/details/{sellerId}")
    public ResponseEntity<SellerDetailsResponse> getSellerDetails(
            @PathVariable("sellerId") UUID sellerId

    ){

        SellerDetailsResponse response = sellerService.getSellerDetails(sellerId);
        return ResponseEntity.ok(response);


    }
}
