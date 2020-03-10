const { spawn } = require('child_process');
const config = require('../config.json');

let isPlaying,
  playingProcess;

function play(file) {
  return new Promise((resolve, reject) => {
    if(isPlaying) {
      reject();
      return;
    }
    isPlaying = true;
    playingProcess = spawn(config.player, [file]);
    playingProcess.on('exit', () => {
      isPlaying = false;
      resolve();
    });
  });
}

function stop() {
  if(!isPlaying) {
    return;
  }
  spawn('pkill', config.player);
  isPlaying = false;
}

module.exports = {
  play,
  stop
}