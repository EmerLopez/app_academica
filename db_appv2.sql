-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2024 a las 14:59:46
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
-- Base de datos: `db_appv2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumno` bigint(20) NOT NULL,
  `idMatricula` bigint(20) NOT NULL,
  `nombre` char(100) NOT NULL,
  `responsable` char(75) NOT NULL,
  `fechaN` char(25) NOT NULL,
  `departamento` char(50) NOT NULL,
  `municipio` char(50) NOT NULL,
  `direccion` char(50) NOT NULL,
  `sexo` char(50) NOT NULL,
  `telefono` char(50) NOT NULL,
  `carrera` char(50) NOT NULL,
  `correo` char(50) NOT NULL,
  `foto` longtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculas`
--

CREATE TABLE `matriculas` (
  `idMatricula` bigint(20) NOT NULL,
  `codigo` char(10) NOT NULL,
  `nombre` char(100) NOT NULL,
  `carrera` char(100) NOT NULL,
  `monto` decimal(10,0) NOT NULL,
  `condicion` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `modalidad` char(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=FIXED;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`),
  ADD KEY `idMatricula` (`idMatricula`);

--
-- Indices de la tabla `matriculas`
--
ALTER TABLE `matriculas`
  ADD PRIMARY KEY (`idMatricula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `matriculas`
--
ALTER TABLE `matriculas`
  MODIFY `idMatricula` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1710943121046;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
