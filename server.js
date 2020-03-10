const http = require('http');
const path = require('path');
const fs = require('fs');

const player = require('./modules/player.js');
const config = require('./config.json');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html></html>');
  res.end();
  switch(req.url) {
    case '/play':
      play();
      break;
    case '/stop':
      stop();
      break;
    case '/skip':
      skip();
      break;
    default:
      break;
  }  
}).listen(config.port);


async function play() {
  let files = fs.readdirSync(config.storagePath);
  for(let file of files) {
    await player.play(path.join(config.storagePath, file)).catch(e => {
      console.log(e);
    });
  }
}

function stop() {
  player.stop();
}

function skip() {
  
}