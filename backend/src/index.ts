import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as cors from "cors";

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

// connect postgres
import db from "./db/connectPostgres";
const client = db();

app.use(express.json());

app.get("/hotels", async (_: express.Request, res: express.Response) => {
  const sql = "SELECT * FROM HOTEL ORDER BY hotel_id";
  const hotels = await client.query(sql);
  res.send(hotels.rows);
});

app.get("/hotel/:id", async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.sendStatus(400);

  const sql = `SELECT * FROM HOTEL WHERE hotel_id = ${id}`;
  const hotels = await client.query(sql);
  res.send(hotels.rows);
});

app.get(
  "/hotel/search/:search",
  async (req: express.Request, res: express.Response) => {
    const search = req.params.search;

    if (!search) return res.sendStatus(400);

    const sql = `
      SELECT * FROM hotel WHERE 
      ((hotel_name ||' '|| hotel_website || ' ' || hotel_email_address) ilike '%${search}%')
      order by hotel_name
    `;
    const hotels = await client.query(sql);
    res.send(hotels.rows);
  }
);

app.post(
  "/create/hotel",
  async (req: express.Request, res: express.Response) => {
    const input = req.body;

    if (
      !input ||
      !input.name ||
      !input.contact ||
      !input.email ||
      !input.website ||
      !input.desc ||
      !input.floor ||
      !input.room ||
      !input.rating ||
      !input.check_in_time ||
      !input.check_out_time
    )
      return res.sendStatus(400);

    const sql = `
    INSERT INTO Hotel (
        hotel_name,
        hotel_contact_number, 
        hotel_email_address, 
        hotel_website, 
        hotel_description, 
        hotel_floor_count, 
        hotel_room_capacity, 
        star_ratings_star_rating, 
        check_in_time, 
        check_out_time)
	VALUES (
        '${input.name}',
        '${input.contact}',
        '${input.email}',
        '${input.website}',
        '${input.desc}',
        '${input.floor}',
        '${input.room}',
        '${input.rating}',
        '${input.check_in_time}',
        '${input.check_out_time}'
        );	 
    `;

    try {
      await client.query(sql);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

app.post(
  "/update/hotel",
  async (req: express.Request, res: express.Response) => {
    const input = req.body;

    if (
      !input ||
      !input.hotel_id ||
      !input.name ||
      !input.contact ||
      !input.email ||
      !input.website ||
      !input.desc ||
      !input.floor ||
      !input.room ||
      !input.rating ||
      !input.check_in_time ||
      !input.check_out_time
    )
      return res.sendStatus(400);

    const sql = `
    UPDATE Hotel SET 
        hotel_name = '${input.name}',
        hotel_contact_number = '${input.contact}',
        hotel_email_address = '${input.email}',
        hotel_website = '${input.website}',
        hotel_description = '${input.desc}',
        hotel_floor_count = '${input.floor}',
        hotel_room_capacity = '${input.room}',
        star_ratings_star_rating = '${input.rating}',
        check_in_time = '${input.check_in_time}',
        check_out_time = '${input.check_out_time}'
      WHERE hotel_id = ${input.hotel_id}
    `;

    try {
      await client.query(sql);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

app.post(
  "/delete/hotel",
  async (req: express.Request, res: express.Response) => {
    const id = req.body.hotel_id;

    if (!id) return res.sendStatus(400);

    const sql = `
      DELETE FROM hotel WHERE hotel_id = ${id};
    `;

    const hotel = await client.query(sql);
    res.send(hotel.rows);
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
