-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: oficinas_db
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `automovel`
--

DROP TABLE IF EXISTS `automovel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `automovel` (
  `matricula` varchar(9) NOT NULL,
  `idCliente` bigint(20) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `modelo` varchar(20) DEFAULT NULL,
  `ano` int(11) DEFAULT NULL,
  `cor` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`matricula`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `automovel_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `automovel`
--

LOCK TABLES `automovel` WRITE;
/*!40000 ALTER TABLE `automovel` DISABLE KEYS */;
INSERT INTO `automovel` VALUES ('12-HS-98',13,'Mercedes','cle',2018,'branco'),('17-LS-64',11,'Fiat','Panda',2013,'preto'),('17-UW-00',15,'Ferrari','f12',2012,'vermelho'),('23-AA-48',1,'Audi','Q8',2018,'preto'),('25-MN-89',7,'Audi','Q1',2018,'branco'),('25-OP-45',15,'Range Rover','Evoque Sport',2019,'preto'),('34-JR-87',14,'Mercedes','cle',2015,'preto'),('45-GS-82',12,'Fiat','Uno',2015,'vermelho'),('45-LS-69',4,'BMW','M4',2014,'azul'),('48-GT-48',10,'Tesla','modelY',2020,'branco'),('48-JS-58',8,'Renault','m1',2020,'branco'),('48-SH-23',5,'BMW','M3',2016,'verde'),('57-NG-12',9,'Tesla','modelX',2021,'branco'),('84-GY-15',6,'Audi','Q1',2016,'preto'),('89-HY-12',2,'Renault','m1',2019,'Branco');
/*!40000 ALTER TABLE `automovel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idOficina` bigint(20) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `apelido` varchar(50) NOT NULL,
  `num_telefone` int(11) DEFAULT NULL,
  `carta_conducao` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idOficina` (`idOficina`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idOficina`) REFERENCES `oficina` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,1,'Misael','Fonseca',932293394,'string'),(2,2,'Paulo','Teixeira',932293394,'string'),(4,1,'Camila','Duarte',932293394,'string'),(5,1,'Ana','Luísa',932456421,'88935452'),(6,1,'José','Paulo',932241567,'83457426'),(7,1,'Carlos','Pereira',923478956,'83462345'),(8,2,'Ronaldo','Fortes',923132567,'83487253'),(9,2,'Leonardo','Torres',923624850,'83481935'),(10,2,'Maria','João',923614875,'83486138'),(11,2,'Joana','Da Luz',923520816,'83481036'),(12,3,'Eduardo','Lopes',922436872,'88345672'),(13,3,'Jorge','Almeida',922106342,'88349578'),(14,3,'Edwin','Moscolov',922428903,'88341567'),(15,3,'Ana','Catarina',922845600,'88342316'),(16,3,'Rodrigo','Ferreiro',922236871,'string'),(17,1,'Albert','Einstein',NULL,NULL),(18,1,'Fernando','Pires',932289487,'25749862');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intervencao`
--

DROP TABLE IF EXISTS `intervencao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intervencao` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idReparacao` bigint(20) NOT NULL,
  `descricao` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idReparacao` (`idReparacao`),
  CONSTRAINT `intervencao_ibfk_1` FOREIGN KEY (`idReparacao`) REFERENCES `reparacao` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intervencao`
--

LOCK TABLES `intervencao` WRITE;
/*!40000 ALTER TABLE `intervencao` DISABLE KEYS */;
INSERT INTO `intervencao` VALUES (1,1,'Revisão'),(2,2,'Mudança de pneu'),(3,3,'Revisão'),(4,3,'Mudança de amortecedores'),(5,4,'Revisão'),(6,4,'mudança de correia dentada'),(7,5,'Revisão'),(8,6,'Revisão'),(9,6,'mudança de pneu'),(10,6,'mudança de amortecedores'),(11,7,'Revisão'),(12,8,'mudança de motor'),(13,8,'mudança de velas de ignição'),(14,9,'Revisão'),(15,10,'mudança de pneu'),(16,11,'Revisão'),(17,11,'mudança de bateria'),(18,12,'Revisão'),(19,12,'mudança de óleo'),(20,13,'Revisão'),(21,13,'mudança de óleo'),(22,14,'mudança de motor'),(23,15,'Revisão'),(24,16,'Revisão'),(25,16,'mudança de pneu'),(26,16,'mudança de bateria'),(27,16,'mudança de óleo'),(28,17,'pintura'),(29,18,'Revisão');
/*!40000 ALTER TABLE `intervencao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oficina`
--

DROP TABLE IF EXISTS `oficina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oficina` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `endereco` varchar(45) NOT NULL,
  `distrito` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `num_contato` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oficina`
--

LOCK TABLES `oficina` WRITE;
/*!40000 ALTER TABLE `oficina` DISABLE KEYS */;
INSERT INTO `oficina` VALUES (1,'OFA Porto','Rua teste do testes 155','Porto','ofaporto@ofa.pt',932235678),(2,'OFA Lisboa','Rua teste do testes 25','Lisboa','ofalisboa@ofa.pt',932235679),(3,'OFA Coimbra','Rua teste do testes 45','Coimbra','ofacoimbra@ofa.pt',932235680);
/*!40000 ALTER TABLE `oficina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reparacao`
--

DROP TABLE IF EXISTS `reparacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reparacao` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idOficina` bigint(20) NOT NULL,
  `idCliente` bigint(20) NOT NULL,
  `idAutomovel` varchar(9) NOT NULL,
  `data` date NOT NULL,
  `custo` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idOficina` (`idOficina`),
  KEY `idCliente` (`idCliente`),
  KEY `idAutomovel` (`idAutomovel`),
  CONSTRAINT `reparacao_ibfk_1` FOREIGN KEY (`idOficina`) REFERENCES `oficina` (`id`),
  CONSTRAINT `reparacao_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `reparacao_ibfk_3` FOREIGN KEY (`idAutomovel`) REFERENCES `automovel` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reparacao`
--

LOCK TABLES `reparacao` WRITE;
/*!40000 ALTER TABLE `reparacao` DISABLE KEYS */;
INSERT INTO `reparacao` VALUES (1,1,1,'23-AA-48','2021-05-19',30),(2,1,1,'23-AA-48','2021-05-19',150),(3,1,4,'45-LS-69','2021-05-19',200),(4,1,5,'48-SH-23','2021-05-19',140),(5,1,6,'84-GY-15','2021-05-03',30),(6,1,7,'25-MN-89','2021-05-03',340),(7,2,8,'48-JS-58','2021-05-13',30),(8,2,9,'57-NG-12','2021-05-29',170),(9,2,10,'48-GT-48','2021-05-29',30),(10,2,11,'17-LS-64','2021-05-24',130),(11,2,2,'89-HY-12','2021-05-04',160),(12,2,2,'89-HY-12','2021-01-01',60),(13,3,12,'45-GS-82','2021-02-01',60),(14,3,13,'12-HS-98','2021-02-05',120),(15,3,14,'34-JR-87','2021-03-05',30),(16,3,15,'17-UW-00','2021-04-25',480),(17,3,15,'17-UW-00','2021-05-22',150),(18,3,15,'25-OP-45','2021-04-14',30);
/*!40000 ALTER TABLE `reparacao` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-23 17:43:17
