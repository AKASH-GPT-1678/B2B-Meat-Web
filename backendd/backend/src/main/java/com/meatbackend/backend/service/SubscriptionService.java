package com.meatbackend.backend.service;

import com.meatbackend.backend.io.response.NewSubscriptionDTO;
import com.meatbackend.backend.io.request.SubscriptionRequest;

public interface SubscriptionService {

    NewSubscriptionDTO addSubscription(SubscriptionRequest subscriptionRequest);
}
