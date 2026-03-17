package com.java.proyecto_final.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.java.proyecto_final.entity.Usuario;
import com.java.proyecto_final.repository.UsuarioRepository;

@Configuration
public class PasswordMigration {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner updatePasswords() {
        return args -> {
            List<Usuario> usuarios = usuarioRepository.findAll();
            int updated = 0;
            for (Usuario u : usuarios) {
                String pass = u.getContrasena();
                // Si la contraseña no empieza por el patrón característico de BCrypt ($2a$, $2b$, $2y$)
                if (pass != null && !pass.startsWith("$2a$") && !pass.startsWith("$2b$") && !pass.startsWith("$2y$")) {
                    String encryptedPass = passwordEncoder.encode(pass);
                    u.setContrasena(encryptedPass);
                    usuarioRepository.save(u);
                    updated++;
                    System.out.println("Migrada contraseña para usuario: " + u.getEmail());
                }
            }
            if (updated > 0) {
                System.out.println("Migradas " + updated + " contraseñas a BCrypt exitosamente.");
            } else {
                System.out.println("No fue necesario migrar contraseñas. Todas están encriptadas.");
            }
        };
    }
}
