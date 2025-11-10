package com.meatbackend.backend.io;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {


    private UUID productId;
    private boolean status;
    private String message;
    private String productName;



}
