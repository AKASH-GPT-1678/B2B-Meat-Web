package com.meatbackend.backendd.controller;


import com.meatbackend.backendd.io.SellerRequestDTO;
import com.meatbackend.backendd.io.SellerResponseDTO;
import com.meatbackend.backendd.model.Seller;
import com.meatbackend.backendd.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
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


    @GetMapping("/delete")
    public String deleteSeller(String email){
        sellerService.deleteSeller(email);

        return "Seller Deleted Successfully";
    }
}
