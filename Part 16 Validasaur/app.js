import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import {
  isEmail,
  lengthBetween,
  minLength,
  required,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";


const app = new Application();
const router = new Router();

app.use(renderMiddleware);



//defining validation rules for Validasaur library
const validationRules = {
  name: [required, minLength(4)],
  yearOfBirth: [required, isNumeric, numberBetween(1900,2000)],
};



//function to display a form
const showForm = ({ render }) => {
  render("index.eta", { errors: [], name: "", yearOfBirth: "" });
};

const getData = async (request) => {
  const data = {
    name: "",
    yearOfBirth: "",
    errors: [],
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.name = params.get("name");
    data.yearOfBirth = params.has("yearOfBirth");
  }

  return data;
};


//function called when form is submitted
const submitForm = async ({ request, response, render }) => {
  const data = await getData(request)
  const [passes,errors] = await validate(data, validationRules)

  if (passes) {
    response.redirect("/");
  } else {
    render("index.eta", data);
  }
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
