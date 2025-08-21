package com.meatbackend.backend.io;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordResponse {
    private boolean success;
    private String message;
    private String email;

}
