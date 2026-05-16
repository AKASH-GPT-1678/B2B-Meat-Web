package com.meatbackend.backend.repository;

import com.meatbackend.backend.model.elasticsearch.ProductDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


public interface ProductSearchRepository
        extends ElasticsearchRepository<ProductDocument, String> {

    // Spring Data will auto-generate this query
    List<ProductDocument> findByName(String name);
}