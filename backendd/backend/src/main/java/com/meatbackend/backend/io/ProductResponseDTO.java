package com.meatbackend.backend.io;

import com.meatbackend.backend.model.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.sql.Timestamp;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ProductResponseDTO {
    private UUID id;
    private String name;
    private String sellerName;
    private String description;
    private String minimumOrderQuantity;
    private Long price;
    private String productImgUrl;
    private boolean isExportable;
    private ProductCategory category;
    private Timestamp createdOn;
    private Timestamp updatedOn;
}
