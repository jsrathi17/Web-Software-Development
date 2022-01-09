import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";

const render = async (context, next) => {
  configure({
    views: `${Deno.cwd()}/views/`,
  });

  context.render = async (file, data) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};

export default render;
