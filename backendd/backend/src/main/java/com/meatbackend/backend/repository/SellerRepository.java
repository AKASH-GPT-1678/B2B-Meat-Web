package com.meatbackend.backend.repository;

import com.meatbackend.backend.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SellerRepository extends JpaRepository<Seller , UUID> {


    Optional<Seller> findByBusinessEmail(String businessEmail);
    Optional<Seller> findById(UUID seller_id);

    Seller getById(UUID id); // But this is lazy and can throw errors if not found


}
