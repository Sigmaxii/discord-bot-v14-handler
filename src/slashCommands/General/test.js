const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test button and modal"),
  async execute(interaction, client) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Test Here")
        .setStyle(ButtonStyle.Success)
        .setEmoji("🔗")
    );

    const mainPage = new EmbedBuilder()
      .setColor(0x00ffff)
      .setAuthor({ name: "Test", iconURL: client.user.avatarURL() })
      .setDescription(
        `Testing shi`
      );
    await interaction.reply({
      content: "Oops!",
      embeds: [mainPage],
      components: [row],
    });
  },
};
