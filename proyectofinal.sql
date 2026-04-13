-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2026 a las 10:25:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- 1. ESTRUCTURA DE TABLAS (CREATE TABLE)
-- --------------------------------------------------------

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `es_admin` tinyint(1) DEFAULT 0,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=100;

DROP TABLE IF EXISTS `sedes`;
CREATE TABLE `sedes` (
  `id_sede` int(11) NOT NULL AUTO_INCREMENT,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_sede`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=10;

DROP TABLE IF EXISTS `gimnasios`;
CREATE TABLE `gimnasios` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `valoracion` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=10;

DROP TABLE IF EXISTS `salas`;
CREATE TABLE `salas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `capacidad` int(11) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` double DEFAULT NULL,
  `id_gimnasio` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sala_gimnasio` (`id_gimnasio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=10;

DROP TABLE IF EXISTS `reservas`;
CREATE TABLE `reservas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_reserva` datetime DEFAULT NULL,
  `horario` varchar(255) DEFAULT NULL,
  `precio_total` double DEFAULT NULL,
  `id_sala` bigint(20) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reserva_sala` (`id_sala`),
  KEY `fk_reserva_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=10;

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(38,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `id_sede` int(11) DEFAULT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `badge_color` varchar(255) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `precio_anterior` decimal(38,2) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `reviews_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `fk_producto_sede` (`id_sede`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=50;

DROP TABLE IF EXISTS `publicaciones`;
CREATE TABLE `publicaciones` (
  `id_publicacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_publicacion`),
  KEY `fk_pub_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=20;

DROP TABLE IF EXISTS `comentarios_publicacion`;
CREATE TABLE `comentarios_publicacion` (
  `id_comentario` int(11) NOT NULL AUTO_INCREMENT,
  `id_publicacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_comentario` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comentario`),
  KEY `fk_comm_pub` (`id_publicacion`),
  KEY `fk_comm_user` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=20;

DROP TABLE IF EXISTS `likes_publicacion`;
CREATE TABLE `likes_publicacion` (
  `id_publicacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_publicacion`, `id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE `notificaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` datetime(6) DEFAULT NULL,
  `leida` tinyint(1) NOT NULL DEFAULT 0,
  `mensaje` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notif_user` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=100;

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_pedido` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedido_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=20;

DROP TABLE IF EXISTS `detalle_pedido`;
CREATE TABLE `detalle_pedido` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detalle_pedido` (`id_pedido`),
  KEY `fk_detalle_producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=50;

-- --------------------------------------------------------
-- 2. VOLCADO DE DATOS (INSERT INTO)
-- --------------------------------------------------------

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellidos`, `email`, `contrasena`, `telefono`, `es_admin`, `fecha_registro`, `avatar_url`, `bio`, `ubicacion`, `username`) VALUES
(1, 'Administrador GymCore', '', 'admin@gymcore.com', 'admin123', '661632592', 1, NOW(), '../Imagenes/Foto_Perfil.jpg', 'Admin Central', 'Sede Central', 'admin'),
(2, 'Laura Mendez', '', 'laura.mendez@email.com', 'admin123', '600112233', 0, NOW(), 'https://randomuser.me/api/portraits/women/1.jpg', 'Adicta al Crossfit', 'Madrid', 'lau_fit'),
(3, 'Sergio García', 'Perez', 'sergio@gymcore.com', 'sergio123', '611223344', 0, NOW(), 'https://randomuser.me/api/portraits/men/32.jpg', 'Entrenador Personal', 'Barcelona', 'sergiogp'),
(4, 'Carlos Ruiz', '', 'carlos@email.com', '1234', '622334455', 0, NOW(), 'https://randomuser.me/api/portraits/men/10.jpg', 'Powerlifting lover', 'Sevilla', 'carlos_pw'),
(5, 'Elena Sanz', '', 'elena@email.com', '1234', '633445566', 0, NOW(), 'https://randomuser.me/api/portraits/women/15.jpg', 'Yoga & Pilares', 'Valencia', 'elena_yoga'),
(6, 'Marcos Josa', '', 'marcos@email.com', '1234', '644556677', 0, NOW(), 'https://randomuser.me/api/portraits/men/22.jpg', 'Enfocado en el volumen', 'Bilbao', 'marcos_bulk');

INSERT INTO `sedes` (`id_sede`, `direccion`, `telefono`, `email`) VALUES
(1, 'Gran Vía, 28, Madrid', '910001122', 'centro@gymcore.com'),
(2, 'Paseo de la Castellana, 100, Madrid', '910003344', 'norte@gymcore.com'),
(3, 'Avinguda Diagonal, 450, Barcelona', '930005566', 'barcelona@gymcore.com'),
(4, 'Calle Betis, 15, Sevilla', '950009988', 'sevilla@gymcore.com');

INSERT INTO `gimnasios` (`id`, `nombre`, `ubicacion`, `valoracion`) VALUES
(1, 'GymCore Centro', 'Gran Vía, 28, Madrid', 4.9),
(2, 'GymCore Norte', 'Paseo de la Castellana, 100, Madrid', 4.7),
(3, 'GymCore Barcelona', 'Diagonal, 450', 4.8),
(4, 'GymCore Sevilla', 'Calle Betis, 15', 4.6);

INSERT INTO `salas` (`id`, `capacidad`, `nombre`, `precio`, `id_gimnasio`) VALUES
(1, 20, 'Sala Musculación', 5, 1),
(2, 15, 'Pesos Libres', 4, 1),
(3, 10, 'Sala Crossfit', 8, 3),
(4, 25, 'Sala Multiusos', 6, 4);

INSERT INTO `reservas` (`id`, `fecha_reserva`, `horario`, `precio_total`, `id_sala`, `id_usuario`) VALUES
(1, '2026-04-14 10:00:00', '10:00 - 11:00', 5.0, 1, 2),
(2, '2026-04-15 11:00:00', '11:00 - 12:00', 4.0, 2, 4);

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `id_sede`, `badge`, `badge_color`, `categoria`, `imagen_url`, `precio_anterior`, `rating`, `reviews_count`) VALUES
(1, 'Proteína Whey Gold', 'Proteína de suero aislada de rápida absorción.', 34.99, 100, 1, 'Best Seller', 'orange', 'supplements', 'https://images.unsplash.com/photo-1593095191071-837c59844471', 45.00, 4.8, 150),
(2, 'Creatina Monohidratada', 'Aumenta tu fuerza y resistencia.', 19.99, 50, 1, 'Oferta', 'red', 'supplements', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', 25.00, 4.9, 80),
(3, 'Mancuernas Ajustables', 'Pack de 2 mancuernas de 10kg cada una.', 59.90, 15, 2, 'Nuevo', 'blue', 'equipment', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', 75.00, 4.7, 42),
(4, 'Esterilla Yoga Pro', 'Antideslizante y ecológica.', 24.50, 30, 3, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f', 30.00, 4.6, 95),
(5, 'Pre-Entreno Explosivo', 'Energía extrema y pump brutal.', 28.00, 40, 1, 'Limitado', 'purple', 'supplements', 'https://images.unsplash.com/photo-1603398938378-e547bb44e7c9', 35.00, 4.9, 66),
(6, 'Gummy Vitaminas', 'Vitaminas esenciales en gomitas.', 15.99, 100, 1, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843', 20.00, 4.5, 210),
(7, 'Barra Olímpica 20kg', 'Barra de acero profesional.', 149.00, 10, 2, 'Top', 'silver', 'equipment', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61', 180.00, 5.0, 25),
(8, 'Cinturón Levitación', 'Cuero genuino para máxima seguridad.', 32.50, 20, 1, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1', 40.00, 4.8, 48),
(9, 'Caseína Micelar', 'Proteína de liberación lenta.', 42.00, 35, 1, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1545129668-cb06c941d441', 50.00, 4.7, 112),
(10, 'Banco Pesas Pro', 'Ajustable en 7 posiciones.', 89.99, 8, 4, 'Envío Gratis', 'green', 'equipment', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f', 120.00, 4.9, 34);

INSERT INTO `publicaciones` (`id_publicacion`, `id_usuario`, `contenido`, `imagen_url`, `fecha_publicacion`) VALUES
(1, 2, '¡Dándole duro al Crossfit en la nueva sala! 💪🔥 #GymCore #FitnessLife', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', NOW() - INTERVAL 2 DAY),
(2, 4, 'Nuevo PR en peso muerto: 220kg. ¡Vamos! 🏋️‍♂️', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', NOW() - INTERVAL 1 DAY),
(3, 5, 'Sesión de yoga matutina para equilibrar la mente. 🧘‍♀️✨', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', NOW() - INTERVAL 5 HOUR),
(4, 3, '¿Quién se viene a entrenar mañana a la sede Norte? Pasamos lista. ✍️', NULL, NOW() - INTERVAL 2 HOUR),
(5, 6, 'Día de comida trampa superado. Mañana volvemos al déficit. 🍔❌', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', NOW() - INTERVAL 12 HOUR),
(6, 2, 'Probando la suplementación de GymCore. La proteína de chocolate está increíble. 🍫🧋', 'https://images.unsplash.com/photo-1593095191071-837c59844471', NOW() - INTERVAL 1 DAY);

INSERT INTO `comentarios_publicacion` (`id_comentario`, `id_publicacion`, `id_usuario`, `contenido`, `fecha_comentario`) VALUES
(1, 1, 1, '¡Dale caña Laura! 🔥', NOW() - INTERVAL 1 DAY),
(2, 2, 3, '¡Qué bestia Carlos! 🔥👏', NOW() - INTERVAL 20 HOUR),
(3, 1, 4, 'Yo estuve ayer y es una pasada.', NOW() - INTERVAL 15 HOUR),
(4, 3, 2, 'Me encanta el sitio donde haces yoga.', NOW() - INTERVAL 2 HOUR),
(5, 4, 6, '¡Yo me apunto!', NOW() - INTERVAL 1 HOUR);

INSERT INTO `likes_publicacion` (`id_publicacion`, `id_usuario`) VALUES
(1, 1), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 2), (2, 3), (2, 5),
(3, 2), (3, 6),
(4, 1), (4, 2), (4, 4), (4, 5);

-- --------------------------------------------------------
-- 3. CONSTRAINTS (ALTER TABLE)
-- --------------------------------------------------------

ALTER TABLE `notificaciones` ADD CONSTRAINT `fk_notif_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
ALTER TABLE `publicaciones` ADD CONSTRAINT `fk_pub_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
ALTER TABLE `comentarios_publicacion` ADD CONSTRAINT `fk_comm_pub` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE;
ALTER TABLE `comentarios_publicacion` ADD CONSTRAINT `fk_comm_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
ALTER TABLE `likes_publicacion` ADD CONSTRAINT `fk_like_pub` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE;
ALTER TABLE `likes_publicacion` ADD CONSTRAINT `fk_like_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
ALTER TABLE `salas` ADD CONSTRAINT `fk_sala_gimnasio` FOREIGN KEY (`id_gimnasio`) REFERENCES `gimnasios` (`id`) ON DELETE CASCADE;
ALTER TABLE `reservas` ADD CONSTRAINT `fk_reserva_sala` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`) ON DELETE CASCADE;
ALTER TABLE `reservas` ADD CONSTRAINT `fk_reserva_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
ALTER TABLE `productos` ADD CONSTRAINT `fk_prod_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE SET NULL;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
