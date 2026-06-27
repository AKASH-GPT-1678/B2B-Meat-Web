package com.meatbackend.backend.io.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddToCartResponse {

    private boolean success;
    private String message;
    private Long cartId;
    private Long productId;
    private Integer quantity;
    private Integer cartItemCount;


}
