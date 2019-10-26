-- DROP IF EXIST DATABASE
DROP DATABASE IF EXISTS Proyecto1;

-- CREATE DATABASE
CREATE DATABASE Proyecto1;

-- USE DATABASE
USE Proyecto1;

-- CREATE TABLE TYPE OF USER
CREATE TABLE TipoUsuario(
	idTipoUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	descripcion VARCHAR(100) NULL
);

-- CREATE TABLE USER
CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	carnet BIGINT NULL,
	dpi BIGINT NULL,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(255) NOT NULL,
	nombre VARCHAR(100) NULL,
	apellido VARCHAR(100) NULL
);

-- CREATE TABLE DETAIL USER
CREATE TABLE DetalleUsuario(
    idDetalleUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idTipoUsuario INT NOT NULL,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idTipoUsuario) REFERENCES TipoUsuario(idTipoUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);
-- CREATE TABLE CURSE
DROP TABLE IF EXISTS Curso;
CREATE TABLE Curso(
	idCurso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NULL,
	codigo VARCHAR(50) NULL,
	estado TINYINT NOT NULL
);

-- CREATE TABLE SECCION
DROP TABLE IF EXISTS Seccion;
CREATE TABLE Seccion(
	idSeccion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(10) NULL
);

-- CREATE TABLE DETAIL CURSE
DROP TABLE IF EXISTS DetalleCurso;
CREATE TABLE DetalleCurso(
    idDetalleCurso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    semestre VARCHAR(50) NULL,
	anio VARCHAR(50) NULL,
	horaInicio VARCHAR(50) NULL,
	horaFin VARCHAR(50) NULL,
    fechaFin DATETIME NOT NULL,
    idCurso INT NOT NULL,
    idSeccion INT NOT NULL,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idSeccion) REFERENCES Seccion(idSeccion)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE ASIGNAMENT AUXILIAR
DROP TABLE IF EXISTS AsignacionAuxiliar;
CREATE TABLE AsignacionAuxiliar(
    idAsignacionAuxiliar INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idDetalleCurso INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idDetalleCurso) REFERENCES DetalleCurso(idDetalleCurso)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE ASIGNAMENT AUXILIAR
DROP TABLE IF EXISTS AsignacionEstudiante;
CREATE TABLE AsignacionEstudiante(
    idAsignacionEstudiante INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idAsignacionAuxiliar INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idAsignacionAuxiliar) REFERENCES AsignacionAuxiliar(idAsignacionAuxiliar)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE MESSAGES
DROP TABLE IF EXISTS Mensaje;
CREATE TABLE Mensaje(
    idMensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    emisor INT NOT NULL,
    receptor INT NOT NULL,
    asunto VARCHAR(255) NOT NULL,
    FOREIGN KEY (emisor) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (receptor) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE MESSAGES
DROP TABLE IF EXISTS DetalleMensaje;
CREATE TABLE DetalleMensaje(
    idDetalleMensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idMensaje INT NOT NULL,
    cuerpo VARCHAR(255) NOT NULL,
    archivo BLOB NULL,
    FOREIGN KEY (idMensaje) REFERENCES Mensaje(idMensaje)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE RESPUESTA MENSAJE
DROP TABLE IF EXISTS RespuestaMensaje;
CREATE TABLE RespuestaMensaje(
    idRespuestaMensaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idMensaje INT NOT NULL,
    emisor VARCHAR(255) NOT NULL,
    receptor VARCHAR(255) NOT NULL,
    cuerpo VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    archivo BLOB NULL,
    FOREIGN KEY (idMensaje) REFERENCES Mensaje(idMensaje)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);



-- CREATE TABLE FORO
DROP TABLE IF EXISTS Foro;
CREATE TABLE Foro(
    idForo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    hora DATETIME NOT NULL,
	idAsignacionAuxiliar INT NOT NULL,
	FOREIGN KEY (idAsignacionAuxiliar) REFERENCES AsignacionAuxiliar(idAsignacionAuxiliar)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- CREATE TABLE DETAIL FORO
DROP TABLE IF EXISTS DetalleForo;
CREATE TABLE DetalleForo(
    idDetalleForo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comentario VARCHAR(250) NOT NULL,
	idUsuario INT NOT NULL,
	idForo INT NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
	FOREIGN KEY (idForo) REFERENCES Foro(idForo)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);




-- CREATE TABLE DETAIL ACTIVIDAD
DROP TABLE IF EXISTS Actividad;
CREATE TABLE Actividad(
    idActividad INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idAsignacionAuxiliar INT NOT NULL,
	nombre VARCHAR(250) NOT NULL,
    horaLimite VARCHAR(250) NOT NULL,
    fechaLimite VARCHAR(250) NOT NULL,
    ponderacion INT NOT NULL,
    conArchivo INT NULL,
	FOREIGN KEY (idAsignacionAuxiliar) REFERENCES AsignacionAuxiliar(idAsignacionAuxiliar)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- LA TABLA LE ASIGNA LA ACIVIDAD A LOS ALUMNOS

DROP TABLE IF EXISTS ActividadAlumno;
CREATE TABLE ActividadAlumno(
    idActividadAlumno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idAlumno INT NOT NULL,
    idActividad INT NOT NULL,
    entregada INT NOT NULL,
    archivo BLOB NULL,
	FOREIGN KEY (idActividad) REFERENCES Actividad(idActividad)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idAlumno) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);


-- EVALUACIONES

DROP TABLE IF EXISTS Evaluacion;
CREATE TABLE Evaluacion(
    idEvaluacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    idAsignacionAuxiliar INT NOT NULL,
    FOREIGN KEY (idAsignacionAuxiliar) REFERENCES AsignacionAuxiliar(idAsignacionAuxiliar)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE IF EXISTS DetalleEvaluacion;
CREATE TABLE DetalleEvaluacion(
    idDetalleEvaluacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idEvaluacion INT NOT NULL,
    activado INT NOT NULL,
    aleatorio INT NOT NULL,
    ponderacion INT NOT NULL,
    FOREIGN KEY (idEvaluacion) REFERENCES Evaluacion(idEvaluacion)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);
-- EVALUACION FALSO Y VERDADERO
DROP TABLE IF EXISTS EvaluacionVF;
CREATE TABLE EvaluacionVF(
    idEvaluacionVF INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idDetalleEvaluacion INT NOT NULL,
    pregunta VARCHAR(250) NOT NULL,
    respuesta INT NOT NULL,
    tipo  VARCHAR(250) NOT NULL,
    FOREIGN KEY (idDetalleEvaluacion) REFERENCES DetalleEvaluacion(idDetalleEvaluacion)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- EVALUACION SELECCION MULTIPLE
DROP TABLE IF EXISTS EvaluacionSM;
CREATE TABLE EvaluacionSM(
    idEvaluacionSM INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idDetalleEvaluacion INT NOT NULL,
    pregunta VARCHAR(250) NOT NULL,
    respuesta1 VARCHAR(250) NOT NULL,
    respuesta2  VARCHAR(250) NOT NULL,
    respuesta3  VARCHAR(250) NOT NULL,
    tipo  VARCHAR(250) NOT NULL,
    correcta VARCHAR(250) NOT NULL, -- Va a recibir la misma respuesta que se seleccione como correcta
    FOREIGN KEY (idDetalleEvaluacion) REFERENCES DetalleEvaluacion(idDetalleEvaluacion)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- A ESTA TABLA VA A LLEGAR QUE EVALUACION SE RESOLVIO Y QUE ALUMNO LA RESOLVIO
DROP TABLE IF EXISTS EvaluacionAlumno;
CREATE TABLE EvaluacionAlumno(
    idEvaluacionAlumno INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idEvaluacion INT NOT NULL,
    idUsuario INT NOT NULL,
    punteo INT NOT NULL,
    FOREIGN KEY (idEvaluacion) REFERENCES Evaluacion(idEvaluacion)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);


	


-- SP  CREAR Asignacion de estudiante
DELIMITER $$
CREATE PROCEDURE SP_CreateAsignacionEstudiante
(IN _idAsignacionAuxiliar INT, IN _idUsuario INT)
BEGIN
	DECLARE _existe INT;
    DECLARE _fechaFin DATETIME;
    DECLARE _tiempo INT;
	 SET _fechaFin = (SELECT fechaFin FROM DetalleCurso JOIN AsignacionAuxiliar ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso WHERE idAsignacionAuxiliar = _idAsignacionAuxiliar);
    SET _existe = (SELECT COUNT(*) FROM AsignacionEstudiante WHERE idAsignacionAuxiliar = _idAsignacionAuxiliar AND idUsuario = _idUsuario);
	IF(_existe = 0) THEN
        IF(_fechaFin > NOW()) THEN
			INSERT INTO AsignacionEstudiante(idAsignacionAuxiliar, idUsuario) VALUES (_idAsignacionAuxiliar, _idUsuario);
			SET _tiempo = 0;
			SELECT _tiempo;
		ELSE
			SET _tiempo = 1;
			SELECT _tiempo;
		END IF;
    ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP  actualizar Asignacion de estudiante
DELIMITER $$
CREATE PROCEDURE SP_EditarAsignacionEstudiante
(IN _idAsignacionEstudiante INT, IN _idAsignacionAuxiliar INT, IN _idUsuario INT)
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM AsignacionEstudiante WHERE idAsignacionAuxiliar = _idAsignacionAuxiliar AND idUsuario = _idUsuario);
	IF(_existe = 0) THEN
    UPDATE AsignacionEstudiante SET idAsignacionAuxiliar = _idAsignacionAuxiliar, idUsuario = _idUsuario where idAsignacionEstudiante = _idAsignacionEstudiante;
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP  ELIMINAR Asignacion de estudiante
DELIMITER $$
CREATE PROCEDURE SP_EliminarAsignacionEstudiante
(IN _idAsignacionEstudiante INT)
BEGIN
	DELETE FROM AsignacionEstudiante  where idAsignacionEstudiante = _idAsignacionEstudiante;
END;
$$

-- SP  ASIGNAR ACTIVAD A LOS ESTUDIANTES
DELIMITER $$
CREATE PROCEDURE SP_AsignarActividadEstudiante
(IN _idActividad INT)
BEGIN
	DECLARE _existe INT;
    DECLARE _idAsignacionEstudiante INT;
    SET _idAsignacionEstudiante = (SELECT max(idAsignacionEstudiante) FROM AsignacionEstudiante);
    SET _existe = (SELECT COUNT(*) FROM ActividadAlumbo WHERE idAsignacionEstudiante = _idAsignacionEstudiante AND idUsuario = _idUsuario);
	IF(_existe = 0) THEN
		INSERT INTO ActividadAlumno(idAsignacionEstudiante, idActividad, entregada, archivo) VALUES(_idAsignacionEstudiante, _idActividad, 0, null);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$
 
 

       
--   PROCEDIMIENTOS ALMACENADOS PARA ACTIVIDAD 

-- SP CREAR ACTIVIDAD 
DELIMITER $$
CREATE PROCEDURE SP_CreateActividad
(IN _idAsignacion INT, IN _nombre VARCHAR(250), IN _horaLimite VARCHAR(250), IN _fechaLimite VARCHAR(250), IN _ponderacion INT, IN _archivo INT)
BEGIN
	DECLARE _existe INT;
    DECLARE _count INT;
	SET _existe = (SELECT COUNT(*) FROM Actividad WHERE idAsignacionAuxiliar = _idAsignacion AND nombre = _nombre AND horaLimite = _horaLimite AND fechaLimite = _fechaLimite AND ponderacion = _ponderacion);
	IF(_existe = 0) THEN
		INSERT INTO Actividad(idAsignacionAuxiliar, nombre, horaLimite, fechaLimite, ponderacion, conArchivo) VALUES (_idAsignacion, _nombre, _horaLimite, _fechaLimite, _ponderacion, _archivo);
        SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$
-- SP actualizar ACTIVIDAD 
DELIMITER $$
CREATE PROCEDURE SP_ActualizarActividad
(IN _idActividad INT, IN _idAsignacion INT,  IN _nombre VARCHAR(250), IN _horaLimite VARCHAR(250), IN _fechaLimite VARCHAR(250), IN _ponderacion INT, IN _archivo INT)
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM Actividad WHERE idAsignacionAuxiliar = _idAsignacion AND nombre = _nombre AND horaLimite = _horaLimite AND fechaLimite = _fechaLimite AND ponderacion = _ponderacion);
	IF(_existe = 0) THEN
		UPDATE Actividad SET idAsignacionAuxiliar = _idAsignacion, nombre = _nombre, horaLimite = _horaLimite, fechaLimite = _fechaLimite, ponderacion = _ponderacion, conArchivo = _archivo WHERE idActividad = _idActividad;
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$
-- Eliminar actividad
DELIMITER $$
CREATE PROCEDURE SP_EliminarActividad
(IN _idActividad INT)
BEGIN
	DELETE FROM Actividad WHERE idActividad = _idActividad;
END;
$$

-- PROCEDIMIENTOS ALMACENADOS DE EVALUACION

-- Crear Evaluacion
DELIMITER $$
CREATE PROCEDURE SP_CrearEvaluacion
(IN _nombre VARCHAR(100), IN _id INT)
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM Evaluacion WHERE nombre = _nombre AND idAsignacionAuxiliar = _id);
	IF(_existe = 0) THEN
		INSERT INTO Evaluacion(nombre, idAsignacionAuxiliar) VALUES (_nombre, _id);
        SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$
-- Eliminar EVALUACION
DELIMITER $$
CREATE PROCEDURE SP_EliminarEvaluacion
(IN _id INT)
BEGIN
	DELETE FROM Evaluacion WHERE idEvaluacion = _id;
END;
$$
-- ACTUALIZAR EVALUACION
DELIMITER $$
CREATE PROCEDURE SP_ActualizarEvaluacion
(IN _nombre VARCHAR(100), IN _id INT, IN _idAsig INT)
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM Evaluacion WHERE nombre = _nombre AND idAsignacionAuxiliar = _idAsig);
	IF(_existe = 0) THEN
		UPDATE Evaluacion SET nombre = _nombre WHERE idEvaluacion = _id;
        SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP OBTENER EVALUACIONES
DELIMITER $$
CREATE PROCEDURE SP_get_Evaluaciones
(IN _id INT)
BEGIN
	select idEvaluacion, evaluacion.idAsignacionAuxiliar, evaluacion.nombre as ev, Curso.nombre as cur from evaluacion 
INNER JOIN AsignacionAuxiliar on evaluacion.idAsignacionAuxiliar = AsignacionAuxiliar.idAsignacionAuxiliar
INNER JOIN Usuario ON AsignacionAuxiliar.idUsuario = Usuario.idUsuario
INNER JOIN DetalleCurso ON  AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso
INNER JOIN Curso ON DetalleCurso.idCurso = Curso.idCurso
WHERE AsignacionAuxiliar.idUsuario = _id;
END;
$$

-- SP CREAR DETALLE EVALUACION 
DELIMITER $$
CREATE PROCEDURE SP_CreateDetalleEvaluacion
(IN _idEvaluacion INT, IN _activado INT, IN _aleatorio INT, IN _ponderacion INT)
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM DetalleEvaluacion WHERE idEvaluacion = _idEvaluacion AND activado = _activado AND aleatorio = _aleatorio AND ponderacion = _ponderacion);
	IF(_existe = 0) THEN
		INSERT INTO DetalleEvaluacion(idEvaluacion, activado, aleatorio, ponderacion) VALUES (_idEvaluacion, _activado, _aleatorio, _ponderacion);
        SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP ELIMINAR DETALLE EVALUACION 
DELIMITER $$
CREATE PROCEDURE SP_EliminarDetalleEvaluacion
(IN _idDetEvaluacion INT )
BEGIN
	DELETE FROM DetalleEvaluacion WHERE idDetalleEvaluacion = _idDetEvaluacion;
END;
$$



-- ACTUALIZAR DETALLE EVALUACION
DELIMITER $$
CREATE PROCEDURE SP_ActualizarDetalleEvaluacion
(IN _id INT, IN _activado INT, IN _aleatorio INT, IN _ponderacion INT)
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM DetalleEvaluacion WHERE activado = _activado AND aleatorio = _aleatorio AND ponderacion = _ponderacion);
	IF(_existe = 0) THEN
		UPDATE DetalleEvaluacion SET activado = _activado, aleatorio = _aleatorio, ponderacion =_ponderacion WHERE idDetalleEvaluacion = _id;
        SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

select * from detalleEvaluacion


-- PROCEDMIENTOS ALMACENADOS PARA EVALUACION SELECCION MULTIPLE


-- CREAR EVALUACION SM
DELIMITER $$
CREATE PROCEDURE SP_CreateEvaluacionSM
(IN _idDetalleEvaluacion INT, IN _pregunta VARCHAR(250), IN _respuesta1 VARCHAR(250),IN _respuesta2 VARCHAR(250), IN _respuesta3 VARCHAR(250), IN _correcta VARCHAR(250))
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM EvaluacionSM WHERE idDetalleEvaluacion = _idDetalleEvaluacion AND pregunta = _pregunta
    AND respuesta1 = _respuesta1 AND respuesta2 = _respuesta2 AND respuesta3 = _respuesta3 AND correcta = _correcta);
	IF(_existe = 0) THEN
		INSERT INTO EvaluacionSM(idDetalleEvaluacion, pregunta, respuesta1,respuesta2,respuesta3, tipo, correcta) VALUES (_idDetalleEvaluacion, _pregunta, _respuesta1, _respuesta2, _respuesta3, 'SM' ,_correcta);
        SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$
-- ELIMINAR EVALUACION SM
DELIMITER $$
CREATE PROCEDURE SP_EliminarEvaluacionSM
(IN _id INT )
BEGIN
	DELETE FROM EvaluacionSM WHERE idEvaluacionSM = _id;
END;
$$




-- PROCEDMIENTOS ALMACENADOS PARA EVALUACION VERDADERO FALSO

-- CREAR EVALUACION VF
DELIMITER $$
CREATE PROCEDURE SP_CreateEvaluacionVF
(IN _idDetalleEvaluacion INT, IN _pregunta VARCHAR(250), IN _respuesta INT)
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM EvaluacionVF WHERE idDetalleEvaluacion = _idDetalleEvaluacion AND pregunta = _pregunta AND respuesta = _respuesta);
	IF(_existe = 0) THEN
		INSERT INTO EvaluacionVF(idDetalleEvaluacion, pregunta, respuesta, tipo) VALUES (_idDetalleEvaluacion, _pregunta, _respuesta, 'VF');
        SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$


-- ELIMINAR EVALUACION VF
DELIMITER $$
CREATE PROCEDURE SP_EliminarEvaluacionVF
(IN _id INT )
BEGIN
	DELETE FROM EvaluacionVF WHERE idEvaluacionVF = _id;
END;
$$

-- OBTENER PREGUNTAS EVALUACION
DELIMITER $$
CREATE PROCEDURE SP_GETPreguntas
(IN _idDetalleEvaluacion INT)
BEGIN
	DECLARE _existe INT;
    SET _existe = (SELECT COUNT(*) FROM EvaluacionVF WHERE idDetalleEvaluacion = _idDetalleEvaluacion);
	IF(_existe >= 1) THEN
		SELECT * FROM EvaluacionVF WHERE  idDetalleEvaluacion = _idDetalleEvaluacion;
    ELSE
		SELECT * FROM EvaluacionSM WHERE  idDetalleEvaluacion = _idDetalleEvaluacion;
	END IF;
END;
$$

BEGIN  -- PROCEDIMIENTOS ALMACENADOS QUE YA ESTABAN CREADO

 -- Very long query;
 -- SP AGREGAR DETALLE USUARIO
DELIMITER $$
CREATE PROCEDURE SP_AsignarRol
(IN _idTipoUsuario INT, _idUsuario INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM DetalleUsuario WHERE idTipoUsuario = _idTipoUsuario AND idUsuario = _idUsuario);
	IF(_existe = 0) THEN
	INSERT INTO DetalleUsuario(idTipoUsuario, idUsuario) VALUES (_idTipoUsuario, _idUsuario);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$


-- SP OBTENER TODOS LOS USUARIOS
DELIMITER $$
CREATE PROCEDURE SP_GetUsuarios()
BEGIN
	SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.username, Usuario.password, 
	Usuario.nombre, Usuario.apellido, TipoUsuario.nombre AS 'tipo', TipoUsuario.idTipoUsuario FROM DetalleUsuario
		INNER JOIN Usuario ON (DetalleUsuario.idUsuario = Usuario.idUsuario)
		INNER JOIN TipoUsuario ON (DetalleUsuario.idTipoUsuario = TipoUsuario.idTipoUsuario);
END;
$$

-- SP VER DETALLE USUARIO
DELIMITER $$
CREATE PROCEDURE SP_GetUsuario
(IN _idUsuario INT)
BEGIN
	SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.username, Usuario.password, 
	Usuario.nombre, Usuario.apellido, TipoUsuario.nombre AS 'tipo', TipoUsuario.idTipoUsuario FROM DetalleUsuario
		INNER JOIN Usuario ON (DetalleUsuario.idUsuario = Usuario.idUsuario)
		INNER JOIN TipoUsuario ON (DetalleUsuario.idTipoUsuario = TipoUsuario.idTipoUsuario)
		WHERE Usuario.idUsuario = _idUsuario;
END;
$$

-- SP VER AUTENTICAR
DELIMITER $$
CREATE PROCEDURE SP_Autenticar
(IN _username VARCHAR(100), _password VARCHAR(100))
BEGIN
	SELECT Usuario.idUsuario, Usuario.carnet, Usuario.dpi, Usuario.username, Usuario.password, 
	Usuario.nombre, Usuario.apellido, TipoUsuario.nombre AS 'tipo', TipoUsuario.idTipoUsuario FROM DetalleUsuario
		INNER JOIN Usuario ON (DetalleUsuario.idUsuario = Usuario.idUsuario)
		INNER JOIN TipoUsuario ON (DetalleUsuario.idTipoUsuario = TipoUsuario.idTipoUsuario)
		WHERE Usuario.username = _username AND Usuario.password = _password
        ORDER BY DetalleUsuario.idTipoUsuario;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_CreateUsuario
(IN _carnet BIGINT, _dpi BIGINT, _username VARCHAR(100), _password VARCHAR(100), _nombre VARCHAR(100), _apellido VARCHAR(100), _rol INT)
BEGIN
	DECLARE _idUsuario INT;
	INSERT INTO Usuario(carnet, dpi, username, password, nombre, apellido) 
		VALUES (_carnet, _dpi, _username, _password, _nombre, _apellido);
	SET _idUsuario = (SELECT idUsuario FROM Usuario ORDER BY idUsuario DESC LIMIT 1);
    CALL SP_AsignarRol(_rol, _idUsuario);
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_CreateDetalleCurso
(IN _semestre VARCHAR(50), _anio VARCHAR(50), _horaInicio VARCHAR(50), _horaFin VARCHAR(50), _fechaFin DATETIME, _idCurso INT, _idSeccion INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM DetalleCurso WHERE idCurso = _idCurso AND idSeccion = _idSeccion AND horaInicio = _horaInicio AND horaFin = _horaFin AND semestre = _semestre);
	IF(_existe = 0) THEN
	INSERT INTO DetalleCurso(semestre, anio, horaInicio, horaFin, fechaFin, idCurso, idSeccion) VALUES (_semestre, _anio, _horaInicio, _horaFin, _fechaFin, _idCurso, _idSeccion);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_UpdateDetalleCurso
(IN _semestre VARCHAR(50), _anio VARCHAR(50), _horaInicio VARCHAR(50), _horaFin VARCHAR(50), _fechaFin DATETIME,  _idCurso INT, _idSeccion INT, _idDetalleCurso INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM DetalleCurso WHERE idCurso = _idCurso AND idSeccion = _idSeccion AND horaInicio = _horaInicio AND horaFin = _horaFin AND semestre = _semestre);
	IF(_existe = 0) THEN
		UPDATE DetalleCurso SET semestre = _semestre, anio = _anio, fechaFin = _fechaFin,  horaInicio = _horaInicio, horaFin = _horaFin,
        idCurso = _idCurso, idSeccion = _idSeccion WHERE idDetalleCurso = _idDetalleCurso;
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_UpdateAsignacionAuxiliar
(IN _idUsuario INT, _idDetalleCurso INT, _idAsignacionAuxiliar INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM AsignacionAuxiliar WHERE idUsuario = _idUsuario AND idDetalleCurso = _idDetalleCurso);
	IF(_existe = 0) THEN
		UPDATE AsignacionAuxiliar SET idUsuario = _idUsuario, idDetalleCurso = _idDetalleCurso
        WHERE idAsignacionAuxiliar = _idAsignacionAuxiliar;
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$

-- SP VER CREAR USUARIO
DELIMITER $$
CREATE PROCEDURE SP_CreateAsignacionAuxiliar
(IN _idUsuario INT, _idDetalleCurso INT)
BEGIN
	DECLARE _existe INT;
	SET _existe = (SELECT COUNT(*) FROM AsignacionAuxiliar WHERE idUsuario = _idUsuario AND idDetalleCurso = _idDetalleCurso);
	IF(_existe = 0) THEN
		INSERT INTO AsignacionAuxiliar(idUsuario, idDetalleCurso)
			VALUES (_idUsuario, _idDetalleCurso);
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;
END;
$$


-- SP CREAR MENSAJE
DELIMITER $$
CREATE PROCEDURE SP_CreateMensaje
(IN _idUsuario1 INT, _idUsuario2 INT, _asunto VARCHAR(255), _cuerpo VARCHAR(255), _archivo BLOB)
BEGIN
	INSERT INTO Mensaje(emisor, receptor, asunto) VALUES(_idUsuario1, _idUsuario2, _asunto);
    INSERT INTO DetalleMensaje(idMensaje, cuerpo, archivo) VALUES((SELECT max(idMensaje) FROM Mensaje), _cuerpo, _archivo);
    INSERT INTO RespuestaMensaje(idMensaje, cuerpo, fecha, archivo, emisor, receptor) VALUES((SELECT max(idMensaje) FROM Mensaje),_cuerpo, NOW(), _archivo, (SELECT concat(nombre, ' ', apellido) from Usuario WHERE idUsuario = _idUsuario1),(SELECT concat(nombre, ' ', apellido) from Usuario WHERE idUsuario = _idUsuario2) );
    
END;
$$


DELIMITER $$
CREATE PROCEDURE SP_CreateRespuesta
(IN _idUsuario1 VARCHAR(255), _idUsuario2 VARCHAR(255), _asunto VARCHAR(255), _cuerpo VARCHAR(255), _archivo BLOB, _idMensaje INT)
BEGIN
    INSERT INTO RespuestaMensaje(idMensaje, cuerpo, fecha, archivo, emisor, receptor) VALUES((SELECT max(idMensaje) FROM Mensaje),_cuerpo, NOW(), _archivo, _idUsuario1 ,_idUsuario2 );
END;
$$


DELIMITER $$
CREATE PROCEDURE SP_EliminarCurso
(IN _id INT)
BEGIN

DECLARE _existe INT;
	SET _existe = (select COUNT(*) FROM AsignacionEstudiante  Inner join AsignacionAuxiliar ON AsignacionEstudiante.idAsignacionAuxiliar = AsignacionAuxiliar.idAsignacionAuxiliar INNER JOIN DetalleCurso ON AsignacionAuxiliar.idDetalleCurso = DetalleCurso.idDetalleCurso  INNER JOIN Curso ON DetalleCurso.idCurso = Curso.idCurso WHERE DetalleCurso.idCurso = _id);
	IF(_existe = 0) THEN
		DELETE FROM Curso WHERE idCurso = _id;
		SELECT _existe;
	ELSE
		SELECT _existe;
	END IF;

END;
$$



DELIMITER $$
CREATE PROCEDURE SP_GetDetalleCurso
(IN _id INT)
BEGIN
	SELECT idDetalleCurso, semestre, anio, horaInicio, horaFin, Curso.nombre, Curso.codigo, seccion.nombre AS 'seccion' From DetalleCurso
	INNER JOIN Curso ON DetalleCurso.idCurso = Curso.idCurso 
	INNER JOIN Seccion on DetalleCurso.idSeccion = Seccion.idSeccion
    WHERE idDetalleCurso NOT IN (SELECT idDetalleCurso FROM AsignacionAuxiliar);
END;
$$



--HOLA
END;


