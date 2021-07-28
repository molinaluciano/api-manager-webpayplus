const os = require("os");
const pkg = require("../../package.json");

function checkHealth(req, res) {
  const data = {
    app: {
      version: pkg.version,
      build: process.env.APP_BUILD || "no-build",
      commit: process.env.APP_COMMIT || "no-commit",
      name: pkg.name,
      environment: process.env.NODE_ENV,
    },
    hostname: os.hostname(),
  };

  return res.status(200).json(data);
}

module.exports = checkHealth;
