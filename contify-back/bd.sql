/*Creacion de la base de datos*/
CREATE DATABSE countify;

/*Creacion de la tabla usuarios*/
CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  contrasena VARCHAR(120) NOT NULL,
  ingresos DECIMAL(10, 2) NOT NULL
);