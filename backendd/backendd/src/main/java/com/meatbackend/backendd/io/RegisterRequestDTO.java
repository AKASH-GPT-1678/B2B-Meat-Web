package com.meatbackend.backendd.io;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class RegisterRequestDTO {

    private String userName;
    private String password;
    private String email;

}
