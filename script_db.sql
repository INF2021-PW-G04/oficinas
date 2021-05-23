use oficinas_db;

CREATE TABLE `oficina`(
	`id` bigint NOT NULL auto_increment,
    `nome` varchar(45) NOT NULL,
    `endereco` varchar(45) NOT NULL,
    `distrito` varchar(45) NOT NULL,
    `email` char(45),
    `num_contato` int,
    PRIMARY KEY (`id`)
) ENGINE InnoDB;

DROP TABLE `reparacao`;
DROP TABLE `intervencao`;
DROP TABLE `automovel`;
DROP TABLE `cliente`;

CREATE TABLE `cliente`(
	`id` bigint NOT NULL auto_increment,
    `idOficina` bigint not null,
    `nome` varchar(50) NOT NULL,
    `apelido` varchar(50) NOT NULL,
    `num_telefone` int,
    `carta_conducao` varchar(10),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idOficina`) references `oficina`(id)
) ENGINE InnoDB;

CREATE TABLE `automovel`(
	`matricula` varchar(9) NOT NULL,
    `idCliente` bigint NOT NULL,
    `marca` varchar(20) NOT NULL,
    `modelo` varchar(20),
    `ano` int,
    `cor` varchar(15),
    PRIMARY KEY (`matricula`),
    FOREIGN KEY(`idCliente`) references `cliente`(id)
) ENGINE InnoDB;

CREATE TABLE `reparacao`(
	`id` bigint NOT NULL auto_increment,
    `idOficina` bigint not null,
    `idCliente` bigint NOT NULL,
    `idAutomovel` varchar(9) NOT NULL,
    `data` date NOT NULL,
    `custo` double NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idOficina`) references `oficina`(id),
    FOREIGN KEY(`idCliente`) references `cliente`(id),
    FOREIGN KEY(`idAutomovel`) references `automovel`(matricula)
) ENGINE InnoDB;

CREATE TABLE `intervencao`(
	`id` bigint NOT NULL auto_increment,
    `idReparacao` bigint NOT NULL,
    `descricao` varchar(45) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`idReparacao`) references `reparacao`(id)
) ENGINE InnoDB;



