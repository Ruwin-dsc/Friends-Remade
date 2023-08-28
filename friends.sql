-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 28 août 2023 à 20:22
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `friends`
--

-- --------------------------------------------------------

--
-- Structure de la table `bump`
--

CREATE TABLE `bump` (
  `guildId` varchar(255) DEFAULT NULL,
  `invite` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `salon` varchar(255) DEFAULT NULL,
  `bump` varchar(255) NOT NULL DEFAULT '0',
  `vote` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `bump`
--

INSERT INTO `bump` (`guildId`, `invite`, `description`, `salon`, `bump`, `vote`) VALUES
('1142882836941111388', 'https://discord.gg/R8UazK8Dj9', 'Bonjour toi', '1145383620580757614', '2', '1'),
('1069937639890899015', 'https://discord.gg/TAmJvEgA6q', NULL, NULL, '1', '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
