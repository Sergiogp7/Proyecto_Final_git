-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2026 a las 10:25:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

-- Iniciar una transacción para asegurar que todas las tablas y datos se carguen juntos o nada (evita cargas parciales).
START TRANSACTION;

-- Ajustar la zona horaria del servidor de la base de datos a UTC por estandarización.
SET time_zone = "+00:00";

-- Configurar juego de caracteres de la conexión para admitir tildes y caracteres especiales (utf8mb4).
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `proyectofinal`

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` ( -- Creación de la tabla que almacena los artículos individuales que componen un pedido.
  `id_detalle` int(11) NOT NULL, -- Identificador único de cada línea de detalle de la compra.
  `id_pedido` int(11) DEFAULT NULL, -- ID de referencia al pedido global (Cabecera). Relaciona esta fila con un pedido.
  `id_producto` int(11) DEFAULT NULL, -- ID del producto comprado. Relaciona esta fila con el catálogo de productos.
  `cantidad` int(11) NOT NULL, -- Cuántas unidades de este producto se están comprando en este pedido.
  `precio_unitario` decimal(10,2) NOT NULL -- Guarda el precio al momento de la compra para evitar desajustes históricos si el precio cambia.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; -- Motor InnoDB para habilitar claves foráneas y transacciones seguras.

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gimnasios`
--

CREATE TABLE `gimnasios` ( -- Tabla para registrar las sedes físicas de tu franquicia deportiva.
  `id` bigint(20) NOT NULL, -- Identificador único de cada gimnasio físico.
  `nombre` varchar(255) NOT NULL, -- Nombre comercial de la sede (ej: GymCore Centro).
  `ubicacion` varchar(255) DEFAULT NULL, -- Dirección postal o coordenadas de la sede.
  `valoracion` double DEFAULT NULL -- Calificación promedio de estrellas dada por los usuarios.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gimnasios`
--

INSERT INTO `gimnasios` (`id`, `nombre`, `ubicacion`, `valoracion`) VALUES
(1, 'GymCore Centro', 'Gran Vía, 28, Madrid', 4.9), -- Inserción de la sede principal para pruebas y demostración.
(2, 'GymCore Norte', 'Paseo de la Castellana, 100, Madrid', 4.7); -- Inserción de la segunda sede de la franquicia.

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` ( -- Tabla auxiliar/antigua para salas. Se solapará posteriormente con 'salas'. Útil para histórico.
  `id_sala` int(11) NOT NULL, -- Identificador de la sala/habitación.
  `numero` varchar(50) NOT NULL, -- Etiqueta o número de la sala.
  `precio_hora` decimal(10,2) NOT NULL, -- Tarifa de coste por hora reservada.
  `tipo` varchar(50) DEFAULT NULL, -- Tipo de sala (ej: musculación, cardio, etc.).
  `id_sede` int(11) DEFAULT NULL -- ID de la sede a la que pertenece esta sala específica.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` ( -- Tabla de cabecera de compras. Agrupa el total y la fecha de la transacción de un usuario.
  `id_pedido` int(11) NOT NULL, -- Identificador único del pedido de compra.
  `fecha_pedido` date NOT NULL, -- Fecha de la compra para balances de cuentas.
  `total` decimal(10,2) NOT NULL, -- Importe final cobrado en euros.
  `id_usuario` int(11) DEFAULT NULL -- ID del usuario que realizó la compra (Relación con usuarios).
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` ( -- Catálogo de productos completo para la vista de tienda (Shop) del frontend.
  `id_producto` int(11) NOT NULL, -- ID del producto consumible o equipamiento.
  `nombre` varchar(255) NOT NULL, -- Título que se mostrará en las tarjetas de la tienda.
  `descripcion` text DEFAULT NULL, -- Detalle de ingredientes o materiales (puede ser nulo si no hay descripción).
  `precio` decimal(38,2) NOT NULL, -- Precio actual que se cobrará al usuario.
  `stock` int(11) DEFAULT 0, -- Inventario disponible para evitar compras sin stock.
  `id_sede` int(11) DEFAULT NULL, -- En caso de que el producto pertenezca o se retire en una sede específica.
  `badge` varchar(255) DEFAULT NULL, -- Texto de etiqueta frontend (ej: 'Más Vendido').
  `badge_color` varchar(255) DEFAULT NULL, -- Color asignado a la etiqueta para estilos dinámicos.
  `categoria` varchar(255) DEFAULT NULL, -- Tipo (supplements, equipment, accessories) para filtrado.
  `imagen_url` varchar(255) DEFAULT NULL, -- URL de la foto miniatura para renderizado Grid.
  `precio_anterior` decimal(38,2) DEFAULT NULL, -- Precio previo para cálculo de ofertas tachadas.
  `rating` double DEFAULT NULL, -- Puntuación de media (ej: 4.8).
  `reviews_count` int(11) DEFAULT NULL -- Número de opiniones totales de compradores.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `id_sede`, `badge`, `badge_color`, `categoria`, `imagen_url`, `precio_anterior`, `rating`, `reviews_count`) VALUES
(1, 'Proteína Whey Gold Standard', NULL, 45.99, 100, NULL, 'Best Seller', 'orange', 'supplements', 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d', 55.00, 4.9, 1250), -- Inserta Proteína.
(2, 'Creatina Monohidratada 500g', NULL, 24.95, 150, NULL, 'Top Rated', 'blue', 'supplements', 'https://images.unsplash.com/photo-1579722820308-d74e571900a9', 29.99, 4.8, 850), -- Inserta Creatina.
(3, 'Mancuernas Hexagonales 10kg', NULL, 35.00, 50, NULL, NULL, NULL, 'equipment', 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c', 42.00, 4.7, 320), -- Inserta Mancuernas.
(4, 'Esterilla de Yoga Premium', NULL, 19.99, 80, NULL, 'Eco Friendly', 'green', 'accessories', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f', 25.00, 4.6, 210), -- Inserta Esterilla.
(5, 'Banda de Resistencia Set', NULL, 12.50, 200, NULL, 'Oferta', 'red', 'accessories', 'https://images.unsplash.com/photo-1598289431512-b97b0917affc', 18.00, 4.5, 450), -- Inserta Bandas.
(6, 'Pre-Entreno Explosive Energy', NULL, 32.00, 90, NULL, 'Nuevo', 'blue', 'supplements', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97', 38.50, 4.8, 600), -- Inserta Pre-entreno.
(7, 'Kettlebell 16kg', NULL, 45.00, 40, NULL, NULL, NULL, 'equipment', 'https://images.unsplash.com/photo-1517963628607-235ccdd5476c', 50.00, 4.9, 180), -- Inserta Pesa Rusa.
(8, 'Rodillo de Espuma (Foam Roller)', NULL, 15.00, 120, NULL, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1616279969096-54b228f5f103', 20.00, 4.4, 150), -- Inserta Rodillo.
(9, 'Barra Olímpica 20kg', NULL, 150.00, 15, NULL, 'Profesional', 'black', 'equipment', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61', 180.00, 5, 95), -- Inserta Barra Olímpica.
(10, 'Cinturón de Levantamiento', NULL, 25.99, 60, NULL, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1', 30.00, 4.7, 200), -- Inserta Cinturón.
(11, 'Multivitamínico Sport', NULL, 18.50, 110, NULL, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843', 22.00, 4.6, 300), -- Inserta Vitaminas.
(12, 'Banco Ajustable de Pesas', NULL, 89.99, 25, NULL, 'Envío Gratis', 'green', 'equipment', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f', 120.00, 4.8, 140), -- Inserta Banco.
(13, 'Guantes de Gimnasio', NULL, 14.00, 150, NULL, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5', 18.00, 4.3, 220), -- Inserta Guantes.
(14, 'BCAA 2:1:1 Polvo', NULL, 28.00, 80, NULL, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1550572017-edd951aa8f72', 35.00, 4.7, 400), -- Inserta BCAA.
(15, 'Balón Medicinal 5kg', NULL, 22.00, 50, NULL, NULL, NULL, 'equipment', 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c', 28.00, 4.5, 90), -- Inserta Balón.
(16, 'Botella Shaker Pro', NULL, 8.99, 300, NULL, 'Básico', 'gray', 'accessories', 'https://images.unsplash.com/photo-1610970882739-4495585165b5', 12.00, 4.2, 500), -- Inserta Shaker.
(17, 'Caseína Micelar', NULL, 42.00, 60, NULL, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1545129668-cb06c941d441', 50.00, 4.8, 180), -- Inserta Caseína.
(18, 'Cuerda para Saltar Veloz', NULL, 9.50, 140, NULL, NULL, NULL, 'accessories', 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d', 12.00, 4.6, 350), -- Inserta Cuerda.
(19, 'Disco Olímpico 20kg', NULL, 60.00, 40, NULL, NULL, NULL, 'equipment', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48', 75.00, 4.9, 110), -- Inserta Disco.
(20, 'Glutamina 500g', NULL, 26.00, 75, NULL, NULL, NULL, 'supplements', 'https://images.unsplash.com/photo-1627483297886-49710ae1fc28', 32.00, 4.7, 210); -- Inserta Glutamina.

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` ( -- Tabla para registrar agendas y citas en las salas de las sedes.
  `id_reserva` int(11) NOT NULL, -- ID único del registro de reserva.
  `fecha_reserva` date NOT NULL, -- Día agendado para la sesión.
  `hora_inicio` time NOT NULL, -- Hora inicial de la reserva.
  `hora_fin` time NOT NULL, -- Hora de finalización.
  `id_usuario` int(11) DEFAULT NULL, -- ID del usuario que asiste.
  `id_sala` int(11) DEFAULT NULL -- ID de la sala reservada (Relación con 'habitacion').
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` ( -- Nota: Tabla paralela/duplicada. Se utiliza vinculada a la tabla 'salas'. Estructura auto-generada.
  `id` bigint(20) NOT NULL, -- ID de referencia auto-incremental.
  `fecha_reserva` datetime(6) DEFAULT NULL, -- Fecha y hora exacta del agendamiento.
  `horario` varchar(255) DEFAULT NULL, -- Cadena de texto descriptiva del horario.
  `precio_total` double DEFAULT NULL, -- Importe total de la reserva si aplica.
  `id_sala` bigint(20) DEFAULT NULL, -- ID de la sala reservada (Relación con 'salas').
  `id_usuario` bigint(20) DEFAULT NULL -- ID del usuario que asiste.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `fecha_reserva`, `horario`, `precio_total`, `id_sala`, `id_usuario`) VALUES
(1, '2026-03-10 08:29:05.000000', '12:00', 4, 2, 1), -- Reserva de prueba usuario 1 en sala 2.
(2, '2026-03-10 08:29:05.000000', '12:00', 4, 2, 1), -- Reserva repetida para controlar errores de aforo concurrentes.
(3, '2026-03-10 08:29:05.000000', '12:00', 4, 2, 1),
(4, '2026-03-10 08:29:06.000000', '12:00', 4, 2, 1),
(5, '2026-03-10 08:29:06.000000', '12:00', 4, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` ( -- Zonas de ejercicios o espacios específicos que componen a un Gimnasio.
  `id` bigint(20) NOT NULL, -- Identificador único de la sala.
  `capacidad` int(11) DEFAULT NULL, -- Límite de personas por hora (Aforo máximo).
  `nombre` varchar(255) NOT NULL, -- Tipo de sala (ej: Sala de Musculación, Pesos Libres).
  `precio` double DEFAULT NULL, -- Tarifa de uso de la sala para la reserva.
  `id_gimnasio` bigint(20) DEFAULT NULL -- Gimnasio (Sede) a la que pertenece esta sala.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id`, `capacidad`, `nombre`, `precio`, `id_gimnasio`) VALUES
(1, 20, 'Sala de Musculación', 5, 1), -- Sala de musculación en el gimnasio Centro.
(2, 15, 'Sala de Pesos Libres', 4, 1), -- Sala de pesos libres en el gimnasio Centro.
(3, 30, 'Sala de Cardio', 3, 2); -- Sala de cardio en el gimnasio Norte.

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` ( -- Tabla auxiliar para contactos o detalles complementarios de centros.
  `id_sede` int(11) NOT NULL, -- ID de contacto de la sede.
  `direccion` varchar(255) NOT NULL, -- Dirección postal o calle.
  `telefono` varchar(20) DEFAULT NULL, -- Teléfono de recepción del gimnasio.
  `email` varchar(100) DEFAULT NULL -- Correo electrónico para atención al cliente.
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` ( -- Tabla centralizada que almacena todos los perfiles registrados en el software.
  `id_usuario` int(11) NOT NULL, -- Identificador único del perfil.
  `nombre` varchar(255) NOT NULL, -- Nombre de pila de la persona.
  `apellidos` varchar(255) NOT NULL, -- Apellidos de la persona.
  `email` varchar(255) NOT NULL, -- Correo electrónico de contacto y credencial de login secundario.
  `contrasena` varchar(255) NOT NULL, -- Hash o clave encriptada para validar sesión.
  `telefono` varchar(255) DEFAULT NULL, -- Teléfono de contacto.
  `es_admin` tinyint(1) DEFAULT 0, -- Booleano (0 o 1). 1 indica rol Administrador.
  `fecha_registro` datetime(6) DEFAULT NULL, -- Timestamp del alta en la plataforma.
  `avatar_url` varchar(255) DEFAULT NULL, -- Enlace a la foto de perfil en el grid de cuenta.
  `bio` varchar(255) DEFAULT NULL, -- Texto de presentación corto que se muestra en la cuenta.
  `ubicacion` varchar(255) DEFAULT NULL, -- Ciudad o país de residencia.
  `username` varchar(255) DEFAULT NULL -- Nickname o nombre de usuario de login rápido (Único).
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellidos`, `email`, `contrasena`, `telefono`, `es_admin`, `fecha_registro`, `avatar_url`, `bio`, `ubicacion`, `username`) VALUES
(1, 'Sergio Garcia Pedrero', '', 'sergio.garcia@gymcore.com', 'admin123', '661632592', 1, '2026-01-27 14:12:53.000000', '../Imagenes/Foto_Perfil.jpg', 'Administrador principal del sistema GymCore.', 'Aznalcollar, Sevilla', 'admin'), -- Alta Admin inicial.
(2, 'Laura Mendez', '', 'laura.mendez@email.com', 'pass123', '600112233', 0, '2026-01-27 14:12:53.000000', 'https://randomuser.me/api/portraits/women/1.jpg', 'Adicta al Crossfit y la vida sana.', 'Madrid', 'lau_fit'), -- Usuario regular.
(47, 'Test', 'User', 'testuser_unique812@example.com', '$2a$10$Qbsd/AofEjEHpyx072pXX.b6X1YTq1...CX2BJkf8m5MIF4p6j7y', NULL, 0, '2026-03-10 08:54:05.000000', '../Imagenes/Foto_Perfil.jpg', NULL, NULL, 'sergio.garcia@gymcore.ctestuser_unique812om'); -- Usuario de pruebas unitarias.

-- --------------------------------------------------------

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_detalle`), -- Clave primaria sobre el contador id_detalle.
  ADD KEY `fk_detalle_pedido` (`id_pedido`), -- Crear índice sobre id_pedido para búsquedas ágiles de un carro.
  ADD KEY `fk_detalle_producto` (`id_producto`); -- Crear índice sobre id_producto para listados de stock frecuentes.

--
-- Indices de la tabla `gimnasios`
--
ALTER TABLE `gimnasios`
  ADD PRIMARY KEY (`id`); -- Clave primaria para búsquedas O(1) de centros.

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`id_sala`), -- Clave primaria para indexar salas.
  ADD KEY `fk_habitacion_sede` (`id_sede`); -- Índice para relacionar salas pertenecientes a una misma sede.

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `fk_pedido_usuario` (`id_usuario`); -- Índice para listar historial de compras de un usuario específico.

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `fk_producto_sede` (`id_sede`); -- Índice en caso de vincular stock a zonas geográficas.

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `fk_reserva_usuario` (`id_usuario`), -- Índice para calendario de citas por usuario.
  ADD KEY `fk_reserva_sala` (`id_sala`); -- Índice para vigilar el aforo de una sala.

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKc92vdgqsatiwu4h53fok5ikf8` (`id_sala`); -- Referencias Hibernate JPA de control de concurrencias.

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKiow5k9pbyyf7f9prpqd3c40ji` (`id_gimnasio`); -- Índice JPA que enlaza con gimnasios físicos.

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`id_sede`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`), -- Identificador principal.
  ADD UNIQUE KEY `email` (`email`), -- Restricción de unicidad para evitar registros duplicados con el mismo mail.
  ADD UNIQUE KEY `UKm2dvbwfge291euvmk6vkkocao` (`username`); -- Restricción de unicidad de username.

-- --------------------------------------------------------

--
-- AUTO_INCREMENT de las tablas volcadas
--

ALTER TABLE `detalle_pedido` MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT; -- Auto-incrementar ID de detalle en cada nuevo ítem añadido al carro.
ALTER TABLE `gimnasios` MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3; -- Inicializar en ID 3 en inserciones en vivo.
ALTER TABLE `habitacion` MODIFY `id_sala` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `pedidos` MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `productos` MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
ALTER TABLE `reserva` MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `reservas` MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `salas` MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `sedes` MODIFY `id_sede` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `usuarios` MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

-- --------------------------------------------------------

--
-- Restricciones para tablas volcadas (Claves Foráneas)
--

-- Filtros para la tabla `detalle_pedido`
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `fk_detalle_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE, -- Si se borra un pedido cabecera, mueren sus ítems secundarios.
  ADD CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE; -- Si se borra el producto, se limpian historiales de compras asociadas.

-- Filtros para la tabla `habitacion`
ALTER TABLE `habitacion`
  ADD CONSTRAINT `fk_habitacion_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE CASCADE;

-- Filtros para la tabla `pedidos`
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

-- Filtros para la tabla `productos`
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_producto_sede` FOREIGN KEY (`id_sede`) REFERENCES `sedes` (`id_sede`) ON DELETE SET NULL; -- Si una sede cierra, el producto queda flotante (Nulo), no se borra.

-- Filtros para la tabla `reserva`
ALTER TABLE `reserva`
  ADD CONSTRAINT `fk_reserva_sala` FOREIGN KEY (`id_sala`) REFERENCES `habitacion` (`id_sala`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reserva_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

-- Filtros para la tabla `reservas`
ALTER TABLE `reservas`
  ADD CONSTRAINT `FKc92vdgqsatiwu4h53fok5ikf8` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`); -- Validar la existencia de la sala objetivo.

-- Filtros para la tabla `salas`
ALTER TABLE `salas`
  ADD CONSTRAINT `FKiow5k9pbyyf7f9prpqd3c40ji` FOREIGN KEY (`id_gimnasio`) REFERENCES `gimnasios` (`id`); -- Enlace bidireccional JPA con el gimnasio sede.

COMMIT; -- Aplicar cambios guardados en la transacción de la DB.
