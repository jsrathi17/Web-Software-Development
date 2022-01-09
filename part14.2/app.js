import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();

const session = new Session();
app.use(session.initMiddleware());
app.use(renderMiddleware);

const router = new Router();

const data = {
  items: [],
};

const listItems = async ({ state, render }) => {
  let items = await state.session.get("items");
  if (!items) {
    items = [];
  }
  const data = {
    items: items,
  }
  render("index.eta", data);
};

const addItem = async ({ request, state, response }) => {
  const body = request.body();
  const params = await body.value;
  let items = await state.session.get("items");
  if (!items) {
    items = [];
  }
  items.push(params.get("item"));
  await state.session.set("items", items);
  response.redirect("/");
};

router.get("/", listItems);
router.post("/", addItem);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
