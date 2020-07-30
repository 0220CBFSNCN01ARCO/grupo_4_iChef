USE `ichef`;
--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Arcor'),(2,'Alicante'),(3,'Aquarius'),(4,'Andresito'),(5,'Baggio'),(6,'Bagley'),(7,'BC'),(8,'Bimbo'),(9,'Bonafide'),(10,'Branca'),(11,'Cabrales'),(12,'Cabsha'),(13,'Campo Austral'),(14,'Canale'),(15,'Casalta'),(16,'CasanCrem'),(17,'CBSé'),(18,'Cepita'),(19,'Cereal Mix'),(20,'Cerealitas'),(21,'Chocoarroz'),(22,'Chocolinas'),(23,'Cica'),(24,'Citric'),(25,'Clight'),(26,'Coca-Cola'),(27,'Cocinero'),(28,'Cruz De Malta'),(29,'Dánica'),(30,'Dimax'),(31,'Don Felipe'),(32,'Don Satur'),(33,'Doritos'),(34,'Dos Anclas'),(35,'Dos Hermanos'),(36,'Egran'),(37,'Ensure'),(38,'Equal Sweet'),(39,'Esnaola'),(40,'Exquisita'),(41,'Fargo'),(42,'Fantoche'),(43,'Favorita'),(44,'Ferrero Rocher'),(45,'Firenze'),(46,'Finlandia'),(47,'Gallo'),(48,'Gatorade'),(49,'Grandiet'),(50,'Grandote'),(51,'Green Hills'),(52,'Green Life'),(53,'Hellmann\'s'),(54,'Heinz'),(55,'Herbalife'),(56,'Hileret'),(57,'Inalpa'),(58,'Inca'),(59,'Ivess'),(60,'Jorgito'),(61,'Kinder'),(62,'Knorr'),(63,'Kraft'),(64,'La Cabaña'),(65,'La Campagnola'),(66,'La Casona'),(67,'La Italiana'),(68,'La Morenita'),(69,'La Merced'),(70,'La Lácteo'),(71,'La Paulina'),(72,'La Salteña'),(73,'La Virginia'),(74,'Levite'),(75,'Lucchetti'),(76,'Maizena'),(77,'Manfrey'),(78,'Marolio'),(79,'Matarazzo'),(80,'McCain'),(81,'Milka'),(82,'Molto'),(83,'Natura'),(84,'Nescafé'),(85,'Nestlé'),(86,'Nido'),(87,'Oblita'),(88,'Opera'),(89,'Orieta'),(90,'Ottonello'),(91,'Paladini'),(92,'Paty'),(93,'Pepsi'),(94,'Powerade'),(95,'Pritty'),(96,'Pureza'),(97,'Quaker'),(98,'Quilmes'),(99,'Red Bull'),(100,'Rosamonte'),(101,'Royal'),(102,'Sabores Del Valle'),(103,'San Alfonso'),(104,'Santa Brigida'),(105,'Santa Rosa'),(106,'Stella Artois'),(107,'Tapalque'),(108,'Terma'),(109,'Tholem'),(110,'Tía Maruca'),(111,'Vanoli'),(112,'Vegetalex'),(113,'Veneziana'),(114,'Vieníssima'),(115,'Villavicencio'),(116,'Windy'),(117,'Wonka'),(118,'Yogurísimo'),(119,'Yin Yang'),(120,'Yatasto'),(121,'Zucoa'),(122,'Zuko');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `diners`
--

LOCK TABLES `diners` WRITE;
/*!40000 ALTER TABLE `diners` DISABLE KEYS */;
INSERT INTO `diners` VALUES (1,'1'),(2,'2'),(3,'3'),(4,'4'),(5,'Mas de 6');
/*!40000 ALTER TABLE `diners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `heading`
--

LOCK TABLES `heading` WRITE;
/*!40000 ALTER TABLE `heading` DISABLE KEYS */;
INSERT INTO `heading` VALUES (1,'Alimentos Congelados'),
(2,'Almacén'),(3,'Bebidas con Alcohol'),
(4,'Bebidas sin Alcohol'),(5,'Frescos'),
(6,'Saludable & Fitness'),(7,'Gourmet'),
(8,'Vegetarianos'),(9,'Postres');
/*!40000 ALTER TABLE `heading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Carne vacuna'),(2,'Cebolla'),(3,'Limón'),(4,'Bicarbonato'),
(5,'Pimienta negra'),(6,'Cilantro'),(7,'Tomillo'),(8,'Romero'),(9,'Pechuga de pollo'),
(10,'Bondiola de cerdo'),(11,'Salsa teriyaki'),(12,'Manteca'),(13,'Zanahoria'),
(14,'Morrón rojo/verde/amarillo'),(15,'Albahaca fresca'),(16,'Nuez moscada'),(17,'Semillas de girasol'),
(18,'Aceite de girasol'),(19,'Sal fina'),(20,'Carré de cerdo'),(21,'Batter'),(22,'Avena'),(23,'Arroz carnaroli'),
(24,'Zapallo cabutia,'),(25,'Queso parrillero tipo provoleta'),(26,'Ajo'),(27,'Papa'),(28,'Crema'),
(29,'Leche entera'),(30,'Salsa mediterránea'),(31,'Harina 0000'),(32,'Harina de centeno'),
(33,'Queso porsalut'),(34,'Huevo'),(35,'Puerro'),(36,'Espinaca'),(37,'Salvado'),(38,'Centeno'),
(39,'Queso reggianito'),(40,'Berenjena'),(41,'Comino'),(42,'Curry'),(43,'Batata'),(44,'Tomate');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_status`
--

LOCK TABLES `product_status` WRITE;
/*!40000 ALTER TABLE `product_status` DISABLE KEYS */;
INSERT INTO `product_status` VALUES (1,'Activo'),(2,'Suspendido'),(3,'Eliminado'),(4,'Sin stock');
/*!40000 ALTER TABLE `product_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'PRODUCTO'),(2,'CAJA');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,'Hemingway Daiquiri',1,268,265,0,3,10,'Hemingway Daiquiri 250 ml',2,120,250,'',1),(2,2,'LA POSTA - Fazzio - MALBEC',1,645,620,5,3,18,'LA POSTA - Fazzio - MALBEC',2,200,750,'',1),(3,3,'Apostoles Ginger 354 Ml',1,496,440,8,3,10,'CONTIENE 354 ML, EL EQUIVALENTE A 2 GIN GINGERS DE FLORERÍA ATLÁNTICO CONTENIDO ALCOHÓLICO 8.8',2,130,350,'',1),(4,4,'ESCORIHUELA GASCÓN - SAUVIGNON BLANC',1,480,450,3,3,5,'ESCORIHUELA GASCÓN - SAUVIGNON BLANC',2,300,750,'',1),(5,5,'Locro casero',2,220,0,0,5,2,'Nuestra versión de un gran clásico!',2,300,400,'Locro - Receta de Alicante.pdf',1),(6,6,'AFTER OFFICE',2,1800,0,0,2,41,'After Office: Pican 4 - 6 porrones de cerveza.',4,245,1000,'',1),(7,7,'RIB BOX',2,2500,0,15,2,19,'Este box está disponible para 2 o 4 personas.',4,265,1500,'',1),(8,8,'\"Ñoquis del 29\" con salsa pomodoro (1kg)',2,354,320,0,5,49,'Los \"Ñoquis del 29\" con salsa pomodoro (1kg)',2,234,400,'Ñoquis de papa con estofado - Receta de Alicante.pdf',1),(9,9,'Tomates rellenos',2,345,0,3,5,83,'Los tomates rellenos están hechos de tomates rellenos de carne y arroz.',2,289,550,'Tomates rellenos. Deliciosos y sin TACC.pdf',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `ingredients_products`
--

LOCK TABLES `ingredients_products` WRITE;
/*!40000 ALTER TABLE `ingredients_products` DISABLE KEYS */;
INSERT INTO `ingredients_products` VALUES (1,5,18,NULL,NULL),(2,5,10,NULL,NULL),(3,5,1,NULL,NULL),(4,5,20,NULL,NULL),(5,5,2,NULL,NULL),(6,5,5,NULL,NULL),(7,5,19,NULL,NULL),(8,5,24,NULL,NULL),(9,6,18,NULL,NULL),(10,6,26,NULL,NULL),(11,6,15,NULL,NULL),(12,6,1,NULL,NULL),(13,6,19,NULL,NULL),(14,6,37,NULL,NULL),(15,6,17,NULL,NULL),(16,8,18,NULL,NULL),(17,8,15,NULL,NULL),(18,8,1,NULL,NULL),(19,8,2,NULL,NULL),(20,8,14,NULL,NULL),(21,8,27,NULL,NULL),(22,8,5,NULL,NULL),(23,8,19,NULL,NULL),(24,9,23,NULL,NULL),(25,9,1,NULL,NULL),(26,9,2,NULL,NULL),(27,9,14,NULL,NULL),(28,9,5,NULL,NULL),(29,9,19,NULL,NULL);
/*!40000 ALTER TABLE `ingredients_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'foto-12.jpg',1),(2,'foto-13.jpg',1),(3,'foto-20.jpg',2),(4,'foto-21.jpg',2),(5,'foto-30.jpg',3),(6,'foto-31.jpg',3),(7,'foto-42.jpg',4),(8,'foto-43.jpg',4),(9,'foto-54.jpg',5),(10,'foto-55.jpg',5),(11,'foto-56.jpg',5),(12,'foto-67.jpg',6),(13,'foto-68.jpg',6),(14,'foto-69.jpg',6),(15,'foto-610.jpg',6),(16,'foto-711.jpg',7),(17,'foto-712.jpg',7),(18,'foto-713.jpg',7),(19,'foto-816.jpg',8),(20,'foto-817.jpg',8),(21,'foto-918.jpg',9),(22,'foto-919.jpg',9),(23,'foto-920.jpg',9);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','admin@ichef.com','$2b$10$7wmTOptmvMBtQ.dWxXenyO8cbrvRMuWUMNk8Me5qQ0pGIbO42ppei','11111111','admin-23-06-2020.jpg',1,'2020-06-30 05:48:27','2020-06-29 20:48:27',1),(2,'jose','jose','jose@ichef.com','$2b$10$6PUC9H6bHrmrIV5Z1lIjJeRN08ZMWrtrH4RKT7G7mAj24f2OsMwLK','1234567891','jose-30-06-2020.png',4,'2020-07-01 06:14:29','2020-07-01 00:14:29',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users_categories`
--

LOCK TABLES `users_categories` WRITE;
/*!40000 ALTER TABLE `users_categories` DISABLE KEYS */;
INSERT INTO `users_categories` VALUES (1,'ADMINISTRADOR'),(2,'CHEF'),(3,'INVITADO'),(4,'USER');
/*!40000 ALTER TABLE `users_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users_status`
--

LOCK TABLES `users_status` WRITE;
/*!40000 ALTER TABLE `users_status` DISABLE KEYS */;
INSERT INTO `users_status` VALUES (1,'Activo'),(2,'Suspendido'),(3,'Bloqueado'),(4,'Dado baja');
/*!40000 ALTER TABLE `users_status` ENABLE KEYS */;
UNLOCK TABLES;