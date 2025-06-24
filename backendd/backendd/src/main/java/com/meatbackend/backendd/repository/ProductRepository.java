package com.meatbackend.backendd.repository;

import com.meatbackend.backendd.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductModel , UUID> {

//    List<ProductModel> findByName(String name);
//
//    List<ProductModel> findBySellerId(String sellerId);
}
