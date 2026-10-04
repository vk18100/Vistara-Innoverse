import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 30000,
});

try {
  console.log("Connecting to database...");

  await client.connect();

  console.log("✅ DATABASE CONNECTED");

  const result = await client.query("SELECT NOW()");

  console.log("DB TIME:", result.rows[0]);

  await client.end();
} catch (error) {
  console.error("❌ DATABASE CONNECTION FAILED");
  console.error(error);
}