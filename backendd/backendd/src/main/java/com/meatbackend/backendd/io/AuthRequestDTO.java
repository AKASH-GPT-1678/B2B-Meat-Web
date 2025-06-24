package com.meatbackend.backendd.io;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequestDTO {

    private String userName;
    private String password;

}

