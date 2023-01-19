//---------------------------------------------------------------------------------------

// Another way to make a multi route server that is modularized ***

const http = require("http");

const buffy = require("./routes.js");

const server = http.createServer((request, response) => {
  let path = "./views/";

  //console.log(request.url, request.method);

  switch (request.url) {
    case "/":
      path += "index.html";
      response.statusCode = 200;
      buffy.indexPage(path, response);
      break;

    case "/about":
      path += "about.html";
      response.statusCode = 200;
      buffy.aboutPage(path, response);
      break;

    case "/contact":
      path += "contact.html";
      response.statusCode = 200;
      buffy.contactPage(path, response);
      break;

    case "/subscribe":
      path += "subscribe.html";
      response.setHeader("Set-cookie", "subscription=New");
      buffy.subscribePage(path, response);
      break;

    case "/about-me":
      // this is a redirect for a deprecated route
      response.statusCode = 301;
      response.setHeader("Location", "/about");
      response.end();
      break;

    default:
      path += "404.html";
      response.statusCode = 404;
      buffy.fourOfourPage(request.url, path, response);
      break;
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000.");
});
