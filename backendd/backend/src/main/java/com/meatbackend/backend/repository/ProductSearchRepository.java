package com.meatbackend.backend.repository;

import com.meatbackend.backend.model.elasticsearch.ProductDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductSearchRepository extends ElasticsearchRepository<ProductDocument, UUID> {

    List<ProductDocument> findByNameContaining(String name);
    @Query("""
{
  "match_phrase_prefix": {
    "name": {
      "query": "?0"
    }
  }
}
""")
    List<ProductDocument> searchByPrefix(String keyword);
}
