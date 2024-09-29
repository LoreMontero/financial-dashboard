import mysql from 'mysql2/promise';

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'XXXXXXX',
    database:'shellhacks',
  });
  return connection;
}
