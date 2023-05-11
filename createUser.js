require("dotenv").config();
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createUser = async (firstname, lastname, username, password, email) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await pool.query(
    `insert into accounts (firstname, lastname,username,password,email) values ($1,$2,$3,$4,$5)`,
    [firstname, lastname, username, hashedPassword, email]
  );
};

createUser("guest", "1", "guest", "Abc123", "guest@gmail.com");
createUser("Khadar", "Dagal", "Khadar", "Abc123", "guest@gmail.com");
