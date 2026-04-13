package com.java.proyecto_final.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.java.proyecto_final.entity.Publicacion;
import java.util.List;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    List<Publicacion> findAllByOrderByFechaPublicacionDesc();
}
