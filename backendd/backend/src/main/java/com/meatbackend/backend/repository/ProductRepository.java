package com.meatbackend.backend.repository;

import com.meatbackend.backend.model.ProductCategory;
import com.meatbackend.backend.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductModel , UUID> {

//    List<ProductModel> findByName(String name);
//
//    List<ProductModel> findBySellerId(String sellerId);


     List<ProductModel> findByCategory(ProductCategory category);

     List<ProductModel> findByNameContainingIgnoreCase(String name);





}
