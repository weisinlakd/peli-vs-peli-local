USE competencias;
drop TABLE IF EXISTS `votos`;
create table IF NOT exists `votos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pregunta_id` INT NOT NULL,
  `pelicula_id` INT unsigned NOT NULL,
--   `voto` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pregunta_id`) REFERENCES competencias.preguntas(id),
  FOREIGN KEY (`pelicula_id`) REFERENCES competencias.pelicula(id)
  
  
)
ENGINE = InnoDB;

