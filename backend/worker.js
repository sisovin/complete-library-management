const { Worker } = require('worker_threads');
const path = require('path');

const workerPath = path.resolve(__dirname, 'worker.js');

const worker = new Worker(workerPath);

worker.on('message', (message) => {
  console.log(`Worker message: ${message}`);
});

worker.on('error', (error) => {
  console.error(`Worker error: ${error}`);
});

worker.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
});

module.exports = worker;
