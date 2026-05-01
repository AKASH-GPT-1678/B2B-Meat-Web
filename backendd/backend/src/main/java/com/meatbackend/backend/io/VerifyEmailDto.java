package com.meatbackend.backend.io;


import lombok.Data;

@Data
public class VerifyEmailDto {


    public String message;
    public String status;
    public String method;

    @Data
    public static class UserDto {
        private Long id;
        private String username;
        private String email;
        private boolean isOnline;


    }
}
