USE `dbFase2` ;

INSERT INTO ROL(nombre) VALUES ('Administrador');
INSERT INTO ROL(nombre) VALUES ('Auxiliar');
INSERT INTO ROL(nombre) VALUES ('Estudiante');


INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('admin', 'admin', 'admin', 'admin', 1);
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('aux', 'aux', 'aux', 'aux', 2);
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('est', 'est', 'est', 'est', 3);


INSERT INTO SECCION(nombre) VALUES('A');
INSERT INTO SECCION(nombre) VALUES('C');
INSERT INTO SECCION(nombre) VALUES('D');
INSERT INTO SECCION(nombre) VALUES('E');
INSERT INTO SECCION(nombre) VALUES('F');


INSERT INTO CURSO(nombre, codigo, estado) VALUES('INTERMEDIA 1', 'MI1', 1);


INSERT INTO DETALLECURSO(semestre, anio, horario, Curso_idCurso, seccion) VALUES('Primero', '2019', '12:50 PM to 15:20 PM, LUN-MAR-MIER-JUE-VIE', 1, 'A' );
INSERT INTO DETALLECURSO(semestre, anio, horario, Curso_idCurso, seccion) VALUES('Primero', '2019', '12:50 PM to 15:20 PM, LUN-MAR-MIER-JUE-VIE', 2, 'c' );
INSERT INTO DETALLECURSO(semestre, anio, horario, Curso_idCurso, seccion) VALUES('Primero', '2019', '12:50 PM to 15:20 PM, LUN-MAR-MIER-JUE-VIE', 9, 'b' );

SELECT idDetalleCurso, semestre, anio, horario, Curso.nombre, Curso.codigo seccion FROM DETALLECURSO 
INNER JOIN Curso on DetalleCurso.Curso_idCurso = Curso.idCurso;

SELECT Usuario.nombre, Usuario.apellido, semestre, anio, horario, Curso.nombre as curso, Curso.codigo,  seccion FROM AsignacionAuxiliar
INNER JOIN Usuario ON AsignacionAuxiliar.Usuario_idUsuario = Usuario.idUsuario
INNER JOIN DetalleCurso ON AsignacionAuxiliar.DetalleCurso_idDetalleCurso = DetalleCurso.idDetalleCurso
INNER JOIN Curso on DetalleCurso.Curso_idCurso = Curso.idCurso;

select * from usuario where username = 'admin' AND pass = 'admin'