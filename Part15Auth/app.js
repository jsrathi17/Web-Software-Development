import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
app.use(errorMiddleware);

const session = new Session();
app.use(session.initMiddleware());

app.use(renderMiddleware);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
