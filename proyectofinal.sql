-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2026 a las 10:25:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectofinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gimnasios`
--

CREATE TABLE `gimnasios` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `valoracion` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gimnasios`
--

INSERT INTO `gimnasios` (`id`, `nombre`, `ubicacion`, `valoracion`) VALUES
(1, 'GymCore Centro', 'Gran Vía, 28, Madrid', 4.9),
(2, 'GymCore Norte', 'Paseo de la Castellana, 100, Madrid', 4.7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `id_sala` int(11) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `precio_hora` decimal(10,2) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `id_sede` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
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
  `reviews_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `id_sede`, `badge`, `badge_color`, `categoria`, `imagen_url`, `precio_anterior`, `rating`, `reviews_count`) VALUES
(1, 'Proteína Whey Gold Standard', NULL, 45.99, 100, NULL, 'Best Seller', 'orange', 'supplements', 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500', 55.00, 4.9, 1250),
(2, 'Creatina Monohidratada 500g', NULL, 24.95, 150, NULL, 'Top Rated', 'blue', 'supplements', 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=500', 29.99, 4.8, 850),
(3, 'Mancuernas Hexagonales 10kg', NULL, 35.00, 50, NULL, NULL, NULL, 'equipment', 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=500', 42.00, 4.7, 320),
(4, 'Esterilla de Yoga Premium', NULL, 19.99, 80, NULL, 'Eco Friendly', 'green', 'accessories', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=500', 25.00, 4.6, 210),
(5, 'Banda de Resistencia Set', NULL, 12.50, 200, NULL, 'Oferta', 'red', 'accessories', 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&q=80&w=500', 18.00, 4.5, 450),
(6, 'Pre-Entreno Explosive Energy', NULL, 32.00, 90, NULL, 'Nuevo', 'blue', 'supplements', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500', 38.50, 4.8, 600),
(7, 'Kettlebell 16kg', NULL, 45.00, 40, NULL, NULL, NULL, 'equipment', 'https://images.unsplash.com/photo-1517963628607-235ccdd5476c?auto=format&fit=crop&q=80&w=500', 50.00, 4.9, 180),
(8, 'Rodillo de Espuma (Foam Roller)', NULL, 15.00, 120, NULL, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1616279969096-54b228f5f103?auto=format&fit=crop&q=80&w=500', 20.00, 4.4, 150),
(9, 'Barra Olímpica 20kg', NULL, 150.00, 15, NULL, 'Profesional', 'black', 'equipment', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=500', 180.00, 5, 95),
(10, 'Cinturón de Levantamiento', NULL, 25.99, 60, NULL, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=500', 30.00, 4.7, 200),
(11, 'Multivitamínico Sport', NULL, 18.50, 110, NULL, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=500', 22.00, 4.6, 300),
(12, 'Banco Ajustable de Pesas', NULL, 89.99, 25, NULL, 'Envío Gratis', 'green', 'equipment', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=500', 120.00, 4.8, 140),
(13, 'Guantes de Gimnasio', NULL, 14.00, 150, NULL, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=500', 18.00, 4.3, 220),
(14, 'BCAA 2:1:1 Polvo', NULL, 28.00, 80, NULL, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=500', 35.00, 4.7, 400),
(15, 'Balón Medicinal 5kg', NULL, 22.00, 50, NULL, NULL, NULL, 'equipment', 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?auto=format&fit=crop&q=80&w=500', 28.00, 4.5, 90),
(16, 'Botella Shaker Pro', NULL, 8.99, 300, NULL, 'Básico', 'gray', 'accessories', 'https://images.unsplash.com/photo-1610970882739-4495585165b5?auto=format&fit=crop&q=80&w=500', 12.00, 4.2, 500),
(17, 'Caseína Micelar', NULL, 42.00, 60, NULL, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1545129668-cb06c941d441?auto=format&fit=crop&q=80&w=500', 50.00, 4.8, 180),
(18, 'Cuerda para Saltar Veloz', NULL, 9.50, 140, NULL, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=500', 12.00, 4.6, 350),
(19, 'Disco Olímpico 20kg', NULL, 60.00, 40, NULL, NULL, NULL, 'equipment', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500', 75.00, 4.9, 110),
(20, 'Glutamina 500g', NULL, 26.00, 75, NULL, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1627483297886-49710ae1fc28?auto=format&fit=crop&q=80&w=500', 32.00, 4.7, 210);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `fecha_reserva` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_sala` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` bigint(20) NOT NULL,
  `fecha_reserva` datetime(6) DEFAULT NULL,
  `horario` varchar(255) DEFAULT NULL,
  `precio_total` double DEFAULT NULL,
  `id_sala` bigint(20) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `fecha_reserva`, `horario`, `precio_total`, `id_sala`, `id_usuario`) VALUES
(1, '2026-03-10 08:29:05.000000', '12:00', 4, 2, 1),
(2, '2026-03-10 08:29:05.000000', '12:00', 4, 2, 1),
(3, '2026-03-10 08:29:05.000000', '12:00', 4, 2, 1),
(4, '2026-03-10 08:29:06.000000', '12:00', 4, 2, 1),
(5, '2026-03-10 08:29:06.000000', '12:00', 4, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id` bigint(20) NOT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `precio` double DEFAULT NULL,
  `id_gimnasio` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id`, `capacidad`, `nombre`, `precio`, `id_gimnasio`) VALUES
(1, 20, 'Sala de Musculación', 5, 1),
(2, 15, 'Sala de Pesos Libres', 4, 1),
(3, 30, 'Sala de Cardio', 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `id_sede` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
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
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellidos`, `email`, `contrasena`, `telefono`, `es_admin`, `fecha_registro`, `avatar_url`, `bio`, `ubicacion`, `username`) VALUES
(1, 'Sergio Garcia Pedrero', '', 'sergio.garcia@gymcore.com', 'admin123', '661632592', 1, '2026-01-27 14:12:53.000000', 'https://i.pinimg.com/736x/b6/fd/54/b6fd54fe3dfa5327428b8d0c7b8feaaa.jpg', 'Administrador principal del sistema GymCore.', 'Aznalcollar, Sevilla', 'admin'),
(2, 'Laura Mendez', '', 'laura.mendez@email.com', 'pass123', '600112233', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/1.jpg', 'Adicta al Crossfit y la vida sana.', 'Madrid', 'lau_fit'),
(3, 'Carlos Ruiz', '', 'carlos.ruiz@email.com', 'pass123', '600445566', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/2.jpg', 'Entrenador personal certificado.', 'Barcelona', 'carlos_gym'),
(4, 'Ana Torroja', '', 'ana.torroja@email.com', 'pass123', '600778899', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/3.jpg', 'Amo el yoga y la meditación.', 'Valencia', 'anita_yoga'),
(5, 'David Bisbal', '', 'david.b@email.com', 'pass123', '600998877', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/4.jpg', 'Corredor de maratones en tiempo libre.', 'Almería', 'david_b'),
(6, 'Elena Furiase', '', 'elena.f@email.com', 'pass123', '600665544', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/5.jpg', 'Buscando mi mejor versión.', 'Madrid', 'ele_furi'),
(7, 'Fernando Alonso', '', 'fernando.a@email.com', 'pass123', '600332211', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/6.jpg', 'Entreno para ganar velocidad y resistencia.', 'Oviedo', 'fer_nano'),
(8, 'Gemma Mengual', '', 'gemma.m@email.com', 'pass123', '600223344', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/7.jpg', 'Natación es vida.', 'Barcelona', 'gemma_sw'),
(9, 'Iker Casillas', '', 'iker.c@email.com', 'pass123', '600556677', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/8.jpg', 'Manteniéndome en forma después del retiro.', 'Móstoles', 'iker_c'),
(10, 'Julia Otero', '', 'julia.o@email.com', 'pass123', '600889900', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/9.jpg', 'Caminatas diarias y alimentación balanceada.', 'Galicia', 'jules_o'),
(11, 'Kikeike', '', 'kike.s@email.com', 'pass123', '600123456', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/10.jpg', 'Surf y gimnasio, la combinación perfecta.', 'Cádiz', 'kike_surfer'),
(12, 'Lucia Gil', '', 'lucia.g@email.com', 'pass123', '600654321', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/11.jpg', 'Bailar también es entrenar.', 'Madrid', 'lucia_song'),
(13, 'Mario Casas', '', 'mario.c@email.com', 'pass123', '600987654', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/12.jpg', 'Entreno de fuerza 5 días a la semana.', 'Coruña', 'mario_c'),
(14, 'Nuria Roca', '', 'nuria.r@email.com', 'pass123', '600111222', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/13.jpg', 'Pilates reformer lover.', 'Valencia', 'nuria_present'),
(15, 'Oscar Jaenada', '', 'oscar.j@email.com', 'pass123', '600333444', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/14.jpg', 'Boxeo para liberar estrés.', 'Barcelona', 'oscar_j'),
(16, 'Paula Echevarria', '', 'paula.e@email.com', 'pass123', '600555666', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/15.jpg', 'Fitness lifestyle and fashion.', 'Asturias', 'paula_e'),
(17, 'Quim Gutierrez', '', 'quim.g@email.com', 'pass123', '600777888', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/16.jpg', 'Calistenia y aire libre.', 'Barcelona', 'quim_g'),
(18, 'Rosa Lopez', '', 'rosa.l@email.com', 'pass123', '600999000', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/17.jpg', 'Perdí peso y gané vida con el gym.', 'Granada', 'rosa_sing'),
(19, 'Santi Millan', '', 'santi.m@email.com', 'pass123', '600135790', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/men/18.jpg', 'La bicicleta es mi pasión.', 'Barcelona', 'santi_m'),
(20, 'Tania Llasera', '', 'tania.l@email.com', 'pass123', '600246801', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/19.jpg', 'Body positive y movimiento saludable.', 'Bilbao', 'tania_ll'),
(21, 'Clara', 'Frigolet Paiva', 'clara.frigolet@gymcore.com', 'Clara2005', '676769677', 0, '2026-02-10 13:04:46.000000', '../Imagenes/Foto_Perfil.jpg', 'Apasionado del fitness y la vida saludable. Entrenando duro para alcanzar mis metas. #NoPainNoGain', '', 'Clara2005'),
(47, 'Test', 'User', 'testuser_unique812@example.com', '$2a$10$Qbsd/AofEjEHpyx072pXX.b6X1YTq1HPr.CX2BJkf8m5MIF4p6j7y', NULL, 0, '2026-03-10 08:54:05.000000', '../Imagenes/Foto_Perfil.jpg', NULL, NULL, 'sergio.garcia@gymcore.ctestuser_unique812om'),
(48, 'Test', 'User', 'testuser_new_123@example.com', '$2a$10$wH6..a.QcHuYqJoDZxBGPedybAIgs.yIIdYpOP/lPg8afn4EYByTO', NULL, 0, '2026-03-10 08:56:03.000000', '../Imagenes/Foto_Perfil.jpg', NULL, NULL, 'testuser_new_123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `fk_detalle_pedido` (`id_pedido`),
  ADD KEY `fk_detalle_producto` (`id_producto`);

--
-- Indices de la tabla `gimnasios`
--
ALTER TABLE `gimnasios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`id_sala`),
  ADD KEY `fk_habitacion_sede` (`id_sede`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `fk_pedido_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `fk_producto_sede` (`id_sede`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `fk_reserva_usuario` (`id_usuario`),
  ADD KEY `fk_reserva_sala` (`id_sala`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKc92vdgqsatiwu4h53fok5ikf8` (`id_sala`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKiow5k9pbyyf7f9prpqd3c40ji` (`id_gimnasio`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`id_sede`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `UKm2dvbwfge291euvmk6vkkocao` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gimnasios`
--
ALTER TABLE `gimnasios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `id_sala` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `id_sede` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `fk_detalle_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `fk_habitacion_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_producto_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE SET NULL;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `fk_reserva_sala` FOREIGN KEY (`id_sala`) REFERENCES `habitacion` (`id_sala`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reserva_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `FKc92vdgqsatiwu4h53fok5ikf8` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`);

--
-- Filtros para la tabla `salas`
--
ALTER TABLE `salas`
  ADD CONSTRAINT `FKiow5k9pbyyf7f9prpqd3c40ji` FOREIGN KEY (`id_gimnasio`) REFERENCES `gimnasios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
