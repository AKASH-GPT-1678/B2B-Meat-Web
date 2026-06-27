package com.meatbackend.backend.service.impl;


import com.meatbackend.backend.io.request.BlogRequestDTO;
import com.meatbackend.backend.model.Blog;
import com.meatbackend.backend.model.Seller;
import com.meatbackend.backend.repository.BlogRepository;
import com.meatbackend.backend.repository.SellerRepository;
import com.meatbackend.backend.service.BlogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.NoSuchElementException;

@Slf4j
@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private final SellerRepository sellerRepository;

    @Autowired
    private BlogRepository blogRepository;


    public BlogServiceImpl(SellerRepository sellerRepository){
        this.sellerRepository = sellerRepository;
    }





    @Override
    public String createBlog(BlogRequestDTO blogRequestDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        log.info("Email: " + email);


        Seller seller = sellerRepository.findByBusinessEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Seller Not Found"));


        Blog newBlog = new Blog();


        newBlog.setTitle(blogRequestDTO.getTitle());
        newBlog.setHeadings(blogRequestDTO.getHeadings());
        newBlog.setContent(blogRequestDTO.getContent());
        newBlog.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        newBlog.setSeller(seller);
        blogRepository.save(newBlog);


        return "Created";
    }
}
