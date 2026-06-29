package com.meatbackend.backend.service.impl;

//import co.elastic.clients.elasticsearch._types.query_dsl.TextQueryType;
//import com.meatbackend.backend.model.elasticsearch.ProductDocument;
//import org.springframework.data.elasticsearch.client.elc.NativeQuery;
//import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
//import org.springframework.data.elasticsearch.core.SearchHit;
//import org.springframework.data.elasticsearch.core.SearchHits;
//import org.springframework.data.elasticsearch.core.query.Query;
//import org.springframework.stereotype.Service;
//import lombok.RequiredArgsConstructor;
//import java.util.List;
//import java.util.stream.Collectors;
//@Service
//@RequiredArgsConstructor
//public class ProductSearchService {
//
//    private final ElasticsearchOperations elasticsearchOperations;
//
//    public List<ProductDocument> searchByName(String query) {
//        Query searchQuery = NativeQuery.builder()
//                .withQuery(q -> q
//                        .multiMatch(mm -> mm
//                                .query(query)
//                                .fields(
//                                        "name",
//                                        "name._2gram",
//                                        "name._3gram",
//                                        "name._index_prefixes"
//                                )
//                                .type(TextQueryType.BoolPrefix)  // enables prefix matching
//                        )
//                )
//                .build();
//
//        SearchHits<ProductDocument> hits =
//                elasticsearchOperations.search(searchQuery, ProductDocument.class);
//
//        return hits.stream()
//                .map(SearchHit::getContent)
//                .collect(Collectors.toList());
//    }
//}