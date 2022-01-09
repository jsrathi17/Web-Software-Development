const showMain = async ({ response, render, state }) => {
  if (await state.session.get("authenticated")) {
    render("index.eta", await state.session.get("user"));
  } else {
    response.redirect("/auth/login");
  }
};

export { showMain };
