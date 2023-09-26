module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log("\x1b[34m%s\x1b[0m",`${client.user.username} - (${client.user.tag}) is logged in and online.`);
  },
};
