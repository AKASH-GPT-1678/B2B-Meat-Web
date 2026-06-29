package com.meatbackend.backend.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCartRequest {
    private UUID productId;
    private Integer quantity;
}
