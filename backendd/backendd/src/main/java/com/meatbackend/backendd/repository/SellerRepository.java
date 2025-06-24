package com.meatbackend.backendd.repository;

import com.amazonaws.services.apigateway.model.Op;
import com.meatbackend.backendd.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SellerRepository extends JpaRepository<Seller , UUID> {

    Optional<Seller> findByEmail(String email);

    Seller getById(UUID id); // But this is lazy and can throw errors if not found


}
