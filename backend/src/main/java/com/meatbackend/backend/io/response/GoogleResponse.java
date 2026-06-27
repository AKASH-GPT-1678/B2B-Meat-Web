package com.meatbackend.backend.io.response;


import lombok.Data;

@Data
public class GoogleResponse {
    public String token;
    public String email;
    public String name;

}
