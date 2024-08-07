import jsonServer from 'json-server'
import cors from 'cors'
import path from 'path'
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // Adjust the path to your db.json
const middlewares = jsonServer.defaults();
const port = 5000;

server.use(cors()); // Enable CORS
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
