package com.meatbackend.backend.io;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Pincode is required")
    @Min(value = 100000, message = "Pincode must be at least 6 digits")
    @Max(value = 999999, message = "Pincode must be 6 digits")
    private Long pincode;

    @NotNull(message = "Establishment year is required")
    private Timestamp estYear;

    @NotBlank(message = "Business Email is Required")
    private String businessEmail;





    @NotBlank(message = "Business type is required")
    private String businessType;

    @NotNull(message = "Primary contact is required")
    @Digits(integer = 10, fraction = 0, message = "Contact must be a 10-digit number")
    private Long contact;

    @NotNull(message = "Alternate contact is required")
    @Digits(integer = 10, fraction = 0, message = "Alternate contact must be a 10-digit number")
    private Long alternateContact;





}
