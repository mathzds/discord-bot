const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { clientId } = process.env;

module.exports = (client) => {
  client.CommandHandler = async() => {
    const commandFolders = fs.readdirSync('./src/commands');
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        console.log('\x1b[35m',`${command.data.name}`,'\x1b[0m','has succesfully passed through')
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }


    const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    try {
      console.log('\x1b[33m%s\x1b[0m', "Started refreshing application (/) commands.");
      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log('\x1b[32m%s\x1b[0m', "Succesfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};
