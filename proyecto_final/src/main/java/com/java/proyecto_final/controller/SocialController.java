package com.java.proyecto_final.controller;

import com.java.proyecto_final.entity.ComentarioPublicacion;
import com.java.proyecto_final.entity.Publicacion;
import com.java.proyecto_final.entity.Usuario;
import com.java.proyecto_final.entity.Notificacion;
import com.java.proyecto_final.repository.ComentarioPublicacionRepository;
import com.java.proyecto_final.repository.PublicacionRepository;
import com.java.proyecto_final.repository.UsuarioRepository;
import com.java.proyecto_final.repository.NotificacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/social")
public class SocialController {

    @Autowired
    private PublicacionRepository publicacionRepository;

    @Autowired
    private ComentarioPublicacionRepository comentarioRepository;

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/feed")
    @Transactional(readOnly = true)
    public List<Map<String, Object>> getFeed(@RequestParam(required = false) String username) {
        Usuario currentUser = username != null ? usuarioRepository.findByUsername(username).orElse(null) : null;
        List<Publicacion> posts = publicacionRepository.findAllByOrderByFechaPublicacionDesc();
        
        return posts.stream().map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            
            Usuario u = p.getUsuario();
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("nombre", u.getNombre() + (u.getApellidos() != null && !u.getApellidos().isEmpty() ? " " + u.getApellidos() : ""));
            userMap.put("nombreUsuario", "@" + u.getUsername());
            userMap.put("avatar", u.getAvatarUrl());
            userMap.put("verificado", u.isEsAdmin());
            
            map.put("usuario", userMap);
            map.put("contenido", p.getContenido());
            map.put("imagen", p.getImagenUrl());
            map.put("meGusta", p.getLikes().size());
            
            List<Map<String, Object>> comentariosDetalle = p.getComentarios().stream().map(c -> {
                Map<String, Object> cMap = new HashMap<>();
                cMap.put("id", c.getId());
                cMap.put("nombre", c.getUsuario().getNombre());
                cMap.put("nombreUsuario", "@" + c.getUsuario().getUsername());
                cMap.put("username", c.getUsuario().getUsername());
                cMap.put("avatar", c.getUsuario().getAvatarUrl());
                cMap.put("contenido", c.getContenido());
                cMap.put("fecha", c.getFechaComentario());
                return cMap;
            }).collect(Collectors.toList());
            
            map.put("comentarios", comentariosDetalle.size());
            map.put("detalleComentarios", comentariosDetalle);
            map.put("compartidos", 0);
            map.put("tiempo", "Hace poco");
            map.put("meGustaPorMi", currentUser != null && p.getLikes().contains(currentUser));
            
            return map;
        }).collect(Collectors.toList());
    }

    @PostMapping("/publicar")
    @Transactional
    public ResponseEntity<?> crearPublicacion(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String contenido = payload.get("contenido");
        String imagenUrl = payload.get("imagenUrl");

        Usuario usuario = usuarioRepository.findByUsername(username).orElse(null);
        if (usuario == null) return ResponseEntity.badRequest().body("Usuario no encontrado");

        Publicacion p = new Publicacion();
        p.setUsuario(usuario);
        p.setContenido(contenido);
        p.setImagenUrl(imagenUrl);
        p.setFechaPublicacion(LocalDateTime.now());
        
        publicacionRepository.save(p);
        return ResponseEntity.ok(p);
    }

    @PostMapping("/like/{id}")
    @Transactional
    public ResponseEntity<?> toggleLike(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        Publicacion p = publicacionRepository.findById(id).orElse(null);
        Usuario u = usuarioRepository.findByUsername(username).orElse(null);

        if (p == null || u == null) return ResponseEntity.badRequest().build();

        boolean givingLike = !p.getLikes().contains(u);
        if (givingLike) {
            p.getLikes().add(u);
            if (!p.getUsuario().getId().equals(u.getId())) {
                Notificacion n = new Notificacion();
                n.setUsuario(p.getUsuario());
                n.setMensaje("@" + u.getUsername() + " le ha gustado tu publicación");
                n.setTipo("like");
                n.setLeida(false);
                n.setFecha(LocalDateTime.now());
                notificacionRepository.save(n);
            }
        } else {
            p.getLikes().remove(u);
        }

        publicacionRepository.save(p);
        return ResponseEntity.ok(p.getLikes().size());
    }

    @PostMapping("/comentar/{id}")
    @Transactional
    public ResponseEntity<?> agregarComentario(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String contenido = payload.get("contenido");

        Publicacion p = publicacionRepository.findById(id).orElse(null);
        Usuario u = usuarioRepository.findByUsername(username).orElse(null);

        if (p == null || u == null) return ResponseEntity.badRequest().build();

        ComentarioPublicacion c = new ComentarioPublicacion();
        c.setPublicacion(p);
        c.setUsuario(u);
        c.setContenido(contenido);
        c.setFechaComentario(LocalDateTime.now());
        comentarioRepository.save(c);

        if (!p.getUsuario().getId().equals(u.getId())) {
            Notificacion n = new Notificacion();
            n.setUsuario(p.getUsuario());
            n.setMensaje("@" + u.getUsername() + " ha comentado tu publicación: \"" + 
                      (contenido.length() > 30 ? contenido.substring(0, 27) + "..." : contenido) + "\"");
            n.setTipo("comment");
            n.setLeida(false);
            n.setFecha(LocalDateTime.now());
            notificacionRepository.save(n);
        }

        return ResponseEntity.ok(c);
    }
    @DeleteMapping("/publicacion/{id}")
    @Transactional
    public ResponseEntity<?> eliminarPublicacion(@PathVariable Long id, @RequestParam String username) {
        Publicacion p = publicacionRepository.findById(id).orElse(null);
        if (p == null) return ResponseEntity.notFound().build();
        if (!p.getUsuario().getUsername().equals(username)) return ResponseEntity.status(403).body("No tienes permiso");

        publicacionRepository.delete(p);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/publicacion/{id}")
    @Transactional
    public ResponseEntity<?> editarPublicacion(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String contenido = payload.get("contenido");
        
        Publicacion p = publicacionRepository.findById(id).orElse(null);
        if (p == null) return ResponseEntity.notFound().build();
        if (!p.getUsuario().getUsername().equals(username)) return ResponseEntity.status(403).body("No tienes permiso");

        p.setContenido(contenido);
        if (payload.containsKey("imagenUrl")) p.setImagenUrl(payload.get("imagenUrl"));
        
        publicacionRepository.save(p);
        return ResponseEntity.ok(p);
    }

    @DeleteMapping("/comentario/{id}")
    @Transactional
    public ResponseEntity<?> eliminarComentario(@PathVariable Long id, @RequestParam String username) {
        ComentarioPublicacion c = comentarioRepository.findById(id).orElse(null);
        if (c == null) return ResponseEntity.notFound().build();
        if (!c.getUsuario().getUsername().equals(username)) return ResponseEntity.status(403).body("No tienes permiso");

        c.getPublicacion().getComentarios().remove(c);
        comentarioRepository.delete(c);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/comentario/{id}")
    @Transactional
    public ResponseEntity<?> editarComentario(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String contenido = payload.get("contenido");

        ComentarioPublicacion c = comentarioRepository.findById(id).orElse(null);
        if (c == null) return ResponseEntity.notFound().build();
        if (!c.getUsuario().getUsername().equals(username)) return ResponseEntity.status(403).body("No tienes permiso");

        c.setContenido(contenido);
        comentarioRepository.save(c);
        return ResponseEntity.ok(c);
    }
}
