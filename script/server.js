const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("../config");

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:8080", // Ini HARUS sesuai dengan origin client Anda
  methods: "POST", // Metode yang diizinkan (sesuaikan jika perlu: 'GET, POST, PUT, DELETE', dll.)
  credentials: true, // Jika Anda menggunakan cookie atau otorisasi (biasanya tidak perlu untuk pendaftaran sederhana)
  optionsSuccessStatus: 200, // Untuk kompatibilitas dengan beberapa browser lawas
};

app.use(cors(corsOptions)); // Gunakan konfigurasi CORS yang spesifik!
app.use(bodyParser.json());

app.post("/simpan_data", (req, res) => {
  console.log("Data diterima dari client:", req.body); // Debug: Data yang diterima server

  const {
    nama_lengkap,
    provinsi,
    kabupaten_kota,
    kecamatan,
    alamat,
    username,
    email,
    no_whatsapp,
    password,
  } = req.body;

  if (
    !nama_lengkap ||
    !provinsi ||
    !kabupaten_kota ||
    !username ||
    !email ||
    !no_whatsapp ||
    !password
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "Semua field wajib diisi." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Format email tidak valid." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query =
    "INSERT INTO biodata (nama_lengkap, provinsi, kabupaten_kota, kecamatan, alamat, username, email, no_whatsapp, password,ulangi_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    nama_lengkap,
    provinsi,
    kabupaten_kota,
    kecamatan,
    alamat,
    username,
    email,
    no_whatsapp,
    hashedPassword,
    req.body.ulangi_password,
  ];

  console.log("Query yang akan dieksekusi:", query); // Debug: Query SQL
  console.log("Values untuk query:", values); // Debug: Parameter query

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      console.error("SQL Message:", err.sqlMessage);
      console.error("SQL State:", err.sqlState);
      console.error("Error Number:", err.errno);
      return res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan pada server database: " + err.sqlMessage,
      });
    }

    console.log("Result dari query:", result); // Debug: Hasil query

    res.json({ status: "success", message: "Data berhasil disimpan!" });
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
