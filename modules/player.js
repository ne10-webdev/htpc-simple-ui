const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const config = require('../config.json');

let isPlaying,
  playingProcess,
  isToContinue;

async function playAll() {
  isToContinue = true;
  let files = fs.readdirSync(config.storagePath);
  for(let file of files) {
    // skip non video files
    if(!['.mp4', '.mkv', '.webm'].includes(path.extname(file).toLowerCase())) {
      continue;
    }
    if(!isToContinue) {
      break;
    }
    await play(path.join(config.storagePath, file)).catch(e => {
      console.log(e);
    });
  }
}

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
  isToContinue = false;
  skip();
}

function skip() {
  if(!isPlaying) {
    return;
  }
  spawn('pkill', [config.player]);
  isPlaying = false;
}

module.exports = {
  playAll,
  play,
  stop,
  skip
}