package com.java.proyecto_final.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.proyecto_final.entity.Usuario;
import com.java.proyecto_final.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Usuario user = usuarioRepository.findByEmail(email).orElse(null);

        if (user != null && user.getContrasena().equals(password)) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
        String nombre = userData.get("nombre");
        String apellidos = userData.get("apellidos");
        String username = userData.get("username");
        String email = userData.get("email");
        String password = userData.get("password");

        if (usuarioRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }
        
        if (usuarioRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya está ocupado");
        }

        Usuario newUser = new Usuario();
        newUser.setNombre(nombre);
        newUser.setApellidos(apellidos);
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setContrasena(password);
        newUser.setEsAdmin(false);
        newUser.setAvatarUrl("../Imagenes/Foto_Perfil.jpg");
        
        Usuario savedUser = usuarioRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @org.springframework.web.bind.annotation.PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");

        Usuario user = usuarioRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
        
        // Actualizar campos
        if (userData.containsKey("nombre")) user.setNombre(userData.get("nombre"));
        // El username puede ser delicado cambiarlo si es único, aquí simplificamos
        if (userData.containsKey("nombreUsuario")) {
             String newUsername = userData.get("nombreUsuario");
             // Verificar unicidad si cambia
             if (!newUsername.equals(user.getUsername()) && usuarioRepository.findByUsername(newUsername).isPresent()) {
                 return ResponseEntity.badRequest().body("El nombre de usuario ya está ocupado");
             }
             user.setUsername(newUsername);
        }
        if (userData.containsKey("telefono")) user.setTelefono(userData.get("telefono"));
        if (userData.containsKey("ubicacion")) user.setUbicacion(userData.get("ubicacion"));
        if (userData.containsKey("bio")) user.setBio(userData.get("bio"));
        if (userData.containsKey("avatarUrl")) user.setAvatarUrl(userData.get("avatarUrl"));

        Usuario updatedUser = usuarioRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
}
