const exec = require('child_process').exec;
const net = require('net');
const PORT = 8080; // webpack-dev-server port

process.env.ELECTRON_START_URL = `http://localhost:${PORT}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({ port: PORT }, () => {
    client.end();
    if (!startedElectron) {
      console.log('Starting electron!');
      startedElectron = true;
      exec('npm start');
    }
  }
);

client.on('error', (error) => {
    console.log(`no connection on port ${PORT}, trying again in 1 sec`);
    setTimeout(tryConnection, 1000);
});

tryConnection();