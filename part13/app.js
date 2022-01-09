import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { executeQuery } from "./database/database.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const listtheTickets = async ({ render }) => {
  const resp = await executeQuery('Select * FROM tickets');
  let rows = [];
  if (resp) {
    rows = resp.rows;
  }
  const data = {
    tickets: rows,
  }

  render("index.eta", data);
};

const addTicket = async ({ request, response }) => {
 const body = request.body();
 const params = await body.value;
 const content = params.get("content");

 await executeQuery(
    "INSERT INTO tickets (content, reported_on) VALUES ($1, NOW());",
    content,
  );

  response.redirect("/tickets");
};



const resolveTicket = async ({ params, response }) => {
  const ticketid = await params.id;
  await executeQuery(
   "UPDATE tickets SET resolved_on = NOW() WHERE id = $1",
   ticketid,
 );

  response.redirect("/tickets");
};

const deleteTicket = async ({ params, response }) => {
  const ticketid = await params.id;
  await executeQuery(
    "DELETE FROM tickets WHERE id = $1",
    ticketid,
  );
 response.redirect("/tickets");
};

router.get("/tickets", listtheTickets).post("/tickets", addTicket).post("/tickets/:id/resolve", resolveTicket).post("/tickets/:id/delete", deleteTicket);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
