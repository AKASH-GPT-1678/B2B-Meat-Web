package com.meatbackend.backendd.repository;

import com.meatbackend.backendd.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog , Long> {


}
