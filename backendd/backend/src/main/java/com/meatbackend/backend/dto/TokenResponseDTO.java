package com.meatbackend.backend.dto;


import java.util.UUID;

import lombok.Data;

@Data
public class TokenResponseDTO {

    public boolean status;
    public String message;
    public boolean subscription;
    public boolean isSeller;
    public String email;
    public UUID id;

}
