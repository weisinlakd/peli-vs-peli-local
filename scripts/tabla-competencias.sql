USE competencias;
drop TABLE IF EXISTS `votos`;
drop TABLE IF EXISTS `preguntas`;
create table IF NOT exists `preguntas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(300) NOT NULL,
  `genero` VARCHAR(50) NULL,
  `actor` VARCHAR(75) NULL,
  `director` VARCHAR(75) NULL,
  `fecha_baja` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO `preguntas` (`nombre`)VALUES ("Cuál es la mejor película?"), 
