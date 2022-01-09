import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import * as userService from "../../services/userService.js";

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

const postRegistrationForm = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");
  const verification = params.get("verification");

  if (password !== verification) {
    response.body = "The entered passwords did not match";
    return;
  }

  const existingUsers = await userService.findUsersWithEmail(email);
  if (existingUsers.rows.length > 0) {
    response.body = "The email is already reserved.";
    return;
  }

  const hash = await bcrypt.hash(password);
  await userService.addUser(email, hash);
  response.redirect("/auth/login");
};

const postLoginForm = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");

  const existingUsers = await userService.findUsersWithEmail(email);
  if (existingUsers.rows.length === 0) {
    response.status = 401;
    return;
  }

  // take the first row from the results
  const userObj = existingUsers.rows[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    response.status = 401;
    return;
  }

  await state.session.set("authenticated", true);
  await state.session.set("user", {
    id: userObj.id,
    email: userObj.email,
  });
  response.redirect("/accounts");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export {
  postLoginForm,
  postRegistrationForm,
  showLoginForm,
  showRegistrationForm,
};
