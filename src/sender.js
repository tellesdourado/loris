const { requestConfigurator } = require("./requestConfigurator");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sender = async (connection, target, port = 80) => {
  const request = requestConfigurator(target);

  const options = { port, host: target };

  const sock = connection.connect(options, async () => {
    try {
      var interator = 0;
      sock.write("GET / HTTP/1.1\r\n");

      while (request[interator]) {
        var line = request[interator++];
        console.info(line);
        sock.write(line);
        await sleep(50);
      }
    } catch (e) {
      Promise.reject();
    }
  });

  sock.setTimeout(0);

  sock.on("error", (err) => {
    console.log(err);
    Promise.reject();
  });
};

module.exports = { sender };
