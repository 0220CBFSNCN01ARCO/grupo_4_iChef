CREATE DATABASE  IF NOT EXISTS `ichef` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ichef`;
-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ichef
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Arcor'),(2,'Alicante'),(3,'Aquarius'),(4,'Andresito'),(5,'Baggio'),(6,'Bagley'),(7,'BC'),(8,'Bimbo'),(9,'Bonafide'),(10,'Branca'),(11,'Cabrales'),(12,'Cabsha'),(13,'Campo Austral'),(14,'Canale'),(15,'Casalta'),(16,'CasanCrem'),(17,'CBSé'),(18,'Cepita'),(19,'Cereal Mix'),(20,'Cerealitas'),(21,'Chocoarroz'),(22,'Chocolinas'),(23,'Cica'),(24,'Citric'),(25,'Clight'),(26,'Coca-Cola'),(27,'Cocinero'),(28,'Cruz De Malta'),(29,'Dánica'),(30,'Dimax'),(31,'Don Felipe'),(32,'Don Satur'),(33,'Doritos'),(34,'Dos Anclas'),(35,'Dos Hermanos'),(36,'Egran'),(37,'Ensure'),(38,'Equal Sweet'),(39,'Esnaola'),(40,'Exquisita'),(41,'Fargo'),(42,'Fantoche'),(43,'Favorita'),(44,'Ferrero Rocher'),(45,'Firenze'),(46,'Finlandia'),(47,'Gallo'),(48,'Gatorade'),(49,'Grandiet'),(50,'Grandote'),(51,'Green Hills'),(52,'Green Life'),(53,'Hellmann\'s'),(54,'Heinz'),(55,'Herbalife'),(56,'Hileret'),(57,'Inalpa'),(58,'Inca'),(59,'Ivess'),(60,'Jorgito'),(61,'Kinder'),(62,'Knorr'),(63,'Kraft'),(64,'La Cabaña'),(65,'La Campagnola'),(66,'La Casona'),(67,'La Italiana'),(68,'La Morenita'),(69,'La Merced'),(70,'La Lácteo'),(71,'La Paulina'),(72,'La Salteña'),(73,'La Virginia'),(74,'Levite'),(75,'Lucchetti'),(76,'Maizena'),(77,'Manfrey'),(78,'Marolio'),(79,'Matarazzo'),(80,'McCain'),(81,'Milka'),(82,'Molto'),(83,'Natura'),(84,'Nescafé'),(85,'Nestlé'),(86,'Nido'),(87,'Oblita'),(88,'Opera'),(89,'Orieta'),(90,'Ottonello'),(91,'Paladini'),(92,'Paty'),(93,'Pepsi'),(94,'Powerade'),(95,'Pritty'),(96,'Pureza'),(97,'Quaker'),(98,'Quilmes'),(99,'Red Bull'),(100,'Rosamonte'),(101,'Royal'),(102,'Sabores Del Valle'),(103,'San Alfonso'),(104,'Santa Brigida'),(105,'Santa Rosa'),(106,'Stella Artois'),(107,'Tapalque'),(108,'Terma'),(109,'Tholem'),(110,'Tía Maruca'),(111,'Vanoli'),(112,'Vegetalex'),(113,'Veneziana'),(114,'Vieníssima'),(115,'Villavicencio'),(116,'Windy'),(117,'Wonka'),(118,'Yogurísimo'),(119,'Yin Yang'),(120,'Yatasto'),(121,'Zucoa'),(122,'Zuko');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_detail`
--

DROP TABLE IF EXISTS `car_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` float NOT NULL,
  `neto_total` float NOT NULL,
  `descuentos` float NOT NULL,
  `subtotal` float NOT NULL,
  `total` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_detail`
--

LOCK TABLES `car_detail` WRITE;
/*!40000 ALTER TABLE `car_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `cantidad_items` int(11) NOT NULL,
  `neto_total` float NOT NULL,
  `subtotal` float NOT NULL,
  `importe_descuentos` float NOT NULL,
  `total` float NOT NULL,
  `fecha` datetime NOT NULL,
  `estado` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heading`
--

DROP TABLE IF EXISTS `heading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `heading` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heading`
--

LOCK TABLES `heading` WRITE;
/*!40000 ALTER TABLE `heading` DISABLE KEYS */;
INSERT INTO `heading` VALUES (1,'Alimentos Congelados'),(2,'Almacén'),(3,'Bebidas con Alcohol'),(4,'Bebidas sin Alcohol'),(5,'Frescos');
/*!40000 ALTER TABLE `heading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Carne vacuna'),(2,'Cebolla'),(3,'Limón'),(4,'bicarbonato'),(5,'pimienta negra'),(6,'cilantro'),(7,'tomillo'),(8,'romero'),(9,'Pechuga de pollo'),(10,'Bondiola de cerdo'),(11,'salsa teriyaki'),(12,'manteca'),(13,'zanahoria'),(14,'morrón rojo/verde/amarillo'),(15,'albahaca fresca'),(16,'nuez moscada'),(17,'semillas de girasol'),(18,'aceite de girasol'),(19,'sal fina'),(20,'Carré de cerdo'),(21,'batter'),(22,'avena'),(23,'arroz carnaroli'),(24,'zapallo cabutia,'),(25,'queso parrillero tipo provoleta'),(26,'ajo'),(27,'papa'),(28,'Crema'),(29,'leche entera'),(30,'salsa mediterránea'),(31,'harina 0000'),(32,'harina de centeno'),(33,'queso porsalut'),(34,'huevo'),(35,'puerro'),(36,'Espinaca'),(37,'salvado'),(38,'centeno'),(39,'queso reggianito'),(40,'berenjena'),(41,'comino'),(42,'curry'),(43,'batata');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients_products`
--

DROP TABLE IF EXISTS `ingredients_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredients_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) DEFAULT NULL,
  `id_ingredients` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id_fk` (`id_product`),
  KEY `ingredients_id_fk` (`id_ingredients`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients_products`
--

LOCK TABLES `ingredients_products` WRITE;
/*!40000 ALTER TABLE `ingredients_products` DISABLE KEYS */;
INSERT INTO `ingredients_products` VALUES (1,1,1,NULL,NULL),(2,2,1,NULL,NULL);
/*!40000 ALTER TABLE `ingredients_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `id_producto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `foto_producto_fk` (`id_producto`),
  CONSTRAINT `foto_producto_fk` FOREIGN KEY (`id_producto`) REFERENCES `product` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'prod-1.png',1),(2,'box1.jpg',2);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `precio` float NOT NULL,
  `oferta` tinyint(4) NOT NULL,
  `precio_oferta` float NOT NULL,
  `descuento_oferta` float NOT NULL,
  `rubro_id` int(11) DEFAULT NULL,
  `marca_id` int(11) DEFAULT NULL,
  `detalle` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `cant_comensales` int(11) NOT NULL,
  `calorias` float NOT NULL,
  `peso` float NOT NULL,
  `receta` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_product`),
  KEY `tipo_producto_id_fk` (`product_type_id`),
  KEY `marca_producto_id_fk` (`marca_id`),
  KEY `rubro_producto_id_fk` (`rubro_id`),
  CONSTRAINT `ingrediente_producto_pk` FOREIGN KEY (`id_product`) REFERENCES `ingredients_products` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `marca_producto_id_fk` FOREIGN KEY (`marca_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `rubro_producto_id_fk` FOREIGN KEY (`rubro_id`) REFERENCES `heading` (`id`),
  CONSTRAINT `tipo_producto_id_fk` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,'Market 1',1,12.5,0,0,0,1,1,'Market 1',2,250,350,NULL),(2,2,'Box 1',2,12.5,0,0,0,1,1,'Box 1',1,100,100,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'PRODUCTO'),(2,'CAJA');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_cart`
--

DROP TABLE IF EXISTS `status_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_cart`
--

LOCK TABLES `status_cart` WRITE;
/*!40000 ALTER TABLE `status_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `nroTelefono` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `categorie_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','admin@ichef.com','$2b$10$7wmTOptmvMBtQ.dWxXenyO8cbrvRMuWUMNk8Me5qQ0pGIbO42ppei','11111111','admin-23-06-2020.jpg',1,'2020-06-29 23:48:27','2020-06-29 20:48:27'),(2,'jose','jose','jose@ichef.com','$2b$10$6PUC9H6bHrmrIV5Z1lIjJeRN08ZMWrtrH4RKT7G7mAj24f2OsMwLK','1234567891','jose-30-06-2020.png',4,'2020-07-01 00:14:29','2020-07-01 00:14:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_categories`
--

DROP TABLE IF EXISTS `users_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_categories`
--

LOCK TABLES `users_categories` WRITE;
/*!40000 ALTER TABLE `users_categories` DISABLE KEYS */;
INSERT INTO `users_categories` VALUES (1,'ADMINISTRADOR'),(2,'CHEF'),(3,'INVITADO'),(4,'USER');
/*!40000 ALTER TABLE `users_categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-01 22:15:15
