import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";

const app = new Application();
const session = new Session();
app.use(session.initMiddleware());

const router = new Router();

const hello = async ({ state, response }) => {
  let name = await state.session.get("name");
  if (!name) {
    name = "anonymous";
  }
  response.body = `Hello ${name}!`;
}
const set = async ({ request, state, response }) => {
  const body = request.body();
  const params = await body.value;
  await state.session.set("name", params.get("name"));

  response.redirect("/");
};
router.get("/", hello);
router.post("/", set);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
