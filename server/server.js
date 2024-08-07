import jsonServer from 'json-server'
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Adjust the path to your db.json
const middlewares = jsonServer.defaults();
const port = 5000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
