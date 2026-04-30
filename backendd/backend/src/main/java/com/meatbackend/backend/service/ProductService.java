package com.meatbackend.backend.service;


import com.meatbackend.backend.io.request.ProductRequest;
import com.meatbackend.backend.io.response.ProductResponse;
import com.meatbackend.backend.io.response.ProductResponseDTO;
import com.meatbackend.backend.model.enums.ProductCategory;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    ProductResponse createProduct(ProductRequest productRequest,String ProductImgUrl );


    List<ProductResponseDTO> getProducts();

    List<ProductResponseDTO> getMyProducts();


    List<ProductResponseDTO> getProductsByCategory(ProductCategory productCategory);


    String updateProductViewCount(UUID productId);

    ProductResponseDTO getProductById(UUID id);

    List<ProductResponse> getProductsByName(String name);


}
