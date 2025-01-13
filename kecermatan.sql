CREATE DATABASE Kecermatan;
USE Kecermatan;
CREATE TABLE biodata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_lengkap VARCHAR(255) NOT NULL,
    provinsi VARCHARlearning(255) NOT NULL,
    kabupaten_kota VARCHAR(255) NOT NULL,
    kecamatan VARCHAR(255),
    alamat TEXT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    no_whatsapp VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ulangi_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
biodatabiodatabiodata