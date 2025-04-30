-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema tricos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tricos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tricos` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `tricos` ;

-- -----------------------------------------------------
-- Table `tricos`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`categorias` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NULL DEFAULT NULL,
  `orden` INT NOT NULL DEFAULT '0',
  `activo` TINYINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('admin', 'cajero', 'usuario') NOT NULL DEFAULT 'usuario',
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `ultima_sesion` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`pedidos` (
  `id_pedido` INT NOT NULL AUTO_INCREMENT,
  `nombre_cliente` VARCHAR(100) NULL DEFAULT NULL,
  `telefono` VARCHAR(45) NULL DEFAULT NULL,
  `direccion` TEXT NULL DEFAULT NULL,
  `latitud` DECIMAL(10,8) NULL DEFAULT NULL,
  `longitud` DECIMAL(10,8) NULL DEFAULT NULL,
  `zona_entrega` ENUM('retiro', 'cerca', 'media', 'lejos') NULL DEFAULT 'lejos',
  `costo_envio` DECIMAL(10,2) NULL DEFAULT NULL,
  `subtotal` DECIMAL(10,2) NULL DEFAULT NULL,
  `total` DECIMAL(10,2) NULL DEFAULT NULL,
  `metodo_pago` ENUM('efectivo', 'transferencia', 'tarjeta', 'online', 'mixto') NULL DEFAULT 'efectivo',
  `estado` ENUM('pendiente', 'confirmado', 'en_preparacion', 'enviado', 'entregado', 'cancelado') NULL DEFAULT 'pendiente',
  `origen` ENUM('web', 'telefono', 'presencial') NULL DEFAULT 'web',
  `observaciones` TEXT NULL DEFAULT NULL,
  `fecha_pedido` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` INT NULL DEFAULT '1',
  PRIMARY KEY (`id_pedido`),
  INDEX `fk_pedidos_usuarios1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_usuarios1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `tricos`.`usuarios` (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`productos` (
  `id_producto` INT NOT NULL AUTO_INCREMENT,
  `categoria_id` INT NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `imagen` VARCHAR(255) NULL DEFAULT NULL,
  `disponible` TINYINT NULL DEFAULT '1',
  `destacado` TINYINT NULL DEFAULT '0',
  `fecha_creacion` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_producto`),
  INDEX `fk_productos_categorias_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_productos_categorias`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `tricos`.`categorias` (`id_categoria`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`variaciones_producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`variaciones_producto` (
  `id_variaciones_producto` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `precio_adicional` DECIMAL(10,2) NULL DEFAULT '0.00',
  PRIMARY KEY (`id_variaciones_producto`),
  INDEX `fk_variaciones_producto_productos1_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `fk_variaciones_producto_productos1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `tricos`.`productos` (`id_producto`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`detalle_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`detalle_pedido` (
  `id_detalle_pedido` INT NOT NULL AUTO_INCREMENT,
  `pedido_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `variacion_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  `observaciones` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_detalle_pedido`),
  INDEX `fk_detalle_pedido_pedidos1_idx` (`pedido_id` ASC) VISIBLE,
  INDEX `fk_detalle_pedido_productos1_idx` (`producto_id` ASC) VISIBLE,
  INDEX `fk_detalle_pedido_variaciones_producto1_idx` (`variacion_id` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_pedido_pedidos1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `tricos`.`pedidos` (`id_pedido`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_detalle_pedido_productos1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `tricos`.`productos` (`id_producto`),
  CONSTRAINT `fk_detalle_pedido_variaciones_producto1`
    FOREIGN KEY (`variacion_id`)
    REFERENCES `tricos`.`variaciones_producto` (`id_variaciones_producto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`ingredientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`ingredientes` (
  `id_ingrediente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `stock` DECIMAL(10,2) NULL DEFAULT '0.00',
  `unidad_medida` VARCHAR(20) NOT NULL,
  `costo` DECIMAL(10,2) NULL DEFAULT '0.00',
  PRIMARY KEY (`id_ingrediente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`movimientos_inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`movimientos_inventario` (
  `id_movimientos_inventario` INT NOT NULL AUTO_INCREMENT,
  `ingrediente_id` INT NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  `tipo` ENUM('entrada', 'salida', 'ajuste') NOT NULL,
  `motivo` TEXT NOT NULL,
  `fecha` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id_movimientos_inventario`),
  INDEX `fk_movimientos_inventario_usuarios2_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_movimientos_inventario_ingredientes2_idx` (`ingrediente_id` ASC) VISIBLE,
  CONSTRAINT `fk_movimientos_inventario_usuarios2`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `tricos`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movimientos_inventario_ingredientes2`
    FOREIGN KEY (`ingrediente_id`)
    REFERENCES `tricos`.`ingredientes` (`id_ingrediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tricos`.`producto_ingredientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`producto_ingredientes` (
  `id_producto_ingredientes` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `ingrediente_id` INT NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_producto_ingredientes`),
  INDEX `fk_producto_ingredientes_productos1_idx` (`producto_id` ASC) VISIBLE,
  INDEX `fk_producto_ingredientes_ingredientes1_idx` (`ingrediente_id` ASC) VISIBLE,
  CONSTRAINT `fk_producto_ingredientes_ingredientes1`
    FOREIGN KEY (`ingrediente_id`)
    REFERENCES `tricos`.`ingredientes` (`id_ingrediente`),
  CONSTRAINT `fk_producto_ingredientes_productos1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `tricos`.`productos` (`id_producto`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`zona_entrega`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`zona_entrega` (
  `id_zona_entrega` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `tipo` ENUM('retiro', 'cerca', 'media', 'lejos') NOT NULL,
  `costo` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `radio_km` DECIMAL(5,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id_zona_entrega`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tricos`.`movimientos_inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tricos`.`movimientos_inventario` (
  `id_movimientos_inventario` INT NOT NULL AUTO_INCREMENT,
  `ingrediente_id` INT NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  `tipo` ENUM('entrada', 'salida', 'ajuste') NOT NULL,
  `motivo` TEXT NOT NULL,
  `fecha` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id_movimientos_inventario`),
  INDEX `fk_movimientos_inventario_usuarios2_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_movimientos_inventario_ingredientes2_idx` (`ingrediente_id` ASC) VISIBLE,
  CONSTRAINT `fk_movimientos_inventario_usuarios2`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `tricos`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_movimientos_inventario_ingredientes2`
    FOREIGN KEY (`ingrediente_id`)
    REFERENCES `tricos`.`ingredientes` (`id_ingrediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
