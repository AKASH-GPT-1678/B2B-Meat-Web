package com.meatbackend.backend.repository;


import com.meatbackend.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message , Long> {
    List<Message> findByRoomIdOrderByCreatedAtAsc(String roomId);

    @Query("SELECT m FROM Message m WHERE m.roomId = :roomId ORDER BY m.createdAt DESC")
    List<Message> findRecentMessagesByRoom(@Param("roomId") String roomId);
}

