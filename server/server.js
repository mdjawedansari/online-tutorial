import jsonServer from 'json-server'
import cors from 'cors'
import path from 'path'
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // Adjust the path to your db.json
const middlewares = jsonServer.defaults();
const port = 5000;
const ejaz = ["https://coding-pathshala.vercel.app", "http://localhost:5000"];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is in the allowed list or if the origin is undefined (for non-browser requests)
    if (ejaz.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  }
})); // Enable CORS
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
