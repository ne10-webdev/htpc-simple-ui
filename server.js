const fs = require('fs');
const http = require('http');

const player = require('./modules/player.js');
const config = require('./config.json');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(fs.readFileSync('index.html'));
  res.end();
  switch(req.url) {
    case '/play':
      player.playAll();
      break;
    case '/stop':
      player.stop();
      break;
    case '/skip':
      player.skip();
      break;
    default:
      break;
  }  
}).listen(config.port);
