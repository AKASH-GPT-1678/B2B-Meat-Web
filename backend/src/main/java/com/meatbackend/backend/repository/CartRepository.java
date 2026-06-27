package com.meatbackend.backend.repository;

import com.meatbackend.backend.model.Cart;
import com.meatbackend.backend.model.ProductModel;
import com.meatbackend.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserAndProduct(User user, ProductModel product);

    List<Cart> findByUser(User user);

}
