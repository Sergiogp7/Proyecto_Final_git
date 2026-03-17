package com.java.proyecto_final.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.proyecto_final.entity.Gimnasio;
import com.java.proyecto_final.entity.Reserva;
import com.java.proyecto_final.entity.Sala;
import com.java.proyecto_final.entity.Usuario;
import com.java.proyecto_final.repository.GimnasioRepository;
import com.java.proyecto_final.repository.ReservaRepository;
import com.java.proyecto_final.repository.SalaRepository;
import com.java.proyecto_final.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private GimnasioRepository gimnasioRepository;

    @Autowired
    private SalaRepository salaRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/gyms")
    public List<Gimnasio> getAllGyms() {
        return gimnasioRepository.findAll();
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> bookingData) {
        String email = (String) bookingData.get("userEmail");
        Long salaId = Long.valueOf(bookingData.get("salaId").toString());
        String horario = (String) bookingData.get("horario");
        Double precio = Double.valueOf(bookingData.get("precio").toString());

        Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
        Sala sala = salaRepository.findById(salaId).orElse(null);

        if (usuario == null || sala == null) {
            return ResponseEntity.badRequest().body("Usuario o sala no encontrados");
        }

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setSala(sala);
        reserva.setHorario(horario);
        reserva.setPrecioTotal(precio);
        reserva.setFechaReserva(LocalDateTime.now());

        Reserva savedReserva = reservaRepository.save(reserva);
        return ResponseEntity.ok(savedReserva);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserBookings(@PathVariable String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
        if (usuario == null) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(reservaRepository.findByUsuario(usuario));
    }
}
