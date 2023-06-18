// setting up a http server
const http = require('http'); //http module, allows us to create an HTTP server and handle HTTP requests and responses.

const app = require('./app'); // app using the require function.

const port = process.env.port || 3000; //determines on which port the server will listen for incoming HTTP requests.

const server = http.createServer(app); // creates an HTTP server using the createServer method provided by the http module

server.listen(port); // starts the server by calling the listen method on the server object.

// const server = http.createServer((req, res) => {
//     console.log("request made");

// });

// server.listen(3000, 'localhost', () => {
//     console.log("listening for requests om port 3000");
// })