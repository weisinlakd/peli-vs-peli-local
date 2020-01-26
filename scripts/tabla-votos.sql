-- local DB: competencias
-- deploy DB: hgrNIgyZH3
USE hgrNIgyZH3;
drop TABLE IF EXISTS `votos`;
create table IF NOT exists `votos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pregunta_id` INT NOT NULL,
  `pelicula_id` INT unsigned NOT NULL,
--   `voto` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pregunta_id`) REFERENCES hgrNIgyZH3.preguntas(id),
  FOREIGN KEY (`pelicula_id`) REFERENCES hgrNIgyZH3.pelicula(id)
  
  
)
ENGINE = InnoDB;

