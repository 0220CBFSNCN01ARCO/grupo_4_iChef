USE `ichef`;

--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Admin', 'Admin', 'admin@ichef.com', '$2b$10$7wmTOptmvMBtQ.dWxXenyO8cbrvRMuWUMNk8Me5qQ0pGIbO42ppei', '11111111', 'admin-23-06-2020.jpg', '1');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Arcor'),(2,'Alicante'),(3,'Aquarius'),(4,'Andresito'),(5,'Baggio'),(6,'Bagley'),(7,'BC'),(8,'Bimbo'),(9,'Bonafide'),(10,'Branca'),(11,'Cabrales'),(12,'Cabsha'),(13,'Campo Austral'),(14,'Canale'),(15,'Casalta'),(16,'CasanCrem'),(17,'CBSé'),(18,'Cepita'),(19,'Cereal Mix'),(20,'Cerealitas'),(21,'Chocoarroz'),(22,'Chocolinas'),(23,'Cica'),(24,'Citric'),(25,'Clight'),(26,'Coca-Cola'),(27,'Cocinero'),(28,'Cruz De Malta'),(29,'Dánica'),(30,'Dimax'),(31,'Don Felipe'),(32,'Don Satur'),(33,'Doritos'),(34,'Dos Anclas'),(35,'Dos Hermanos'),(36,'Egran'),(37,'Ensure'),(38,'Equal Sweet'),(39,'Esnaola'),(40,'Exquisita'),(41,'Fargo'),(42,'Fantoche'),(43,'Favorita'),(44,'Ferrero Rocher'),(45,'Firenze'),(46,'Finlandia'),(47,'Gallo'),(48,'Gatorade'),(49,'Grandiet'),(50,'Grandote'),(51,'Green Hills'),(52,'Green Life'),(53,'Hellmann\'s'),(54,'Heinz'),(55,'Herbalife'),(56,'Hileret'),(57,'Inalpa'),(58,'Inca'),(59,'Ivess'),(60,'Jorgito'),(61,'Kinder'),(62,'Knorr'),(63,'Kraft'),(64,'La Cabaña'),(65,'La Campagnola'),(66,'La Casona'),(67,'La Italiana'),(68,'La Morenita'),(69,'La Merced'),(70,'La Lácteo'),(71,'La Paulina'),(72,'La Salteña'),(73,'La Virginia'),(74,'Levite'),(75,'Lucchetti'),(76,'Maizena'),(77,'Manfrey'),(78,'Marolio'),(79,'Matarazzo'),(80,'McCain'),(81,'Milka'),(82,'Molto'),(83,'Natura'),(84,'Nescafé'),(85,'Nestlé'),(86,'Nido'),(87,'Oblita'),(88,'Opera'),(89,'Orieta'),(90,'Ottonello'),(91,'Paladini'),(92,'Paty'),(93,'Pepsi'),(94,'Powerade'),(95,'Pritty'),(96,'Pureza'),(97,'Quaker'),(98,'Quilmes'),(99,'Red Bull'),(100,'Rosamonte'),(101,'Royal'),(102,'Sabores Del Valle'),(103,'San Alfonso'),(104,'Santa Brigida'),(105,'Santa Rosa'),(106,'Stella Artois'),(107,'Tapalque'),(108,'Terma'),(109,'Tholem'),(110,'Tía Maruca'),(111,'Vanoli'),(112,'Vegetalex'),(113,'Veneziana'),(114,'Vieníssima'),(115,'Villavicencio'),(116,'Windy'),(117,'Wonka'),(118,'Yogurísimo'),(119,'Yin Yang'),(120,'Yatasto'),(121,'Zucoa'),(122,'Zuko');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `heading`
--

LOCK TABLES `heading` WRITE;
/*!40000 ALTER TABLE `heading` DISABLE KEYS */;
INSERT INTO `heading` VALUES (1,'Alimentos Congelados'),(2,'Almacén'),(3,'Bebidas con Alcohol'),(4,'Bebidas sin Alcohol'),(5,'Frescos');
/*!40000 ALTER TABLE `heading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Carne vacuna'),(2,'Cebolla'),(3,'Limón'),(4,'bicarbonato'),(5,'pimienta negra'),(6,'cilantro'),(7,'tomillo'),(8,'romero'),(9,'Pechuga de pollo'),(10,'Bondiola de cerdo'),(11,'salsa teriyaki'),(12,'manteca'),(13,'zanahoria'),(14,'morrón rojo/verde/amarillo'),(15,'albahaca fresca'),(16,'nuez moscada'),(17,'semillas de girasol'),(18,'aceite de girasol'),(19,'sal fina'),(20,'Carré de cerdo'),(21,'batter'),(22,'avena'),(23,'arroz carnaroli'),(24,'zapallo cabutia,'),(25,'queso parrillero tipo provoleta'),(26,'ajo'),(27,'papa'),(28,'Crema'),(29,'leche entera'),(30,'salsa mediterránea'),(31,'harina 0000'),(32,'harina de centeno'),(33,'queso porsalut'),(34,'huevo'),(35,'puerro'),(36,'Espinaca'),(37,'salvado'),(38,'centeno'),(39,'queso reggianito'),(40,'berenjena'),(41,'comino'),(42,'curry'),(43,'batata');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users_categories`
--

LOCK TABLES `users_categories` WRITE;
/*!40000 ALTER TABLE `users_categories` DISABLE KEYS */;
INSERT INTO `users_categories` VALUES (1,'ADMINISTRADOR'),(2,'CHEF'),(3,'INVITADO'),(4,'CLIENTE');
/*!40000 ALTER TABLE `users_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'PRODUCTO'),(2,'CAJA');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;