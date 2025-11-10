package com.meatbackend.backend.io;


import com.meatbackend.backend.model.ProductCategory;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank(message = "Name cannot be blank")
    @Size(min = 3, max = 100, message = "Name must be 3 to 100 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 3000, message = "Description can't exceed 1000 characters")
    private String description;

    @NotBlank
    @Size(min = 100, message = "Minimum Order Quantity must be at least 100 characters")
    private String minimumOrderQuantity;

    @NotNull
    @Positive(message = "Price must be a positive number")
    @Max(value = 1000000, message = "Price seems unreasonably high")
    private Long Price;


    @NotBlank(message = "Category Cannot be Empty")
    private ProductCategory category;


    private boolean isExportable;
}
