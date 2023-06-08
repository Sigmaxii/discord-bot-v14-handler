const googleTranslate  = require("google-translate")("AIzaSyBA0uDqjAIXv_-bYrfvVwS-JjiVeKC3lz4")
const iso6391 = require('iso-639-1');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    trsl: async function(interaction, embedColor, text, targetLanguage) {
        let languageCode;
        if (targetLanguage.length > 3 ){
             languageCode = iso6391.getCode(targetLanguage);
            } else {
                languageCode = targetLanguage;
            }
    
  try {
     await googleTranslate.translate(text, languageCode, function(err, translation) {
       const embed =  new EmbedBuilder()
        .setTitle("Translation Result")
        .setDescription(`**Original Text:**\n> ${text}\n\n**Translated Text:** \n> ${translation.translatedText}`)
        .setFooter({ text: `Target Language: (${targetLanguage})`})
        .setColor(embedColor);
        interaction.reply({embeds: [embed]})
    });
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
}
}
















/**
 * 
 * This template is made by sigmaxii
 * Sigma Bot aka https://sigmaxii.com is running with this template
 * Free to use without credits
 * Just add sigma bot in your server and we're cool 
 * 
 */