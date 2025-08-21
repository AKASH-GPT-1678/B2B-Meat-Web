package com.meatbackend.backend.service.impl;

import com.amazonaws.services.mq.model.NotFoundException;
import com.meatbackend.backend.io.ProductRequest;
import com.meatbackend.backend.io.ProductResponse;
import com.meatbackend.backend.io.ProductResponseDTO;
import com.meatbackend.backend.model.ProductCategory;
import com.meatbackend.backend.model.ProductModel;
import com.meatbackend.backend.model.Seller;
import com.meatbackend.backend.model.User;
import com.meatbackend.backend.repository.ProductRepository;
import com.meatbackend.backend.repository.SellerRepository;
import com.meatbackend.backend.repository.UserRepository;
import com.meatbackend.backend.service.ProductService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {


    private final SellerRepository sellerRepository;
    private final  ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductServiceImpl(SellerRepository sellerRepository, ProductRepository productRepository, UserRepository userRepository){
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }






    @Override
    public ProductResponse createProduct(ProductRequest productRequest, String ProductImgUrl) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
         String email = authentication.getName();


        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new NoSuchElementException("No Element not found"));


         Seller seller = user.getSeller();

         if(user.getSeller() == null) {
             throw new NotFoundException("No Such Seller Found");


         }
        ProductModel productModel = new ProductModel();
        productModel.setName(productRequest.getName());
        productModel.setDescription(productRequest.getDescription());
        productModel.setMinimumOrderQuantity(productRequest.getMinimumOrderQuantity());
        productModel.setPrice(productRequest.getPrice());
        productModel.setExportable(productRequest.isExportable());
        productModel.setCategory(productRequest.getCategory());
        productModel.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        productModel.setProductImgUrl(ProductImgUrl);
        productModel.setSeller(seller);

        ProductModel newProduct = productRepository.save(productModel);

        ProductResponse productResponse =  new ProductResponse();
        productResponse.setStatus(true);
        productResponse.setProductName(newProduct.getName());
        productResponse.setMessage("Product Created Successfully");
        productResponse.setProductId(newProduct.getId());

        return productResponse;
    }

    @Override
    public List<ProductResponseDTO> getProducts() {

        List<ProductModel> products = productRepository.findAll();
        List<ProductResponseDTO> response = products.stream()
                .map(p -> new ProductResponseDTO(
                        p.getId(),
                        p.getName(),
                        p.getSeller().getName(),
                        p.getDescription(),
                        p.getMinimumOrderQuantity(),
                        p.getPrice(),
                        p.getProductImgUrl(),
                        p.isExportable(),
                        p.getCategory(),
                        p.getCreatedOn(),
                        p.getUpdatedOn()
                ))
                .collect(Collectors.toList());

        return response;
    }


    @Override
    public List<ProductResponseDTO> getMyProducts() {
        // Get authenticated user's email
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        // Fetch user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("User not found with email: " + email));

        // Ensure the user has an associated seller
        Seller seller = user.getSeller();
        if (seller == null) {
            throw new NoSuchElementException("No seller linked to this user.");
        }


        List<ProductModel> products = seller.getProducts();


        if (products == null || products.isEmpty()) {
            return List.of();  // Java 9+ empty immutable list
        }

        // Map each ProductModel to ProductResponseDTO
        List<ProductResponseDTO> productResponseDTOs = products.stream()
                .map(product -> new ProductResponseDTO(
                        product.getId(),
                        product.getName(),
                        product.getSeller().getName(),
                        product.getDescription(),
                        product.getMinimumOrderQuantity(),
                        product.getPrice(),
                        product.getProductImgUrl(),
                        product.isExportable(),
                        product.getCategory(),
                        product.getCreatedOn(),
                        product.getUpdatedOn()
                ))
                .toList(); // Use .collect(Collectors.toList()) if you're using Java 8

        return productResponseDTOs;
    }

    @Override
    public List<ProductResponseDTO> getProductsByCategory(ProductCategory productCategory) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();


        List<ProductModel> productModels = productRepository.findByCategory(productCategory);
        List<ProductResponseDTO> productResponseDTOs = productModels.stream()
                .map(product -> new ProductResponseDTO(
                        product.getId(),
                        product.getName(),
                        product.getSeller().getName(),
                        product.getDescription(),
                        product.getMinimumOrderQuantity(),
                        product.getPrice(),
                        product.getProductImgUrl(),
                        product.isExportable(),
                        product.getCategory(),
                        product.getCreatedOn(),
                        product.getUpdatedOn()
                ))
                .toList();






        return productResponseDTOs;
    }

    @Override
    public String updateProductViewCount(UUID productId) {

        ProductModel product = productRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product not found with id: " + productId));


        Long viewCount = product.getViewCount();
        product.setViewCount(viewCount + 1);
        productRepository.save(product);
        return "ViewCount Updated Successfully";
    }

    @Override
    public ProductResponseDTO getProductById(UUID id) {
        ProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));



        return mapToDTO(product);
    }

    @Override
    public List<ProductResponse> getProductsByName(String name) {
        List<ProductModel> productModels = productRepository.findByNameContainingIgnoreCase(name);
        if(productModels.isEmpty()){
            throw new NotFoundException("No Such Elements found");
        }
        List<ProductResponse> foundProducts = productModels.stream()
                .map(product -> new ProductResponse(
                        product.getId(),
                        true,
                        "goat life",
                        product.getName(),
                        product.getProductImgUrl()
                ))
                .toList();



        return foundProducts;
    }

    private ProductResponseDTO mapToDTO(ProductModel product) {
        return new ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getSeller().getName(),
                product.getDescription(),
                product.getMinimumOrderQuantity(),
                product.getPrice(),
                product.getProductImgUrl(),
                product.isExportable(),
                product.getCategory(),
                product.getCreatedOn(),
                product.getUpdatedOn()
        );
    }

}
