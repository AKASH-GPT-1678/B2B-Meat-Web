package com.meatbackend.backend.controller;


import com.meatbackend.backend.io.ProductRequest;
import com.meatbackend.backend.io.ProductResponse;
import com.meatbackend.backend.io.ProductResponseDTO;
import com.meatbackend.backend.io.VerifyEmailDto;
import com.meatbackend.backend.model.ProductCategory;
import com.meatbackend.backend.service.AuthService;
import com.meatbackend.backend.service.FileUploadService;
import com.meatbackend.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/product")
public class ProductController {


     private final FileUploadService fileUploadService;
     private final ProductService productService;
     private final AuthService authService;

     public ProductController(FileUploadService fileUploadService , ProductService productService, AuthService authService){
         this.fileUploadService = fileUploadService;
         this.productService = productService;
         this.authService = authService;

     }


    @PostMapping("/create" )
    public ResponseEntity<ProductResponse> createProduct(@ModelAttribute ProductRequest productRequest , @RequestParam("file") MultipartFile file){
         String fileUrl = fileUploadService.uploadFile(file);

         ProductResponse response = productService.createProduct(productRequest , fileUrl);


        return new ResponseEntity<>(response , HttpStatus.CREATED);
    };


     @GetMapping("/getProducts")
     public List<ProductResponseDTO> getProducts(){
         return productService.getProducts();

     }

    @GetMapping("/getProduct")
    public List<ProductResponseDTO> getProductByCategory(@RequestParam("type" )ProductCategory productCategory) {
        return productService.getProductsByCategory(productCategory);
    };

    @GetMapping("/livestock")
    public ResponseEntity<ProductResponseDTO> getLivestockProduct(@RequestParam("id") UUID id) {
        ProductResponseDTO dto = productService.getProductById(id);
        return ResponseEntity.ok(dto);
    }


    @GetMapping("/userverify")
    public ResponseEntity<VerifyEmailDto> verifyEmail(@RequestParam("email") String email){

        VerifyEmailDto verifyEmail = authService.verifyUser(email);

        return ResponseEntity.ok().body(verifyEmail);


    };

     @PutMapping("/viewcount")
     public ResponseEntity<String> updateViewCount(@RequestParam("productId")UUID productId){
         String countStatus = productService.updateProductViewCount(productId);
         return ResponseEntity.ok().body(countStatus);
     }

     @GetMapping("/myLivestock")
     public ResponseEntity<List<ProductResponseDTO>> getMyProducts(){

         List<ProductResponseDTO> productResponseDTOS = productService.getMyProducts();
         return ResponseEntity.ok().body(productResponseDTOS);
     }









}
