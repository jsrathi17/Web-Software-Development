import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { executeQuery } from "./database/database.js";

const app = new Application();
const router = new Router();

const listSongs = async ({ response }) => {
  const songs = await executeQuery("SELECT * FROM songs");
  let res = [];
  if (songs) {
    res = songs.rows;
  }

  response.body = res;
};

const listSongbyId = async ({ response, params }) => {
  const result = await executeQuery(
    "SELECT * FROM songs WHERE id = $1",
    params.id,
  );
  let res = [];
  if (result) {
    res = result.rows;
  }

  if (res.length > 0) {
    response.body = res[0];
  } else {
    response.body = {};
  }
};

const addnewSong = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await executeQuery(
    "INSERT INTO songs (name, rating) VALUES ($1, $2);",
    document.name,
    document.rating,
  );

  response.body = { status: "success" };
};

const deleteSong = async ({ params, response }) => {
  await executeQuery("DELETE FROM songs WHERE id = $1;", params.id);
  response.body = { status: "success" };
};


router.get("/songs", listSongs);
router.get("/songs/:id", listSongbyId);
router.post("/songs", addnewSong);
router.delete("/songs/:id", deleteSong);


app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
