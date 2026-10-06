import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
    host:process.env.BD_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    //define se quem chegar depois espera;
    waitForConnections: true,
    //define quantas conexões trabalham ao mesmo tempo;
    connectionLimit: 10,
    //queueLimit define quantos podem ficar nessa espera.
    queueLimit: 0

})