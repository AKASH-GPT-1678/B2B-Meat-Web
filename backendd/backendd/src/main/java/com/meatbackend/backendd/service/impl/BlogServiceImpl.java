package com.meatbackend.backendd.service.impl;


import com.meatbackend.backendd.io.BlogRequestDTO;
import com.meatbackend.backendd.model.Blog;
import com.meatbackend.backendd.model.Seller;
import com.meatbackend.backendd.repository.SellerRepository;
import com.meatbackend.backendd.service.BlogService;
import com.meatbackend.backendd.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private final SellerRepository sellerRepository;


    public BlogServiceImpl(SellerRepository sellerRepository){
        this.sellerRepository = sellerRepository;
    }





    @Override
    public String createBlog(BlogRequestDTO blogRequestDTO) {
        Seller seller = sellerRepository.getById(blogRequestDTO.getSellerId());

        Blog newBlog = new Blog();

        newBlog.setTitle(blogRequestDTO.getTitle());
        newBlog.setHeadings(blogRequestDTO.getHeadings());
        newBlog.setContent(blogRequestDTO.getContent());
        newBlog.setThumbnail(blogRequestDTO.getThumbnail());
        newBlog.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        newBlog.setSeller(seller);


        return "Created";
    }
}
