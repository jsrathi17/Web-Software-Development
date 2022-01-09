import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";

const handleRequest = async (request) => {
  return await serveFile(request, "static/index.html");
};

listenAndServe(":7777", handleRequest);


import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.113.0/http/file_server.ts";

const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname == '/index.html')
    {
        return await serveFile(request, 'static/index.html');
    }
    else if (url.pathname == '/about.html')
    {
        return await serveFile(request, 'static/about.html');
    }
  
    else
    {
        return new Response("Hello files!")
    }
};


import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.113.0/http/file_server.ts";

const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname.search('css') == -1)
    {
       return await serveFile(request, "static/index.html");
    }
    else
    {
       return await serveFile(request, "static/styles.css"); 
    }
  
};

listenAndServe(":7777", handleRequest);