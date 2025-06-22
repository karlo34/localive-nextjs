import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});

export default pool;

export const mockEvents = [
  {
    id: 1,
    title: 'Art Workshop',
    datetime_start: new Date('2025-06-23T10:00:00'),
    datetime_end: new Date('2025-06-23T12:00:00'),
    region: 'North',
    city: 'Zagreb',
    type: 'Workshop',   
  },
  {
    id: 2,
    title: 'Music Festival',
    datetime_start: new Date('2025-06-23T18:00:00'),
    datetime_end: new Date('2025-06-23T23:00:00'),
    region: 'South',
    city: 'Split',
    type: 'Concert',
  },
];