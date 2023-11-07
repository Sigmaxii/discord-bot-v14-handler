module.exports = {
  customId: "test-modal",
  title: "Test Modal",
  execute: async (interaction, client) => {
    const response = interaction.fields.getTextInputValue("test-input");

    interaction
      .reply({
        content: `Your wrote: \n> \`${response}\``,
        ephemeral: true,
      })
      .then(() => {
        client.modLog(
          interaction,
          `${interaction.user} just tested the modal, it works.`
        );
      });
  },
};
