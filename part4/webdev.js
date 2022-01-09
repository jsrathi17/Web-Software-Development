import { serve } from "https://deno.land/std@0.106.0/http/server.ts";

const server = serve({ port: 7777 });

const requestParams = (url) => {
  let queryParams = "";
  if (url.includes("?")) {
    queryParams = url.slice(url.indexOf("?"));
  }

  return new URLSearchParams(queryParams);
};

for await (const request of server) {
     const params = requestParams(request.url);
   if (params.get("operation")==="sum")
  {
  const number1 = Number(params.get("number1"));
  const number2 = Number(params.get("number2"));

  request.respond({ body: `${number1 + number2}` });
  }
  
  else if (params.get("operation")==="difference")
  {
  const number1 = Number(params.get("number1"));
  const number2 = Number(params.get("number2"));

  request.respond({ body: `${number1 - number2}` });
  }


  else if (params.get("operation")==="product")
  {
  const number1 = Number(params.get("number1"));
  const number2 = Number(params.get("number2"));

  request.respond({ body: `${number1 * number2}` });
  }


  else if (params.get("operation")==="quotient")
  {
  const number1 = Number(params.get("one"));
  const number2 = Number(params.get("two"));
  request.respond({ body: `${number1 / number2}` });
  }
}