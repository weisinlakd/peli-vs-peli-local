USE competencias;
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
  FOREIGN KEY (`actorId`) REFERENCES competencias.actor(id),
  FOREIGN KEY (`generoId`) REFERENCES competencias.genero(id),
  FOREIGN KEY (`directorId`) REFERENCES competencias.director(id))
ENGINE = InnoDB;

INSERT INTO `preguntas` (`nombre`)VALUE ("Cuál es la mejor película")
