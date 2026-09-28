import mysql from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config();

//helper function to execute SQL queries
export async function executeQuery(sql: string, params?: any[] ): Promise<any> {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
  });
  const [rows] = await connection.execute(sql, params);
  await connection.end();
  return rows;
}


/*async function executeQuery2(sql: string, params: any[] = []): Promise<any> {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  });
  const [rows] = await pool.execute(sql, params);
  await pool.end();
  return rows;
}
*/