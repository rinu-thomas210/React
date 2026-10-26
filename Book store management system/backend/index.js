
const jsonServer = require('json-server');

const bookServer = jsonServer.create();
const router = jsonServer.router('db.json');
const middleware = jsonServer.defaults();

const PORT = 5000;

bookServer.use(middleware);
bookServer.use(router);

bookServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
