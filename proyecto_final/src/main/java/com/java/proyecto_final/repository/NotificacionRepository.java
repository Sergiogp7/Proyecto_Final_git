package com.java.proyecto_final.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.java.proyecto_final.entity.Notificacion;
import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    List<Notificacion> findByUsuario_IdOrderByFechaDesc(Long usuarioId);
}
