package com.meatbackend.backend.repository;

import com.meatbackend.backend.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog , Long> {


}
