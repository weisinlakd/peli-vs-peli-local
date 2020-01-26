-- local DB: competencias
-- deploy DB: hgrNIgyZH3

USE hgrNIgyZH3;
drop TABLE IF EXISTS `votos`;
drop TABLE IF EXISTS `preguntas`;
create table IF NOT exists `preguntas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(300) NOT NULL,
  `generoId`  INT unsigned NULL ,
  `actorId`  INT unsigned NULL,
  `directorId` INT unsigned NULL,
  `fecha_baja` DATETIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`actorId`) REFERENCES hgrNIgyZH3.actor(id),
  FOREIGN KEY (`generoId`) REFERENCES hgrNIgyZH3.genero(id),
  FOREIGN KEY (`directorId`) REFERENCES hgrNIgyZH3.director(id))
ENGINE = InnoDB;

INSERT INTO `preguntas` (`nombre`)VALUE ("Cuál es la mejor película")
