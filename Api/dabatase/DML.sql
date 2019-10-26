-- USE DATABASE
USE Proyecto1;

-- INSERTAR TIPOS DE USUARIO
INSERT INTO TipoUsuario(nombre, descripcion) VALUES ('Administrador', 'Administrador de la pagina web.');
INSERT INTO TipoUsuario(nombre, descripcion) VALUES ('Auxiliar', 'Auxiliar de la pagina web.');
INSERT INTO TipoUsuario(nombre, descripcion) VALUES ('Estudiante', 'Estudiante de la pagina web.');

-- INSERTAR USUARIOS
INSERT INTO Usuario(carnet, dpi, username, password, nombre, apellido) VALUES (0, 0, "admin","admin", "Administrador", "U");
CALL SP_AsignarRol(1, 1);

-- INSERTAR SECCION
INSERT INTO Seccion (nombre) VALUES ('A');
INSERT INTO Seccion (nombre) VALUES ('B');
INSERT INTO Seccion (nombre) VALUES ('C');
INSERT INTO Seccion (nombre) VALUES ('D');
INSERT INTO Seccion (nombre) VALUES ('E');
INSERT INTO Seccion (nombre) VALUES ('F');
INSERT INTO Seccion (nombre) VALUES ('G');
INSERT INTO Seccion (nombre) VALUES ('H');
INSERT INTO Seccion (nombre) VALUES ('I');

insert into AsignacionEstudiante(idUsuario, idAsignacionAuxiliar) VALUES(3,2)

SELECT AsignacionEstudiante.idAsignacionAuxiliar, (SELECT Usuario.idUsuario, concat(Usuario.nombre, ' ' , Usuario.apellido) from AsignacionAuxiliar) as auxiliar, Usuario.carnet FROM AsignacionEstudiante
INNER JOIN AsignacionAuxiliar as aux ON AsignacionEstudiante.idAsignacionAuxiliar = aux.idAsignacionAuxiliar
INNER JOIN Usuario on AsignacionEstudiante.idUsuario = Usuario.idUsuario
WHERE AsignacionEstudiante.idUsuario = 3