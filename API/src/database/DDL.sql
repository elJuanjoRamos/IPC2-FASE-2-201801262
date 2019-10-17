
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dbFase2` ;
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbFase2` DEFAULT CHARACTER SET utf8 ;
USE `dbFase2` ;

-- -----------------------------------------------------
-- Table `mydb`.`Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rol` ;

CREATE TABLE IF NOT EXISTS `Rol` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `mydb`.`Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Usuario` ;
CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `apellido` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `pass` VARCHAR(45) NULL,
  `Rol_idRol` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_Usuario_Rol_idx` (`Rol_idRol` ASC),
  CONSTRAINT `fk_Usuario_Rol`
    FOREIGN KEY (`Rol_idRol`)
    REFERENCES `Rol` (`idRol`)
    ON UPDATE CASCADE
    ON DELETE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`CURSO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CURSO` ;
CREATE TABLE IF NOT EXISTS `CURSO` (
  `idCurso` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `codigo` VARCHAR(45) NULL,
  `estado` INT NULL,
  PRIMARY KEY (`idCurso`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SECCION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `SECCION` ;
CREATE TABLE IF NOT EXISTS `SECCION` (
  `idSeccion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idSeccion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`DETALLECURSO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DetalleCurso` ;
CREATE TABLE IF NOT EXISTS `DetalleCurso` (
  `idDetalleCurso` INT NOT NULL AUTO_INCREMENT,
  `semestre` VARCHAR(45) NOT NULL,
  `anio` VARCHAR(45) NOT NULL,
  `horaInicio` VARCHAR(50) NOT NULL,
  `horaFin` VARCHAR(50) NOT NULL,
  `Curso_idCurso` INT NOT NULL,
  `seccion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idDetalleCurso`),
  INDEX `fk_DetalleCurso_Curso_idx` (`Curso_idCurso` ASC),
  CONSTRAINT `fk_DetalleCurso_Curso`
    FOREIGN KEY (`Curso_idCurso`)
    REFERENCES `Curso` (`idCurso`)
    ON UPDATE CASCADE
    ON DELETE CASCADE)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `mydb`.`DETALLECURSO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AsignacionAuxiliar` ;
CREATE TABLE IF NOT EXISTS `AsignacionAuxiliar` (
  `idAsignacionAuxiliar` INT NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` INT NOT NULL,
  `DetalleCurso_idDetalleCurso` INT NOT NULL,
  PRIMARY KEY (`idAsignacionAuxiliar`),
  INDEX `fk_AsignacionAuxiliar_Usuario_idx` (`Usuario_idUsuario` ASC),
  CONSTRAINT `fk_AsignacionAuxiliar_Usuario`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `Usuario` (`idUsuario`)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    INDEX `fk_AsignacionAuxiliar_DetalleCurso_idx` (`DetalleCurso_idDetalleCurso` ASC),
  CONSTRAINT `fk_AsignacionAuxiliar_DetalleCurso`
    FOREIGN KEY (`DetalleCurso_idDetalleCurso`)
    REFERENCES `DetalleCurso` (`idDetalleCurso`)
    ON UPDATE CASCADE
    ON DELETE CASCADE)
ENGINE = InnoDB;





DELIMITER //
CREATE PROCEDURE autenticar (IN nombre VARCHAR(45), IN passw VARCHAR(45))
BEGIN
SELECT * FROM Usuario WHERE username = nombre AND pass = passw;  
END //
DELIMITER ;
