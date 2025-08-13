import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin123",
  database: "sql_harve",
});

async function executeSql(sql) {
  try {
    const [rows] = await connection.query(sql);
    return [rows];
  } catch (err) {
    console.error("Error executing sql:", err);
  }
}

async function executeSqlWithParams(sql,params) {
  try {
    const result = await connection.query(sql, params);
    return result;
  } catch (err) {
    console.error("Error executing sql:", err);
  }
}

export { executeSql, executeSqlWithParams };
