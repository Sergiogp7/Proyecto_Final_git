package com.java.proyecto_final.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.proyecto_final.entity.Reserva;
import com.java.proyecto_final.entity.Usuario;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuario(Usuario usuario);
}
