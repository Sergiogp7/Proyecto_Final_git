package com.java.proyecto_final.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.proyecto_final.dto.LoginRequest;
import com.java.proyecto_final.entity.Usuario;
import com.java.proyecto_final.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest credentials) {
        Usuario user = usuarioRepository.findByEmail(credentials.getEmail()).orElse(null);

        if (user != null && passwordEncoder.matches(credentials.getPassword(), user.getContrasena())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario newUser) {
        if (usuarioRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }
        
        if (usuarioRepository.findByUsername(newUser.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya está ocupado");
        }

        // Encriptar contraseña antes de guardar
        newUser.setContrasena(passwordEncoder.encode(newUser.getContrasena()));
        newUser.setEsAdmin(false);
        if (newUser.getAvatarUrl() == null) {
            newUser.setAvatarUrl("../Imagenes/Foto_Perfil.jpg");
        }
        
        Usuario savedUser = usuarioRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        Usuario user = usuarioRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
        
        if (userData.containsKey("nombre")) user.setNombre(userData.get("nombre"));
        if (userData.containsKey("apellidos")) user.setApellidos(userData.get("apellidos"));
        
        if (userData.containsKey("nombreUsuario")) {
             String newUsername = userData.get("nombreUsuario");
             if (!newUsername.equals(user.getUsername()) && usuarioRepository.findByUsername(newUsername).isPresent()) {
                 return ResponseEntity.badRequest().body("El nombre de usuario ya está ocupado");
             }
             user.setUsername(newUsername);
        }
        
        if (userData.containsKey("telefono")) user.setTelefono(userData.get("telefono"));
        if (userData.containsKey("ubicacion")) user.setUbicacion(userData.get("ubicacion"));
        if (userData.containsKey("bio")) user.setBio(userData.get("bio"));
        if (userData.containsKey("avatarUrl")) user.setAvatarUrl(userData.get("avatarUrl"));

        return ResponseEntity.ok(usuarioRepository.save(user));
    }
}
