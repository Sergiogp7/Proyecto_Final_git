package com.java.proyecto_final.config;

import java.math.BigDecimal;
import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.java.proyecto_final.entity.Gimnasio;
import com.java.proyecto_final.entity.Producto;
import com.java.proyecto_final.entity.Sala;
import com.java.proyecto_final.entity.Usuario;
import com.java.proyecto_final.repository.GimnasioRepository;
import com.java.proyecto_final.repository.ProductoRepository;
import com.java.proyecto_final.repository.SalaRepository;
import com.java.proyecto_final.repository.UsuarioRepository;

// @Configuration
public class DataInitializer {

    // @Bean
    CommandLineRunner start(
            ProductoRepository prodRepo, 
            GimnasioRepository gymRepo, 
            SalaRepository salaRepo,
            UsuarioRepository userRepo,
            PasswordEncoder passwordEncoder) {
        return args -> {
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

                Producto p3 = new Producto();
                p3.setNombre("Shaker Pro Sport");
                p3.setCategoria("accessories");
                p3.setPrecio(new BigDecimal("12.50"));
                p3.setRating(4.5);
                p3.setReviewsCount(89);
                p3.setImagenUrl("https://images.unsplash.com/photo-1574680094148-d306b38da158?w=800");
                p3.setStock(20);

                prodRepo.saveAll(Arrays.asList(p1, p2, p3));
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
                
                Sala s2 = new Sala();
                s2.setNombre("Sala de Pesos Libres");
                s2.setCapacidad(15);
                s2.setPrecio(4.0);
                s2.setGimnasio(g1);
                
                salaRepo.saveAll(Arrays.asList(s1, s2));

                Gimnasio g2 = new Gimnasio();
                g2.setNombre("GymCore Norte");
                g2.setUbicacion("Paseo de la Castellana, 100, Madrid");
                g2.setValoracion(4.7);
                gymRepo.save(g2);

                Sala s3 = new Sala();
                s3.setNombre("Sala de Cardio");
                s3.setCapacidad(30);
                s3.setPrecio(3.0);
                s3.setGimnasio(g2);
                
                salaRepo.save(s3);
            }

            if (userRepo.findByEmail("admin@gymcore.com").isEmpty() && userRepo.findByUsername("admin").isEmpty()) {
                Usuario admin = new Usuario();
                admin.setNombre("Administrador");
                admin.setApellidos("GymCore");
                admin.setUsername("admin");
                admin.setEmail("admin@gymcore.com");
                admin.setContrasena(passwordEncoder.encode("admin123")); // Encriptado BCrypt
                admin.setEsAdmin(true);
                admin.setAvatarUrl("../Imagenes/Foto_Perfil.jpg");
                userRepo.save(admin);
            }
        };
    }
}
