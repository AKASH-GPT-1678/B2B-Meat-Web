package com.meatbackend.backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private boolean isOnline;


}