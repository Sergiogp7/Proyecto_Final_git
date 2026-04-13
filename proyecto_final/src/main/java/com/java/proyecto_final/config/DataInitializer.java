package com.java.proyecto_final.config;

import java.math.BigDecimal;
import java.util.Arrays;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.java.proyecto_final.entity.Gimnasio;
import com.java.proyecto_final.entity.Notificacion;
import com.java.proyecto_final.entity.Producto;
import com.java.proyecto_final.entity.Sala;
import com.java.proyecto_final.entity.Usuario;
import com.java.proyecto_final.repository.GimnasioRepository;
import com.java.proyecto_final.repository.NotificacionRepository;
import com.java.proyecto_final.repository.ProductoRepository;
import com.java.proyecto_final.repository.SalaRepository;
import com.java.proyecto_final.repository.UsuarioRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner start(
            ProductoRepository prodRepo, 
            GimnasioRepository gymRepo, 
            SalaRepository salaRepo,
            UsuarioRepository userRepo,
            NotificacionRepository notifRepo,
            PasswordEncoder passwordEncoder) {
        return args -> {
            try {
                if (prodRepo.count() == 0) {
                    Producto p1 = new Producto();
                    p1.setNombre("Proteína Whey Elite");
                    p1.setCategoria("supplements");
                    p1.setPrecio(new BigDecimal("34.99"));
                    p1.setPrecioAnterior(new BigDecimal("45.00"));
                    p1.setRating(4.8);
                    p1.setReviewsCount(128);
                    p1.setImagenUrl("https://images.unsplash.com/photo-1593095191071-837c59844471?w=800");
                    p1.setBadge("Más vendido");
                    p1.setBadgeColor("orange");
                    p1.setStock(10);

                    Producto p2 = new Producto();
                    p2.setNombre("Mancuernas Ajustables 20kg");
                    p2.setCategoria("equipment");
                    p2.setPrecio(new BigDecimal("89.00"));
                    p2.setRating(4.9);
                    p2.setReviewsCount(56);
                    p2.setImagenUrl("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800");
                    p2.setBadge("Nuevo");
                    p2.setBadgeColor("blue");
                    p2.setStock(5);

                    prodRepo.saveAll(Arrays.asList(p1, p2));
                }

                if (gymRepo.count() == 0) {
                    Gimnasio g1 = new Gimnasio();
                    g1.setNombre("GymCore Centro");
                    g1.setUbicacion("Gran Vía, 28, Madrid");
                    g1.setValoracion(4.9);
                    gymRepo.save(g1);

                    Sala s1 = new Sala();
                    s1.setNombre("Sala de Musculación");
                    s1.setCapacidad(20);
                    s1.setPrecio(5.0);
                    s1.setGimnasio(g1);
                    salaRepo.save(s1);
                }

                if (userRepo.findByUsername("admin").isEmpty()) {
                    Usuario admin = new Usuario();
                    admin.setNombre("Administrador");
                    admin.setApellidos("GymCore");
                    admin.setUsername("admin");
                    admin.setEmail("admin@gymcore.com");
                    admin.setContrasena(passwordEncoder.encode("admin123")); 
                    admin.setEsAdmin(true);
                    admin.setAvatarUrl("/Imagenes/Foto_Perfil.jpg");
                    admin = userRepo.save(admin);

                    if (notifRepo.count() == 0) {
                        Notificacion n1 = new Notificacion();
                        n1.setUsuario(admin);
                        n1.setMensaje("¡Bienvenido a GymCore, Administrador!");
                        n1.setTipo("info");
                        n1.setLeida(false);

                        Notificacion n2 = new Notificacion();
                        n2.setUsuario(admin);
                        n2.setMensaje("Alguien le ha dado like a tu publicación");
                        n2.setTipo("like");
                        n2.setLeida(false);

                        Notificacion n3 = new Notificacion();
                        n3.setUsuario(admin);
                        n3.setMensaje("Nuevo comentario en tu rutina de espalda");
                        n3.setTipo("comment");
                        n3.setLeida(false);

                        notifRepo.saveAll(Arrays.asList(n1, n2, n3));
                    }
                }
            } catch (Exception e) {
                System.err.println("Error initializing data: " + e.getMessage());
            }
        };
    }
}
