const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  let path = "./views/";

  console.log(request.url);

  switch (request.url) {
    case "/":
      console.log("top of the localhost:3000 web site");
      path += "home.html";
      console.log(path);

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
      break;

    case "/test":
      path += "test.html";
      console.log(path);

      fs.readFile(path, function (err, data) {
        if (err) {
          console.log(err);
          response.end();
        } else {
          console.log("test.html was read");
          response.writeHead(response.statusCode, {
            "Content-Type": "text/html",
          });
          response.write(data);
          response.end();
        }
      });
      break;

    default:
      // Setting it so this page will show up on any other route
      console.log("everything else");
      response.setHeader("Content_Type", "text/plain");
      response.write("Every other route!");
      response.end();
      break;
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening on port 3000.");
});
