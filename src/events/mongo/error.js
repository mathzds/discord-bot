module.exports = {
  name: "connected",
  execute(error) {
    console.log("\x1b[32m%s\x1b[0m", `Database Connection Error\n${error}`);
  },
};
