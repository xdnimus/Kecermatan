const { error } = require("console");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "Kecermatan",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database...");
    return;
  }
  console.log("connected to database...");
});
module.exports = db;
