package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {
    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    // This will return roles like ROLE_USER, ROLE_ADMIN etc.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.stream(user.getRoles().split(","))
                .map(String::trim)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    // Spring uses this for password checking
    @Override
    public String getPassword() {
        return user.getPassword(); // make sure it's hashed in DB
    }

    // Spring treats this as the "username", so you're returning email
    @Override
    public String getUsername() {
        return user.getEmail(); // you're authenticating with email
    }

    // Optional: get actual username if needed
    public String getActualUsername() {
        return user.getUsername(); // in case you store full name/username separately
    }

    public User getUser() {
        return this.user;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
