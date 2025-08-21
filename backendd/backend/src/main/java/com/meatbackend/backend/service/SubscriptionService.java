package com.meatbackend.backend.service;

import com.meatbackend.backend.io.NewSubscriptionDTO;
import com.meatbackend.backend.io.SubscriptionRequest;

public interface SubscriptionService {

    NewSubscriptionDTO addSubscription(SubscriptionRequest subscriptionRequest);
}
