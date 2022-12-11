-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: quickdoc
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `creneaux`
--

DROP TABLE IF EXISTS `creneaux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creneaux` (
  `id` bigint NOT NULL,
  `creneau_date` datetime DEFAULT NULL,
  `reserve` bit(1) NOT NULL,
  `patient_id` varchar(50) DEFAULT NULL,
  `professionnel_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpejpdnfuf8ah6rkqfw1jniy4p` (`patient_id`),
  KEY `FKraqyluh0jvdod3tn35fi40fqf` (`professionnel_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creneaux`
--

LOCK TABLES `creneaux` WRITE;
/*!40000 ALTER TABLE `creneaux` DISABLE KEYS */;
INSERT INTO `creneaux` VALUES (26,'2023-01-17 17:25:00',_binary '\0',NULL,'UygD74YiJJOANkRXJgMFGxVsg7F3'),(25,'2022-12-26 05:40:00',_binary '','nQu75c93vHgLg5fFQJuj8mQ1Bkh2','2WNHPk2XyqfH2gpDwdvuCf97kwt1'),(24,'2023-01-09 04:35:00',_binary '','tGVjhg8xFdamjUrs3rXwcMa8Mxw2','2WNHPk2XyqfH2gpDwdvuCf97kwt1'),(23,'2022-12-17 15:29:00',_binary '','nQu75c93vHgLg5fFQJuj8mQ1Bkh2','2WNHPk2XyqfH2gpDwdvuCf97kwt1'),(22,'2022-12-19 08:14:00',_binary '\0',NULL,'mmCoa49knxXlxWPSFgLWspSgdNw2'),(21,'2022-12-25 07:15:00',_binary '','tGVjhg8xFdamjUrs3rXwcMa8Mxw2','mmCoa49knxXlxWPSFgLWspSgdNw2'),(7,'2022-12-15 18:30:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(8,'2022-12-16 18:30:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(19,'2022-12-20 06:18:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(11,'2022-12-16 08:30:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(12,'2022-12-16 10:30:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(13,'2022-12-16 16:30:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(14,'2022-12-16 17:30:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(15,'2022-12-14 06:19:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(16,'2022-12-22 03:35:00',_binary '\0',NULL,'fINOuFFtkTTSlCCuhyE98AEHP7y1'),(27,'2022-12-21 06:30:00',_binary '','blanCYkL5hXrgdIU4B1Ru2THBk73','UygD74YiJJOANkRXJgMFGxVsg7F3'),(20,'2022-12-14 04:29:00',_binary '\0',NULL,'mmCoa49knxXlxWPSFgLWspSgdNw2'),(28,'2023-01-09 05:16:00',_binary '\0',NULL,'UygD74YiJJOANkRXJgMFGxVsg7F3'),(29,'2022-12-14 04:31:00',_binary '','tGVjhg8xFdamjUrs3rXwcMa8Mxw2','kddJacqDkCYM3g6LYRr0ANuPlD43'),(30,'2023-01-03 16:30:00',_binary '\0',NULL,'kddJacqDkCYM3g6LYRr0ANuPlD43'),(31,'2022-12-16 14:25:00',_binary '','nQu75c93vHgLg5fFQJuj8mQ1Bkh2','kddJacqDkCYM3g6LYRr0ANuPlD43');
/*!40000 ALTER TABLE `creneaux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (32);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES ('1','real2@gmail.com','nom1','realpassword','prenom1','patient'),('HccazRBwwGMFHLZY3lFIkKkveSi2','goiengioeg@gmail.com','geiogneiog',NULL,'eginegon','patient'),('M9wO76sHZ5Uo89eiUmFKKiq5GzM2','igniogh@gmail.Com','eifiege',NULL,'g,pgo,e','patient'),('2zg3uN1txnhW8PVSWyVVNl3Eg8S2','elkghneklgn@gmail.Com','gnrgln',NULL,'ghgklnkl','patient'),('rQFEN8rWbnM92mmZkYb1jHNUxm32','mom@gmail.Com','oifoiengfe',NULL,'goiengon','patient'),('tGVjhg8xFdamjUrs3rXwcMa8Mxw2','1@gmail.com','1',NULL,'efg,efiop,','patient'),('nQu75c93vHgLg5fFQJuj8mQ1Bkh2','rhgrhr@gmail.com','ohtpo',NULL,'pohhpo','patient'),('YfoJxySvdzdUF3UisgdY49I6na93','ogineogi@gmail.com','gegio',NULL,'geiogneoi','patient'),('blanCYkL5hXrgdIU4B1Ru2THBk73','gogpoie@gmail.Com','epoekgope',NULL,'egopepog','patient');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professionnels`
--

DROP TABLE IF EXISTS `professionnels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professionnels` (
  `id` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `horaire` varchar(255) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professionnels`
--

LOCK TABLES `professionnels` WRITE;
/*!40000 ALTER TABLE `professionnels` DISABLE KEYS */;
INSERT INTO `professionnels` VALUES ('s5poanR4oWg6Y8hNaxtlDKA2fAE3',NULL,'gioghj\'io',NULL,'hgiornhio','reoihnoih',NULL,'hionrhoin','ehoinrhoi',NULL),('tciB3w5Rvdc0lXuO4Z6Nw3dk0ig2',NULL,'gpoejgope',NULL,'egpojegop','geoigneog',NULL,'eoghingihone','eghoingheoi',NULL),('rAyQAMCS2wZHN6V8FQ4b2MMw2Sw2','gineogin@gmail.com','bopf,bhg,r',NULL,'gpoengoi','eiohgeioghne','eoineoihgnehoi','biohneghoinz','hioenghouie','professionnel'),('lVTRZ2jUHaeLSv02kc5AzN6Apa63','momafeg@gmail.com','Momar',NULL,'TOURE','ekbfefef','egoibegouebge','Médecin généraliste','0464134','professionnel'),('lUJrEeWqKLdABqECYWBjjrQdQ8O2','œoiergnoiun@gmail.com','ihroginj',NULL,'oeihgnioeung','eohnoinzoighneoin','gehoinehgoinegh','eioneoign','heroighneoihgn','professionnel'),('2d36Lw7NH1hqYd5wN1hihj660Yn2','geroighnoin@gmai.com','iongriuognbh',NULL,'ienghioeng','ezogngoin','ezgoinegoinegoieng','gioengoin','eognegoin','professionnel'),('LeXfqnNepXSXg55wwkwX2aqgVr22','hinrhoinre@gmail.com','qfgpoejgier',NULL,'epiohg,eripoœ','ehpoer,hpoirnh','ehoinrhoinhgiorh','epho,eipohn','œhpo,rhpo,r','professionnel'),('pENXKfmOI1MYmEy9vDKUs6C0c342','rohinroi@gma.com','fipoengione',NULL,'eoihgneroin','ghzehehezh','ehgzhheheh','gegegehgze','ehzhzehzehez','professionnel'),('R3pRlzGgxuXPUs1kOwVlTmt7w2w2','momarfaly@gmail.com','Momar ',NULL,'TOURE','Paris, France','Lundi - Vendredi : 08h-18h','Chirurgien orthopédiste','071716489984','professionnel'),('veTWiT724mOeQckpqx71sf4aDTQ2','igfneoigneg@gmail.Com','TOURE',NULL,'Momar','eoihnehogni','oirhneoihnih','iogneouginoi','ehgoingio','professionnel'),('Cer7ubam7NVdYpUYVGoZWaGdRT63','goigehoin@gmail.com','fneiongf',NULL,'egojneriug','hgiorehoin','eghinghiouneghionhhg','egoiengi','hoinoin','professionnel'),('9K7UWpP0SHgypkWek04BtEnPFGW2','egineghoin@gmail.com','pogjegp',NULL,'eogin,rin','zeogineghoin','zegoiengoig','eoigneoign','eognegoin','professionnel'),('VfED9X2B3fhghszYEw5LZPpP1to2','egoiengio@gmail.com','gjgjriogj',NULL,'eginegoin','GIUBGHIUEBGU','EUIGBEIUGBEGEG','eiugbeiugbeiu','eguibeguib','professionnel'),('ohNh8sPOlMY8Smqid5183ijxLy33','egoineghon@gmail.Com','fgioregnio',NULL,'eohginghion','ezoignzoginoingezoihgn','aehgoinzhgonegionegh','iengoiengoi','eohginzegoinio','professionnel'),('up46xpFsEieNxyDR3NHHdSCVTu42',NULL,'Momar',NULL,'TOURE','paRIS','FFLEFEGEGEG','Medecin','076915262','professionnel'),('t5kWCP1cPabUmiUx8JqibDL2ow52','egoineogine@gmail.com','epiogfepoi',NULL,'eiogneoiung','egoinegoin','egoinegoinegioeg','eoigneiognegoin','ezgoiegoin','professionnel'),('AAeY9jjjLCVxP0T2df9jwF8TXFK2','egoineogine@gmail.com','epiogfepoi',NULL,'eiogneoiung','egoinegoin','egoinegoinegioeg','eoigneiognegoin','ezgoiegoin','professionnel'),('SZCa6PsiK7fdsOc6b4R7iuL7F8h2','hopg@gmail.Com','gporpogh',NULL,'eogp,egpo','aiogneoihgoi','eoighneoighneoghn','eoihneghoin','ehnoinoihne','professionnel'),('NyCYEOoxu5ZhfDP833ajluhmPYn1','eopegeg@gmail.com','eegheig',NULL,'egpo,epog,','ohinehion','ehoinehioneh','eiohgneghoin','ehgoineghoin','professionnel'),('9teSml6slvS2tCR3fphRlI1Wf2t1','eopegeg@gmail.com','eegheig',NULL,'egpo,epog,','ohinehion','ehoinehioneh','eiohgneghoin','ehgoineghoin','professionnel'),('MFENKkKrl1V78SOg25rpQzZ4e583','ehinehg@gmail.Com','fepog',NULL,'hgieoihgn','eoghineghoin','eohgineoihgnehg','eoginegoin','erhoinegion','professionnel'),('irSyvI144mYNqZGqYoSDuaeVs7g1','geegg@gmail.com','geopop,',NULL,'pgo,egpo,','eghneghoin','giengoienegh','egjegpoj','gioeoing','professionnel'),('fINOuFFtkTTSlCCuhyE98AEHP7y1','mom@gmail.Com','TOURE',NULL,'Momar','6, rue de rivoli, Paris','Lundi - Vendredi: 8h - 10h','Médecin généraliste','07070707','professionnel'),('mmCoa49knxXlxWPSFgLWspSgdNw2','a@gmail.com','ggiub',NULL,'egubiug','Paris, France','Lundi','Médecin généraliste','000000','professionnel'),('2WNHPk2XyqfH2gpDwdvuCf97kwt1','b@gmail.com','bbb',NULL,'Momar','rue des pépinières, 94400','Lundi - Vendredri','Chirurgien','000000','professionnel'),('UygD74YiJJOANkRXJgMFGxVsg7F3','c@gmail.com','Jean',NULL,'David','Paris, France','Lundi - Vendredi: 9h-18h','Dentiste','0000000','professionnel'),('kddJacqDkCYM3g6LYRr0ANuPlD43','d@gmail.com','Dupont',NULL,'Marguerite','Paris, FRance','Mardi','Orthopédiste','00000','professionnel'),('tKffzBKJviMhDqg6N7Xz14J5JTB2','uiguog@gmail.com','yffiyuiuf',NULL,'ugigui','utvto','ioytioyi','uvyr','yuryuirv','professionnel');
/*!40000 ALTER TABLE `professionnels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-11 20:11:10
