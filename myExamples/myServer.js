//---------------------------------------------------------------------------------------------------

// My Example of creating a server and routes

const http = require("http");
var fs = require("fs");

const server = http.createServer((request, response) => {
  let path = "../myRoutes/";

  console.log(request.url);

  switch (request.url) {
    case "/":
      path += "homepage.html";
      console.log(path);
      response.statusCode = 200;
      fetchFile(path);
      break;

    case "/info":
      path += "info.html";
      response.statusCode = 200;
      fetchFile(path);
      break;

    case "/cars":
      path += "cars.html";
      response.statusCode = 200;
      fetchFile(path);
      break;

    default:
      path += "error.html";
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
  console.log(
    "listening on port 3000. Vist http://localhost:3000/ to see page"
  );
  console.log("Crtl C to stop");
});
