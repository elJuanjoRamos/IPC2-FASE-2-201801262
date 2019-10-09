USE `dbFase2` ;

INSERT INTO ROL(nombre) VALUES ('Administrador');
INSERT INTO ROL(nombre) VALUES ('Auxiliar');
INSERT INTO ROL(nombre) VALUES ('Estudiante');


INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('admin', 'admin', 'admin', 'admin', 1);
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('aux', 'aux', 'aux', 'aux', 2);
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('est', 'est', 'est', 'est', 3);



INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('a', 'b', 'c', 'd', 3);
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('a', 'b', 'c', 'd', 3);
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('a', 'b', 'c', 'd', 3);
INSERT INTO Usuario(nombre, apellido, username, pass, Rol_idRol) VALUES ('a', 'b', 'c', 'd', 3);



INSERT INTO SECCION(nombre) VALUES('A');
INSERT INTO SECCION(nombre) VALUES('C');
INSERT INTO SECCION(nombre) VALUES('D');
INSERT INTO SECCION(nombre) VALUES('E');
INSERT INTO SECCION(nombre) VALUES('F');
