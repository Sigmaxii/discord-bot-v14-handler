const fs = require("fs");
var AsciiTable = require("ascii-table");
module.exports = {
  Slash: async function (client) {
    /**
     * Dont touch anything if you dont know what you're doing
     */

    let table = new AsciiTable();
    table.setHeading("Commands", "Status");

    let slashCommands = [];
    const commandsFolder = fs.readdirSync("./src/slashCommands");
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./src/slashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const commandFile = require(`../slashCommands/${folder}/${file}`);

        client.commands.set(commandFile.data.name, commandFile);
        slashCommands.push(commandFile.data.toJSON());

        table.addRow(file, "loaded");
        continue;
      }
    }

    client.application.commands.set(slashCommands);

    return console.log(table.toString(), "\n Loaded Commands");
  },

  Events: async function (client) {
    let table = new AsciiTable();
    table.setHeading("Events", "Status").setBorder("|", "=", "0", "0");

    const folders = fs.readdirSync("./src/events/");
    for (const folder of folders) {
      const files = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of files) {
        const event = require(`../events/${folder}/${file}`);

        if (event.rest) {
          if (event.once)
            client.rest.once(event.name, (...args) =>
              event.execute(...args, client)
            );
          else
            client.rest.on(event.name, (...args) =>
              event.execute(...args, client)
            );
        } else {
          if (event.once)
            client.once(event.name, (...args) =>
              event.execute(...args, client)
            );
          else
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        table.addRow(file, "Loaded");
        continue;
      }
    }

    return console.log(table.toString(), "\n Loaded Events");
  },

  Button: async function (client) {
    const buttonsFolder = fs.readdirSync("./src/utils/buttons");
    const buttonsTable = [];

    for (const buttonFile of buttonsFolder) {
      const buttonModule = require(`../utils/buttons/${buttonFile}`);
      const buttonId = buttonModule.customId;
      const buttonLabel = buttonModule.label;

      const interactionCreateHandler = async (interaction) => {
        if (!interaction.isButton()) return;
        if (interaction.customId !== buttonId) return;

        await buttonModule.execute(interaction, client);
      };

      client.on("interactionCreate", interactionCreateHandler);

      buttonsTable.push({
        Button: buttonFile,
        Label: buttonLabel,
        Status: "Loaded",
      });
    }

    console.log(`${ChalkAdvanced.red("Buttons: ")} ${ChalkAdvanced.gray(">")}`);
    console.table(buttonsTable, ["Button", "Label", "Status"]);
  },

  Modal: async function (client) {
    const modalFolder = fs.readdirSync("./src/utils/modals");
    const modalTable = [];

    for (const modalFile of modalFolder) {
      const modalModule = require(`../utils/modals/${modalFile}`);
      const modalId = modalModule.customId;
      const modalTitle = modalModule.title;

      const interactionCreateHandler = async (interaction) => {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId !== modalId) return;

        await modalModule.execute(interaction, client);
      };

      client.on("interactionCreate", interactionCreateHandler);

      modalTable.push({
        Modal: modalFile,
        Title: modalTitle,
        Status: "Loaded",
      });
    }

    console.log(`${ChalkAdvanced.red("Modals: ")} ${ChalkAdvanced.gray(">")}`);
    console.table(modalTable, ["Modal", "Title", "Status"]);
  },
};

/**
 *
 * This template is made by sigmaxii
 * Sigma Bot aka https://sigmaxii.com is running with this template
 * Free to use without credits
 * Just add sigma bot in your server and we're cool
 *
 */
