// Multi Route Server

const http = require("http");
var fs = require("fs");

// file based text/html

const server = http.createServer((request, response) => {
  let path = "./views/";

  console.log(request.url);

  switch (request.url) {
    case "/":
      path += "index.html";
      console.log(path);
      response.statusCode = 200;
      fetchFile(path);
      break;

    case "/about":
      path += "about.html";
      response.statusCode = 200;
      fetchFile(path);
      break;

    case "/kittens":
      path += "kittens.html";
      response.statusCode = 200;
      fetchFile(path);
      break;

    case "/about-me": // Setting up a route re-direct
      response.statusCode = 301;
      response.setHeader("Location", "/about");
      response.end();
      break;

    case "/set-cookies": // Setting a cookie
      response.setHeader("Set-cookie", "fullName=Fred Flinstone");
      response.end("Don't toss your cookies");
      break;

    default:
      // Any other route will throw error 404 and bring up the 404.html page from views
      path += "404.html";
      response.statusCode = 404;
      fetchFile(path);
      break;
  }

  function fetchFile(path) {
    fs.readFile(path, function (err, data) {
      if (err) {
        console.log(err);
        response.end();
      } else {
        console.log("file was served.");
        response.writeHead(response.statusCode, {
          "Content-Type": "text/html",
        });
        response.write(data);
        response.end();
      }
    });
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000.");
});
