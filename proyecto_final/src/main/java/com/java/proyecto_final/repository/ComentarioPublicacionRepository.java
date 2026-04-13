package com.java.proyecto_final.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.java.proyecto_final.entity.ComentarioPublicacion;
import java.util.List;

@Repository
public interface ComentarioPublicacionRepository extends JpaRepository<ComentarioPublicacion, Long> {
    List<ComentarioPublicacion> findByPublicacionIdOrderByFechaComentarioAsc(Long publicacionId);
}
