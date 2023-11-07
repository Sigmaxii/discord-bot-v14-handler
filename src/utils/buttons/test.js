const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
module.exports = {
  customId: "test-button",
  label: "Testing Button",
  execute: async (interaction, client) => {
    const bug = new ModalBuilder()
      .setCustomId("test-modal")
      .setTitle("Title")
      .addComponents([
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("test-input")
            .setLabel("Label")
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(69)
            .setMaxLength(420)
            .setPlaceholder("Placeholder")
            .setRequired(true)
        ),
      ]);

    await interaction.showModal(bug);
  },
};
