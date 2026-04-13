-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-04-2026 a las 18:39:40
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
-- Estructura de tabla para la tabla `comentarios_publicacion`
--

CREATE TABLE `comentarios_publicacion` (
  `id_comentario` bigint(20) NOT NULL,
  `id_publicacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_comentario` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios_publicacion`
--

INSERT INTO `comentarios_publicacion` (`id_comentario`, `id_publicacion`, `id_usuario`, `contenido`, `fecha_comentario`) VALUES
(1, 1, 1, '¡Dale caña Laura! 🔥', '2026-04-12 14:50:05'),
(2, 2, 3, '¡Qué bestia Carlos! 🔥👏', '2026-04-12 18:50:05'),
(3, 1, 4, 'Yo estuve ayer y es una pasada.', '2026-04-12 23:50:05'),
(4, 3, 2, 'Me encanta el sitio donde haces yoga.', '2026-04-13 12:50:05'),
(5, 4, 6, '¡Yo me apunto!', '2026-04-13 13:50:05'),
(20, 22, 1, 'Buen post', '2026-04-13 16:01:14'),
(21, 22, 1, 'Buen post', '2026-04-13 16:01:22'),
(22, 22, 1, 'Test manual', '2026-04-13 16:02:02'),
(23, 22, 1, 'Buen postFunciona!', '2026-04-13 16:03:22'),
(24, 22, 1, 'Otro test', '2026-04-13 16:04:12'),
(25, 22, 1, 'Test 3', '2026-04-13 16:04:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_detalle` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL
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
(2, 'GymCore Norte', 'Paseo de la Castellana, 100, Madrid', 4.7),
(3, 'GymCore Barcelona', 'Diagonal, 450', 4.8),
(4, 'GymCore Sevilla', 'Calle Betis, 15', 4.6);

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
-- Estructura de tabla para la tabla `likes_publicacion`
--

CREATE TABLE `likes_publicacion` (
  `id_publicacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes_publicacion`
--

INSERT INTO `likes_publicacion` (`id_publicacion`, `id_usuario`) VALUES
(1, 1),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 2),
(2, 3),
(2, 5),
(3, 2),
(3, 6),
(4, 1),
(4, 2),
(4, 4),
(4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` bigint(20) NOT NULL,
  `fecha` datetime(6) DEFAULT NULL,
  `leida` tinyint(1) NOT NULL DEFAULT 0,
  `mensaje` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
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
  `id_producto` bigint(20) NOT NULL,
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
(1, 'Proteína Whey Gold', 'Proteína de suero aislada de rápida absorción.', 34.99, 100, 1, 'Best Seller', 'orange', 'supplements', 'https://images.unsplash.com/photo-1593095191071-837c59844471', 45.00, 4.8, 150),
(2, 'Creatina Monohidratada', 'Aumenta tu fuerza y resistencia.', 19.99, 50, 1, 'Oferta', 'red', 'supplements', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', 25.00, 4.9, 80),
(3, 'Mancuernas Ajustables', 'Pack de 2 mancuernas de 10kg cada una.', 59.90, 15, 2, 'Nuevo', 'blue', 'equipment', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', 75.00, 4.7, 42),
(4, 'Esterilla Yoga Pro', 'Antideslizante y ecológica.', 24.50, 30, 3, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f', 30.00, 4.6, 95),
(5, 'Pre-Entreno Explosivo', 'Energía extrema y pump brutal.', 28.00, 40, 1, 'Limitado', 'purple', 'supplements', 'https://images.unsplash.com/photo-1603398938378-e547bb44e7c9', 35.00, 4.9, 66),
(6, 'Gummy Vitaminas', 'Vitaminas esenciales en gomitas.', 15.99, 100, 1, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843', 20.00, 4.5, 210),
(7, 'Barra Olímpica 20kg', 'Barra de acero profesional.', 149.00, 10, 2, 'Top', 'silver', 'equipment', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61', 180.00, 5, 25),
(8, 'Cinturón Levitación', 'Cuero genuino para máxima seguridad.', 32.50, 20, 1, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1', 40.00, 4.8, 48),
(9, 'Caseína Micelar', 'Proteína de liberación lenta.', 42.00, 35, 1, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1545129668-cb06c941d441', 50.00, 4.7, 112),
(10, 'Banco Pesas Pro', 'Ajustable en 7 posiciones.', 89.99, 8, 4, 'Envío Gratis', 'green', 'equipment', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f', 120.00, 4.9, 34);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `id_usuario`, `contenido`, `imagen_url`, `fecha_publicacion`) VALUES
(1, 2, '¡Dándole duro al Crossfit en la nueva sala! 💪🔥 #GymCore #FitnessLife', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', '2026-04-11 14:50:05'),
(2, 4, 'Nuevo PR en peso muerto: 220kg. ¡Vamos! 🏋️‍♂️', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', '2026-04-12 14:50:05'),
(3, 5, 'Sesión de yoga matutina para equilibrar la mente. 🧘‍♀️✨', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', '2026-04-13 09:50:05'),
(4, 3, '¿Quién se viene a entrenar mañana a la sede Norte? Pasamos lista. ✍️', NULL, '2026-04-13 12:50:05'),
(5, 6, 'Día de comida trampa superado. Mañana volvemos al déficit. 🍔❌', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', '2026-04-13 02:50:05'),
(6, 2, 'Probando la suplementación de GymCore. La proteína de chocolate está increíble. 🍫🧋', 'https://images.unsplash.com/photo-1593095191071-837c59844471', '2026-04-12 14:50:05'),
(20, 1, 'Holaa', NULL, '2026-04-13 14:54:26'),
(21, 1, 'Entrenando duro hoy! #fitness', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', '2026-04-13 15:48:33'),
(22, 1, 'Entrenando duro hoy! #fitness', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', '2026-04-13 15:48:40'),
(23, 1, '', 'Verification Post with Imagehttps://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400', '2026-04-13 16:08:22'),
(24, 1, 'Verification Post with Image', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400', '2026-04-13 16:08:29');

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
  `fecha_reserva` datetime DEFAULT NULL,
  `horario` varchar(255) DEFAULT NULL,
  `precio_total` double DEFAULT NULL,
  `id_sala` bigint(20) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `fecha_reserva`, `horario`, `precio_total`, `id_sala`, `id_usuario`) VALUES
(1, '2026-04-14 10:00:00', '10:00 - 11:00', 5, 1, 2),
(2, '2026-04-15 11:00:00', '11:00 - 12:00', 4, 2, 4);

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
(1, 20, 'Sala Musculación', 5, 1),
(2, 15, 'Pesos Libres', 4, 1),
(3, 10, 'Sala Crossfit', 8, 3),
(4, 25, 'Sala Multiusos', 6, 4);

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

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`id_sede`, `direccion`, `telefono`, `email`) VALUES
(1, 'Gran Vía, 28, Madrid', '910001122', 'centro@gymcore.com'),
(2, 'Paseo de la Castellana, 100, Madrid', '910003344', 'norte@gymcore.com'),
(3, 'Avinguda Diagonal, 450, Barcelona', '930005566', 'barcelona@gymcore.com'),
(4, 'Calle Betis, 15, Sevilla', '950009988', 'sevilla@gymcore.com');

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
(1, 'Administrador GymCore', '', 'admin@gymcore.com', 'admin123', '661632592', 1, '2026-04-13 14:50:05.000000', '../Imagenes/Foto_Perfil.jpg', 'Admin Central', 'Sede Central', 'admin'),
(2, 'Laura Mendez', '', 'laura.mendez@email.com', 'admin123', '600112233', 0, '2026-04-13 14:50:05.000000', 'https://randomuser.me/api/portraits/women/1.jpg', 'Adicta al Crossfit', 'Madrid', 'lau_fit'),
(3, 'Sergio García', 'Perez', 'sergio@gymcore.com', 'sergio123', '611223344', 0, '2026-04-13 14:50:05.000000', 'https://randomuser.me/api/portraits/men/32.jpg', 'Entrenador Personal', 'Barcelona', 'sergiogp'),
(4, 'Carlos Ruiz', '', 'carlos@email.com', '1234', '622334455', 0, '2026-04-13 14:50:05.000000', 'https://randomuser.me/api/portraits/men/10.jpg', 'Powerlifting lover', 'Sevilla', 'carlos_pw'),
(5, 'Elena Sanz', '', 'elena@email.com', '1234', '633445566', 0, '2026-04-13 14:50:05.000000', 'https://randomuser.me/api/portraits/women/15.jpg', 'Yoga & Pilares', 'Valencia', 'elena_yoga'),
(6, 'Marcos Josa', '', 'marcos@email.com', '1234', '644556677', 0, '2026-04-13 14:50:05.000000', 'https://randomuser.me/api/portraits/men/22.jpg', 'Enfocado en el volumen', 'Bilbao', 'marcos_bulk');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios_publicacion`
--
ALTER TABLE `comentarios_publicacion`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `fk_comm_pub` (`id_publicacion`),
  ADD KEY `fk_comm_user` (`id_usuario`);

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
-- Indices de la tabla `likes_publicacion`
--
ALTER TABLE `likes_publicacion`
  ADD PRIMARY KEY (`id_publicacion`,`id_usuario`),
  ADD KEY `fk_like_user` (`id_usuario`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notif_user` (`id_usuario`);

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
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `fk_pub_usuario` (`id_usuario`);

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
  ADD KEY `fk_reserva_sala` (`id_sala`),
  ADD KEY `fk_reserva_usuario` (`id_usuario`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sala_gimnasio` (`id_gimnasio`);

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
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios_publicacion`
--
ALTER TABLE `comentarios_publicacion`
  MODIFY `id_comentario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `gimnasios`
--
ALTER TABLE `gimnasios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `id_sala` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `id_sede` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios_publicacion`
--
ALTER TABLE `comentarios_publicacion`
  ADD CONSTRAINT `fk_comm_pub` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comm_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `fk_habitacion_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE CASCADE;

--
-- Filtros para la tabla `likes_publicacion`
--
ALTER TABLE `likes_publicacion`
  ADD CONSTRAINT `fk_like_pub` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_like_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_notif_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_prod_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE SET NULL;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `fk_pub_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_reserva_sala` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reserva_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `salas`
--
ALTER TABLE `salas`
  ADD CONSTRAINT `fk_sala_gimnasio` FOREIGN KEY (`id_gimnasio`) REFERENCES `gimnasios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
