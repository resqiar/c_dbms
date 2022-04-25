import { Client } from "pg";

export default function connectPostgres(): Client {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "HotelDB",
    password: "admin",
    port: 5432,
  });

  client
    .connect()
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      console.info("...POSTGRES CONNECTED...");
    });
  return client;
}
