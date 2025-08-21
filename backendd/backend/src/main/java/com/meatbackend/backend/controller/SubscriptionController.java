package com.meatbackend.backend.controller;


import com.meatbackend.backend.io.NewSubscriptionDTO;
import com.meatbackend.backend.io.SubscriptionRequest;
import com.meatbackend.backend.service.impl.SubscriptionServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class SubscriptionController {

    private final SubscriptionServiceImpl subscriptionService;

    public SubscriptionController(SubscriptionServiceImpl subscriptionService){
        this.subscriptionService = subscriptionService;

    }

    @PostMapping("/addSubscription")
    public NewSubscriptionDTO addSubscription(@RequestBody SubscriptionRequest subscriptionRequest){
        System.out.println("updated");

        return subscriptionService.addSubscription(subscriptionRequest);
    }
}
