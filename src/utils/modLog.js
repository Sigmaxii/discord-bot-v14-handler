const Database = require('./Database.js');
const { EmbedBuilder } = require('discord.js');
const database = new Database();
module.exports = {
    modLog: async function(i, text) {
        if (i, text) {
          try {

            /**
             * Define the mod log channel
             */
            let channel = await database.get(`modlog_${i.guild.id}`);
            const modChannel = i.guild.channels.cache.get(channel);
            if (!modChannel) return null;

            /**
             * Custom guild embed color
             */
            let colorb = await database.get(`embedcolor_${i.guild.id}`)
            let embedColor = colorb;
            if (!colorb) embedColor = 0x00ffff;
            
            /** 
             * Send Mod Log
            */
            if (channel) {
              var embed = new EmbedBuilder();
              embed.setTitle("Moderation Logs");
              embed.setDescription(`${text} \n <t:${(Date.now() / 1000) | 0}:R>`);
              embed.setColor(embedColor);
              await modChannel.send({ embeds: [embed] })
              .catch((e) => {
                 console.error(e)
                 });
            }
          } catch (e) {
            console.error(e);
          }
        }
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