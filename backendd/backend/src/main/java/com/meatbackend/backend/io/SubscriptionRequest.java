package com.meatbackend.backend.io;


import lombok.Data;

@Data
public class SubscriptionRequest {
    private String amount;
    private String order_id;
}
