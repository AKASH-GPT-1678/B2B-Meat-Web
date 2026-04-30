package com.meatbackend.backend.io.response;


import lombok.Data;

@Data
public class NewSubscriptionDTO {

    public boolean status;
    public String message;
    public String userId;
}
