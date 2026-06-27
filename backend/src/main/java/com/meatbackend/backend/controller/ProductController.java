package com.meatbackend.backend.controller;


import com.meatbackend.backend.io.request.AddCartRequest;
import com.meatbackend.backend.io.request.ProductRequest;
import com.meatbackend.backend.io.response.AddToCartResponse;
import com.meatbackend.backend.io.response.ProductResponse;
import com.meatbackend.backend.io.response.ProductResponseDTO;
import com.meatbackend.backend.model.ProductModel;
import com.meatbackend.backend.model.elasticsearch.ProductDocument;
import com.meatbackend.backend.model.enums.ProductCategory;
import com.meatbackend.backend.repository.ProductRepository;
import com.meatbackend.backend.service.AuthService;
import com.meatbackend.backend.service.FileUploadService;
import com.meatbackend.backend.service.ProductService;
import com.meatbackend.backend.service.impl.ProductSearchService;
import com.meatbackend.backend.service.impl.ProductSyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {


     private final FileUploadService fileUploadService;
     private final ProductService productService;
     private final AuthService authService;
     private final ProductSearchService searchService;
     private final ProductRepository productRepository;
     private final ProductSyncService productSyncService;





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




     @PutMapping("/viewcount")
     public ResponseEntity<String> updateViewCount(@RequestParam("productId")UUID productId){
         String countStatus = productService.updateProductViewCount(productId);
         return ResponseEntity.ok().body(countStatus);
     }

     @GetMapping("/mylivestock")
     public ResponseEntity<List<ProductResponseDTO>> getMyProducts(){

         List<ProductResponseDTO> productResponseDTOS = productService.getMyProducts();
         return ResponseEntity.ok().body(productResponseDTOS);
     }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDocument>> search(
            @RequestParam String q) {
        return ResponseEntity.ok(searchService.searchByName(q));
    }
    @GetMapping("/reindex")
    public ResponseEntity<String> reindex() {
        List<ProductModel> allProducts = productRepository.findAll();
        allProducts.forEach(productSyncService::indexProduct);
        return ResponseEntity.ok("Indexed " + allProducts.size() + " products");
    }

    @PostMapping("cart/add")
    public ResponseEntity<AddToCartResponse> addToCart(
            @RequestBody AddCartRequest request) {

        AddToCartResponse response = productService.addToCart(
                request.getProductId(),
                request.getQuantity()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/my_cart")
    public ResponseEntity<List<ProductResponseDTO>> getMyCart() {

        List<ProductResponseDTO> cartProducts = productService.getMyCart();

        return ResponseEntity.ok(cartProducts);
    }









}
