package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.io.response.NewSubscriptionDTO;
import com.meatbackend.backend.io.request.SubscriptionRequest;
import com.meatbackend.backend.model.User;
import com.meatbackend.backend.repository.UserRepository;
import com.meatbackend.backend.service.SubscriptionService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final UserRepository userRepository;

    public SubscriptionServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public NewSubscriptionDTO addSubscription(SubscriptionRequest subscriptionRequest) {
        NewSubscriptionDTO newSubscriptionDTO = new NewSubscriptionDTO();

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            Optional<User> existingUser = userRepository.findByEmail(email);

            if (existingUser.isPresent()) {
                User user = existingUser.get();

                // 🔁 Update subscription status
                user.setPremium(true);
                userRepository.save(user); // 💾 Save updated user

                // ✅ Prepare successful response
                newSubscriptionDTO.setMessage("Subscription activated successfully");
                newSubscriptionDTO.setStatus(true);
                newSubscriptionDTO.setUserId(email);
            } else {
                // 🛑 User not found
                newSubscriptionDTO.setMessage("User not found, cannot activate subscription");
                newSubscriptionDTO.setStatus(false);
                newSubscriptionDTO.setUserId(null);
            }
        } catch (Exception e) {
            // ❗ Handle unexpected errors
            newSubscriptionDTO.setMessage("An error occurred: " + e.getMessage());
            newSubscriptionDTO.setStatus(false);
            newSubscriptionDTO.setUserId(null);
        }

        return newSubscriptionDTO;
    }
}