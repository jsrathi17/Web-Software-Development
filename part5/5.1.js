import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data = {
  title: "Hello View Templates!",
  content: "This is text!"
};

const handleRequest = async (request) => {
  return new Response(await renderFile("index.eta", data), responseDetails);
};

listenAndServe(":7777", handleRequest);

//////

import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

let visitCount = 0;

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const data = {
      count: visitCount,
    };
  if (url.pathname === "/favicon.ico") {
    visitCount++;
    
    return new Response("", { status: 404 });
  }
  else
  {
 return new Response(await renderFile("index.eta", data), responseDetails);
  }

};

listenAndServe(":7777", handleRequest);

//////