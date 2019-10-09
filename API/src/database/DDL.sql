
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

