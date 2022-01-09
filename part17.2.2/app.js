import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { executeQuery } from "./database/database.js";

const app = new Application();
const router = new Router();

const listGames = async ({ response }) => {
  const result = await executeQuery("SELECT * FROM games");
  let res = [];
  if (result) {
    res = result.rows;
  }

  response.body = res;
};


const listGamebyID = async ({ response, params }) => {
  const result = await executeQuery(
    "SELECT * FROM games WHERE id = $1",
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


const addnewGame = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await executeQuery("INSERT INTO games (name) VALUES ($1);", document.name);

  response.body = { status: "success" };
};

const deleteGamebyID = async ({ params, response }) => {
  await executeQuery("DELETE FROM ratings WHERE game_id = $1;", params.id);
  await executeQuery("DELETE FROM games WHERE id = $1;", params.id);
  response.body = { status: "success" };
};

const addRatingbyID = async ({ params, request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await executeQuery(
    "INSERT INTO ratings (rating, game_id) VALUES ($1, $2);",
    document.rating,
    params.id,
  );

  response.body = { status: "success" };
};

const getRatingsbyID = async ({ params, response }) => {
  const result = await executeQuery(
    "SELECT * FROM ratings WHERE game_id = $1;",
    params.id,
  );
  let res = [];
  if (result) {
    res = result.rows;
  }

  response.body = res;
};




router.get("/games", listGames);
router.get("/games/:id", listGamebyID);
router.post("/games", addnewGame);
router.delete("/games/:id", deleteGamebyID);
router.post("/games/:id/ratings", addRatingbyID);
router.get("/games/:id/ratings", getRatingsbyID);


app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
