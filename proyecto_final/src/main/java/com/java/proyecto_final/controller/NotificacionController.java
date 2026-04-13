package com.java.proyecto_final.controller;

import com.java.proyecto_final.entity.Notificacion;
import com.java.proyecto_final.entity.Usuario;
import com.java.proyecto_final.repository.NotificacionRepository;
import com.java.proyecto_final.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/{username}")
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getNotificaciones(@PathVariable String username) {
        Usuario user = usuarioRepository.findByUsername(username).orElse(null);
        if (user == null) return List.of();
        
        List<Notificacion> list = notificacionRepository.findByUsuario_IdOrderByFechaDesc(user.getId());
        
        return list.stream().map(n -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", n.getId());
            map.put("mensaje", n.getMensaje());
            map.put("tipo", n.getTipo());
            map.put("leida", n.isLeida());
            map.put("fecha", n.getFecha());
            return map;
        }).collect(Collectors.toList());
    }

    @PostMapping("/leer/{id}")
    @Transactional
    public ResponseEntity<?> marcarComoLeida(@PathVariable Long id) {
        Notificacion n = notificacionRepository.findById(id).orElse(null);
        if (n == null) return ResponseEntity.notFound().build();
        n.setLeida(true);
        notificacionRepository.save(n);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/leer-todas/{username}")
    @Transactional
    public ResponseEntity<?> marcarTodasComoLeidas(@PathVariable String username) {
        Usuario user = usuarioRepository.findByUsername(username).orElse(null);
        if (user == null) return ResponseEntity.notFound().build();
        
        List<Notificacion> notifs = notificacionRepository.findByUsuario_IdOrderByFechaDesc(user.getId());
        notifs.forEach(n -> n.setLeida(true));
        notificacionRepository.saveAll(notifs);
        
        return ResponseEntity.ok().build();
    }
}
