import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'BackEnd', 'data.json'));
const middlewares = jsonServer.defaults();

const port = 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`Access your data at: http://localhost:${port}`);
});
