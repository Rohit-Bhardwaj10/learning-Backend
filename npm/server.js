// const logEvents = require("./logEvents")

// const EventEmitter = require("events")

// class Emitter extends EventEmitter {};

// // initialize object
// const myEmitter = new Emitter();

// // add listener to logEvents
// myEmitter.on("log", (msg)=>logEvents(msg));

// setTimeout(()=>{
//     // emit event
//     myEmitter.emit("log", "This is a test event");
// })

// -----------------for server js ------------------------------

// Import required modules
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

// Import custom logging functionality
const logEvents = require("./logEvents");

// Set up event emitter for logging
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

// Define server port, use environment variable or default to 3500
const PORT = process.env.PORT || 3500;

// Helper function to serve files
const servefile = async (filePath, contentType, response) => {
  try {
    // Read and serve the file
    const data = await fsPromises.readFile(filePath, "utf-8");
    response.writeHead(200, { "Content-Type": contentType }); // Set response headers
    response.end(data); // Send file content to client
  } catch (error) {
    console.log(error);
    response.statusCode = 500; // Internal server error
    response.end();
  }
};

// Create HTTP server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // Determine content type based on file extension
  const extension = path.extname(req.url);

  let contentType;

  // Map file extensions to corresponding content types
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  // Determine the file path based on the request URL
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html") // Serve index.html for root path
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html") // Serve index.html for directory paths
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url) // Serve HTML files from views directory
      : path.join(__dirname, req.url); // Serve other file types from root directory

  // Check if requested file exists
  const fileExists = fs.existsSync(filePath);

  if (fileExists) { 
    // If file exists, serve it
    servefile(filePath, contentType, res);
  } else {
    // Handle special cases and redirects
    switch (path.parse(filePath).base) {
      case "old.html":
        // Redirect old page to new page
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        console.log(path.parse(filePath).base);
        break;
      case "www-page.html":
        // Redirect www page to home
        res.writeHead(301, { Location: "/" });
        res.end();
        break;f
      default:
        // Serve 404 page for all other cases
        servefile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

// Start the server
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
 