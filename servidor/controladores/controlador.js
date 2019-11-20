var con = require('../lib/conexionbd');

function validacion (nombre, genero, director, actor) {

    if (nombre == undefined) {
        return; 
    }

    var sql =  ` insert into preguntas (nombre) value ('${nombre}') `; //solo nombre

    if (genero == undefined) {
        sql = ` insert into preguntas (nombre) value ('${nombre}') `; 
        
        if (director == undefined) {

            if (actor == undefined){

            } else {
                sql = ` insert into preguntas (nombre, actor) value ('${nombre}', '${actor}') `;
            }

        } else {

            sql = ` insert into preguntas (nombre, director) value ('${nombre}', '${director}') `;

                if (actor == undefined){

                } else {
                    sql = ` insert into preguntas (nombre, actor , director) value ('${nombre}', '${actor}' , '${director}) `;
                }
        }

    } else {

        sql = ` insert into preguntas (nombre, genero) value ('${nombre}', '${genero}') `;

        if (director == undefined) {

            if (actor == undefined){

            } else {
                sql = ` insert into preguntas (nombre, genero, actor) value ('${nombre}', '${genero}' ,'${actor}') `;
            }

        } else {

            sql = ` insert into preguntas (nombre, genero, director) value ('${nombre}', '${genero}', '${director}') `;

                if (actor == undefined){

                } else {
                    sql = ` insert into preguntas (nombre, genero, director, actor) value ('${nombre}', '${genero}' ,'${director}', '${actor}') `;
                }
        }
            
            
    }

    console.log(sql, "<==== SQL VALIDACION")
    return sql 
}


function validarObtener (genero, director, actor){

    var validar = {
        genero: false,
        director: false,
        actor: false
    }

    if ((genero != undefined) && genero != 0){
        validar.genero = genero;
    }

    if (director != undefined && director != 0){
        validar.director = director;
    }

    if (actor != undefined && actor != 0){ 
        validar.actor = actor;
    }

    return validar
    
}

function crearQuery(objeto) {
    var sql = 'SELECT * FROM pelicula ';
    var where = ' where '
    var and = ' and '
    var finalSql = 'ORDER BY RAND() LIMIT 2';
    var query = ''
    var actor = ` join actor_pelicula on pelicula.id = actor_pelicula.pelicula_id join actor on actor_pelicula.actor_id = actor.id `
    
    if (objeto.genero) {

        query = where + `genero_id = ${objeto.genero} `

        if (objeto.director) {
            
            query + and + `director = '${objeto.director}' `

            if  (objeto.actor) {

                query = actor + query + and + ` actor.id = ${objeto.actor} `;
            } else {

            }

            
        } else {
            if (objeto.actor) {

                query = actor + query + and + ` actor.id = ${objeto.actor} `
            } else {

            }
        }
    } else { // no hay genero

        if (objeto.director) {
            
            query = where + `director = '${objeto.director}' `

            if  (objeto.actor) {

                query = actor + query + and + ` actor.id = ${objeto.actor} `;
            } else {

            }

            
        } else { // no hay genero ni director

            if (objeto.actor) {

                query = actor + query + and + ` actor.id = ${objeto.actor} `;
            } else {

            }
        }

    } 

    if (objeto.actor) {
        return 'select *, actor.id as actor_id, pelicula.id as id from pelicula ' + query + finalSql;
    }
    return sql + query + finalSql;
}




function obtenerPreguntas (req, res){

    
    //
    var sql = "select * from preguntas where fecha_baja is NULL";
    //
    
    
    //se ejecuta la consulta
    con.query(sql, function(error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta.", error.message);
            return res.status(404).send("Hubo un error en la consulta.");
        }
        console.log(sql)
        respuesta = {
            'preguntas': resultado
        };
        //se envía la respuesta
        res.send(JSON.stringify(respuesta.preguntas));
        console.log(respuesta);
    });

}

function obtenerOpciones (req, res) {

    var id = req.params.id 
    console.log(req.params, '<= id')


    
    
    con.query(`select * from preguntas where id=${id} and fecha_baja is null`, function(error, resultado, fields){
        if (error) {
            console.log("No existe esa pregunta", error.message);
            return res.status(404).send("No existe esa pregunta");
        }
        if (resultado.length==0) {
            return res.status(404).send("No existe esa pregunta");
        }

        competencia = resultado[0]
        console.log(competencia, "competencia dentro del callback")

        var objetoValidacion = validarObtener(competencia.genero, competencia.director, competencia.actor)

        console.log(objetoValidacion, "<========== objeto validacion")

        var sql = crearQuery(objetoValidacion);

        console.log(sql, '<=========== QUERY RESULTADO')

        con.query(sql, function(error, resultado, fields){

            if (error) {
                console.log("Hubo un error en la consulta.", error.message);
                return res.status(404).send("Hubo un error en la consulta.");
            }

            if (resultado.length == 0 ){
                return res.status(404).send("No hay películas que coincidan con estos parámetros");
            }
            console.log(sql, "sql con director y genero")
            opciones = {
                'peliculas': resultado,
                'competencia': competencia.nombre 
            }
        
            res.send(JSON.stringify(opciones));
            console.log(opciones);
        })

    })
    
    
}



function manejarVoto (req, res) {
    
    var idPregunta = req.params.id;
    var peliculaVotada = req.body.idPelicula
    console.log(req.params)
    console.log(idPregunta, "<= idPRegunta")
    console.log(peliculaVotada, "<= peliculaVotada")

    var sql = `insert into votos (pregunta_id, pelicula_id) values (${idPregunta},${peliculaVotada})`

    con.query(`select * from preguntas where id=${idPregunta} and fecha_baja is null`, function(error, resultado, fields){
        if (error) {
            console.log("No existe esa pregunta.", error.message);
            return res.status(404).send("No existe esa pregunta.");
        }
        if (resultado.length==0) {
            return res.status(404).send("No existe esa pregunta.");
        }

        
    })

    con.query(`select * from pelicula where id=${peliculaVotada}`, function(error, resultado, fields){
        if (error) {
            console.log("No existe esa película.", error.message);
            return res.status(404).send("No existe esa película.");
        }
        if (resultado.length==0) {
            return res.status(404).send("No existe esa película.");
        }

        
    })

    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error en la consulta.", error.message);
            return res.status(404).send("Hubo un error en la consulta.");
        }

        respuesta = {
            resultado
        }
        
        res.send(JSON.stringify(respuesta));
        console.log(respuesta);
    })


}

function obtenerResultados (req, res) {

    

    var idPregunta =  req.params.id;

    var sql = ` 
    select titulo, anio, duracion, genero_id, pelicula.director, fecha_lanzamiento, puntuacion, 
    poster, trama, genero_string, preguntas.nombre, pelicula.id as peli_id, preguntas.id as pregunta, count(votos.id) as votos from pelicula 
    join votos on pelicula.id = pelicula_id join preguntas on preguntas.id = pregunta_id where preguntas.id = ${idPregunta}
    group by pelicula.titulo, anio, duracion, genero_id, director, fecha_lanzamiento, puntuacion, 
    poster, trama, genero_string, preguntas.nombre, peli_id order by votos desc `;

    console.log(sql, "<=== SQL RESULTADOS")
    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error en la consulta.", error.message);
            return res.status(404).send("Hubo un error en la consulta.");
        }

        respuesta = {
            resultados: resultado,
            competencia: resultado[0].nombre
        }
        
        res.send(JSON.stringify(respuesta));
        console.log(respuesta);
    })

}




function crearCompetencia (req, res) {

    console.log(req.body, "<= req.body de crearCompetencia")

    var nombre =  req.body.nombre;
    var genero =  req.body.genero;
    var director = req.body.director;
    var actor = req.body.actor;   

    
    // var sql = crearQuery( {
    //     genero,
    //     director,
    //     actor
    // })

    var sqlInsert = validacion(nombre, genero, director, actor);

    var objeto = validarObtener(genero,director,actor);

    var sql = crearQuery(objeto);
    

    con.query(`select * from preguntas where nombre like '${nombre}' and fecha_baja is null`, function (error, resultado, fields) {
            if (error) {
                console.log("Hubo un error en la consulta.", error.message);
                return res.status(404).send("Hubo un error en la consulta.");
            }
            if ((resultado.length > 0)) {
                return res.status(422).send("Ya existe esta pregunta.");
            }

            else{
                con.query(sql, function (error, resultado, fields){
                    if (error) {
                        console.log("Hubo un error en la consulta.", error.message);
                        return res.status(404).send("Hubo un error en la consulta.");
                    }

                    if (resultado.length >=2) {
                        con.query(sqlInsert, function(error, resultado, fields){
                
                
                            // competencia = resultado;
            
                            // console.log(competencia, "<========================================= competencia") 
                            
                            console.log(sqlInsert, "sql dentro de la wea")
                            if (error) {
                                console.log("Hubo un error en la consulta.", error.message);
                                return res.status(404).send("Hubo un error en la consulta.");
                            }
            
                            respuesta = {
                                resultado
                            }
                            
                            res.send(JSON.stringify(respuesta));
                            console.log(respuesta);
                        })
                    }

                    else {
                        return res.status(422).send('No hay suficientes opciones que cumplan estos requisitos.')
                    }
                })
            }

            
            
            
    })  

   

}

function borrarVotos (req,res){

    var id = req.params.id;
    //ALGO ESTA BORRANDO LA PREGUNTA
    var sql = ` 
    delete from votos where pregunta_id =  ${id} `
    
    con.query(`select * from preguntas where id=${id} and fecha_baja is null`, function(error, resultado, fields){

        console.log(resultado, "<== resultado")
        if (error) {
            console.log("Hubo un error al borrar los votos.", error.message);
            return res.status(404).send("Hubo un error al borrar los votos.");
        }
        
        if (resultado.length == 0) {
            return res.status(404).send("No exista la pregunta que se intenta borrar.");
        }

        else {

            con.query(sql, function(error, resultado, fields){
                if (error) {
                    console.log("Hubo un error al borrar los votos.", error.message);
                    return res.status(404).send("Hubo un error al borrar los votos.");
                }
        
                // else {
                //     con.query(`delete from preguntas where preguntas.id =${id}`, function(error, resultado, fields){
                        respuesta = {
                                    resultado,
                        }
                        res.send(JSON.stringify(respuesta));

                //     })
                // }
                
                
                
            })
        }

    })

    
}

function obtenerGeneros (req, res) {

    

    con.query('select * from genero', function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error al obtener los géneros.", error.message);
            return res.status(404).send("Hubo un error al obtener los géneros.");
        }

        else {
            respuesta = resultado
            res.send(JSON.stringify(respuesta));
            console.log(respuesta)
        }
    })
}


function obtenerDirectores (req, res) {

    

    con.query('select * from director', function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error al obtener los directores.", error.message);
            return res.status(404).send("Hubo un error al obtener los directores.");
        }

        else {
            respuesta = resultado
            res.send(JSON.stringify(respuesta));
            console.log(respuesta)
        }
    })
}


function obtenerActores (req, res) {

    

    con.query('select * from actor', function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error al obtener los actores.", error.message);
            return res.status(404).send("Hubo un error al obtener los actores.");
        }

        else {
            respuesta = resultado
            res.send(JSON.stringify(respuesta));
            console.log(respuesta)
        }
    })
}

function borrarCompetencia (req, res){

    var id = req.params.id;

    var sql = `update preguntas set fecha_baja = now() where id = ${id}`;
    
    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error al borrar la pregunta.", error.message);
            return res.status(404).send("Hubo un error al borrar la pregunta.");
        }

        else {
            respuesta = resultado
            res.send(JSON.stringify(respuesta));
            console.log(respuesta)
        }
    })
}

function buscarCompetenciaPorId (req,res){

    var id = req.params.id;

  
    var sql = `select * from preguntas where id = ${id} and fecha_baja is null`

    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error al buscar la competencia.", error.message);
            return res.status(404).send("Hubo un error al buscar la competencia.");
        }

        if (resultado.length == 0) {
            return res.status(404).send("No se encontró la competencia.");
        }

        else {
            respuesta = resultado[0]
            res.send(JSON.stringify(respuesta));
            console.log(respuesta, '<==== RESPUESTA')
        }
    })
}

function editarCompetencia (req, res) {
    console.log(req, "<===== req")

    var id = req.params.id;

    var nombre = req.body.nombre;

    console.log (id, nombre, "id y nombre");

    var sql = ` update preguntas set nombre = '${nombre}' where id = ${id} `

    con.query(sql, function(error, resultado, fields){
        if (error) {
            console.log("Hubo un error al editar la competencia.", error.message);
            return res.status(404).send("Hubo un error al editar la competencia.");
        }

        if (resultado.length == 0) {
            return res.status(404).send("No se encontró la competencia.");
        }

        else {
            respuesta = resultado[0]
            res.send(JSON.stringify(respuesta));
            console.log(respuesta, '<==== RESPUESTA')
        }
    })
}


module.exports = {
    obtenerPreguntas, 
    obtenerOpciones,
    manejarVoto,
    obtenerResultados,
    crearCompetencia,
    borrarVotos,
    obtenerGeneros,
    obtenerDirectores,
    obtenerActores,
    borrarCompetencia,
    buscarCompetenciaPorId,
    editarCompetencia
    
}