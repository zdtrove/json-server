const jsonServer = require('json-server');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const server = jsonServer.create();

const dbPath = path.join(os.tmpdir(), 'db.json');

const originalDbPath = path.join(__dirname, '..', 'db.json');
if (!fs.existsSync(dbPath)) {
    fs.copyFileSync(originalDbPath, dbPath);
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(
    jsonServer.rewriter({
        '/api/*': '/$1',
        '/blog/:resource/:id/show': '/:resource/:id',
    })
);
server.use(router);

server.listen(8080, () => {
    console.log('JSON Server is running');
});

module.exports = server;