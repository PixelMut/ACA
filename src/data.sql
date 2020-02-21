-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `content` (
  `id_content` varchar(0) DEFAULT NULL,
  `id_object_type` varchar(0) DEFAULT NULL,
  `id_object` varchar(0) DEFAULT NULL,
  `id_user` varchar(0) DEFAULT NULL,
  `content` varchar(0) DEFAULT NULL,
  `content_actif` varchar(0) DEFAULT NULL,
  `nb_like_content` varchar(0) DEFAULT NULL,
  `nb_dislike_content` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evenements`
--

DROP TABLE IF EXISTS `evenements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evenements` (
  `id_evnt` varchar(0) DEFAULT NULL,
  `date_publication_evnt` varchar(0) DEFAULT NULL,
  `date_modif_evnt` varchar(0) DEFAULT NULL,
  `date_evnt` varchar(0) DEFAULT NULL,
  `evnt_actif` varchar(0) DEFAULT NULL,
  `evnt_photo` varchar(0) DEFAULT NULL,
  `description_evnt` varchar(0) DEFAULT NULL,
  `nb_like_evnt` varchar(0) DEFAULT NULL,
  `nb_dislike_evnt` varchar(0) DEFAULT NULL,
  `evnt_is_admin` varchar(0) DEFAULT NULL,
  `evnt_aborted` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evenements`
--

LOCK TABLES `evenements` WRITE;
/*!40000 ALTER TABLE `evenements` DISABLE KEYS */;
/*!40000 ALTER TABLE `evenements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evnt_state`
--

DROP TABLE IF EXISTS `evnt_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evnt_state` (
  `id_evnt` varchar(0) DEFAULT NULL,
  `id_user` varchar(0) DEFAULT NULL,
  `id_etat` varchar(0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evnt_state`
--

LOCK TABLES `evnt_state` WRITE;
/*!40000 ALTER TABLE `evnt_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `evnt_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localisation`
--

DROP TABLE IF EXISTS `localisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `localisation` (
  `id_localisation` tinyint(4) DEFAULT NULL,
  `libelle_localisation` varchar(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localisation`
--

LOCK TABLES `localisation` WRITE;
/*!40000 ALTER TABLE `localisation` DISABLE KEYS */;
INSERT INTO `localisation` VALUES (1,'Acensi Belgium'),(2,'Acensi France');
/*!40000 ALTER TABLE `localisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `object_type`
--

DROP TABLE IF EXISTS `object_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `object_type` (
  `id_object_type` tinyint(4) DEFAULT NULL,
  `libelle_object_type` varchar(23) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `object_type`
--

LOCK TABLES `object_type` WRITE;
/*!40000 ALTER TABLE `object_type` DISABLE KEYS */;
INSERT INTO `object_type` VALUES (1,'Commentaire publication'),(2,'Commentaire Evenement');
/*!40000 ALTER TABLE `object_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publication` (
  `id_publication` tinyint(4) DEFAULT NULL,
  `title_publication` varchar(0) DEFAULT NULL,
  `date_publication` varchar(19) DEFAULT NULL,
  `date_modif_publication` varchar(19) DEFAULT NULL,
  `publication_active` varchar(4) DEFAULT NULL,
  `nb_like_publication` tinyint(4) DEFAULT NULL,
  `nb_dislike_publication` tinyint(4) DEFAULT NULL,
  `publication_photo_1` varchar(0) DEFAULT NULL,
  `publication_photo_2` varchar(0) DEFAULT NULL,
  `publication_photo_3` varchar(0) DEFAULT NULL,
  `description_publication` varchar(17) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
INSERT INTO `publication` VALUES (1,'','2020-02-17 00:00:00','2020-02-17 00:00:00','True',0,0,'','','','creation de l\'app');
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication_state`
--

DROP TABLE IF EXISTS `publication_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publication_state` (
  `id_publication` tinyint(4) DEFAULT NULL,
  `id_user` tinyint(4) DEFAULT NULL,
  `id_etat` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication_state`
--

LOCK TABLES `publication_state` WRITE;
/*!40000 ALTER TABLE `publication_state` DISABLE KEYS */;
INSERT INTO `publication_state` VALUES (1,1,1);
/*!40000 ALTER TABLE `publication_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id_etat` tinyint(4) DEFAULT NULL,
  `libelle_etat` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Owner'),(2,'Non Vu'),(3,'Vu'),(4,'Participe');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_user`
--

DROP TABLE IF EXISTS `type_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_user` (
  `id_type_user` tinyint(4) DEFAULT NULL,
  `libelle_type_user` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_user`
--

LOCK TABLES `type_user` WRITE;
/*!40000 ALTER TABLE `type_user` DISABLE KEYS */;
INSERT INTO `type_user` VALUES (1,'Super user'),(2,'Admin'),(3,'User');
/*!40000 ALTER TABLE `type_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id_user` tinyint(4) DEFAULT NULL,
  `nom_user` varchar(5) DEFAULT NULL,
  `prenom_user` varchar(4) DEFAULT NULL,
  `adresse_mail` varchar(20) DEFAULT NULL,
  `pswd_user` varchar(11) DEFAULT NULL,
  `id_localisation` tinyint(4) DEFAULT NULL,
  `id_type_user` tinyint(4) DEFAULT NULL,
  `photo_user` varchar(6) DEFAULT NULL,
  `adresse_user_rue` varchar(15) DEFAULT NULL,
  `adresse_user_code_postal` smallint(6) DEFAULT NULL,
  `adresse_user_localite` varchar(9) DEFAULT NULL,
  `user_actif` varchar(4) DEFAULT NULL,
  `poste` varchar(13) DEFAULT NULL,
  `notif_user_pub` varchar(5) DEFAULT NULL,
  `notif_user_evnt` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'akgul','umut','umut.akgul@acensi.be','rf4SF3qzfg4',1,1,'photo1','rue froissart 3',1040,'Etterbeek','True','Consultant IT','False','False');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-22 15:20:28
