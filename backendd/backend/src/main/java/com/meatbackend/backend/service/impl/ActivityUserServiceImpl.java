package com.meatbackend.backend.service.impl;


import com.meatbackend.backend.model.User;
import com.meatbackend.backend.repository.UserRepository;
import com.meatbackend.backend.service.ActivityUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ActivityUserServiceImpl implements ActivityUserService {

    private final UserRepository userRepository;

    @Override
    public void removeProfileImage() {
        Authentication authentication = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Step 3: Set default profile image URL
        user.setProfilePictureUrl("https://res.cloudinary.com/dffepahvl/image/upload/v1754295798/pwoveg1fjurga2kudwk4.png");

        // Step 4: Save updated user
        userRepository.save(user);


    }

    @Override
    public void addProfileImage(String imageUrl) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        user.setProfilePictureUrl(imageUrl); // Set the new profile image
        userRepository.save(user);

    }

    @Override
    public String enableChatStatus() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setChatStatus(true);
        userRepository.save(user);

        return "Chat Status Enabled";
    }

    @Override
    public String disableChatStatus() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setChatStatus(false);
        userRepository.save(user);

        return "Chat Status Disabled";
    }
    }

