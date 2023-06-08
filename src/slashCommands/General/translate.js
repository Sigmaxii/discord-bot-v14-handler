const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translate any text to any language!")
    .addStringOption(option =>
        option
        .setName('text')
        .setDescription('Write a text you want to translate')
        .setRequired(true)
        )
    .addStringOption(option =>
        option
        .setName('language')
        .setDescription('Provide the language you want the text to be translated!')
        .setRequired(true)
        )
        ,
    async execute(interaction, client) {
        const textToTranslate = interaction.options.getString("text");
        const targetLanguageCode = interaction.options.getString("language");
    
        if (!targetLanguageCode) {
          return interaction.reply("Invalid language provided.");
        }

        let colorb = await client.db.get(`embedcolor_${interaction.guild.id}`)
        let embedColor = colorb;
        if (!colorb) embedColor = 0x00ffff;
    
        try {
         await client.translate(interaction, embedColor, textToTranslate, targetLanguageCode);
    } catch (error) {
          console.error("Translation error:", error);
          interaction.reply("Failed to translate the text.");
        }
      }
 };

















/**
 * 
 * This template is made by sigmaxii
 * Sigma Bot aka https://sigmaxii.com is running with this template
 * Free to use without credits
 * Just add sigma bot in your server and we're cool 
 * 
 */