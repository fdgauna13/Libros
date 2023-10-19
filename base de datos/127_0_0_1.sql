-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-10-2023 a las 02:22:03
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rest- api`
--
CREATE DATABASE IF NOT EXISTS `rest- api` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `rest- api`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--
-- Creación: 17-10-2023 a las 04:16:40
-- Última actualización: 18-10-2023 a las 22:24:05
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `autor` varchar(30) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `añopublicacion` date NOT NULL,
  `ISBN` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `nombre`, `autor`, `categoria`, `añopublicacion`, `ISBN`) VALUES
(6, 'Tuya', 'Claudia Piñeiro', 'Novela Policial', '2005-10-10', '1236547890'),
(7, 'Las viudas de los jueves', 'Claudia Piñeiro', 'Novela Policial', '2005-06-07', '1296147820'),
(9, 'Betibú', 'Claudia Piñeiro', 'Novela Policial', '2010-10-10', '1236580690'),
(10, 'Un comunista en calzoncillos ', 'Claudia Piñeiro', 'Novela Ficción Histórica', '2013-05-14', '4862593175'),
(11, 'Un comunista en calzoncillos ', 'Claudia Piñeiro', 'Novela Ficción Histórica', '2013-05-14', '4862593175'),
(12, 'La tregua', 'Mario Benedetti', 'Novela ', '1960-02-09', '2301456987'),
(13, 'Crónica de una muerte anunciad', 'Gael García Márquez', 'Novela ', '1981-03-14', '831729460'),
(14, 'Quién conoce a Greta Garbo?', ' Norma Huidobro', 'Novela Policial', '2000-10-15', '9371682450');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
