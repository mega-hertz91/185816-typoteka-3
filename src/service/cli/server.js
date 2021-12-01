'use strict';

const {
  DEFAULT_PORT,
  DEFAULT_ENCODING,
  STATUS_SUCCESS,
  STATUS_NOT_FOUND,
  HEAD_HTML
} = require(`../../constants`);
const http = require(`http`);
const {readFile} = require(`fs/promises`);
const path = require(`path`);

const onClientConnect = async (request, response) => {
  try {
    let content = await readFile(path.join(path.dirname(__filename), `../../mock.json`), {encoding: DEFAULT_ENCODING});
    content = JSON.parse(content);
    const responseBody = content.map((item) => `<li>${item.title}</li>`).join(``);

    response.writeHead(STATUS_SUCCESS, HEAD_HTML);
    response.end(`<ul>${responseBody}</ul>`);
  } catch (e) {
    response.writeHead(STATUS_NOT_FOUND, HEAD_HTML);
    response.end(`<p>Items not found</p>`);
  }
};

const httpServer = http.createServer(onClientConnect);

module.exports = {
  name: `--server`,
  run(args) {
    const port = args.shift() || DEFAULT_PORT;

    httpServer.listen(port, () => {
      console.info(`Server listen to localhost:${port}`);
    });

    httpServer.on(`error`, ({message}) => {
      console.error(`Server error: ${message}`);
    });
  }
};
