const { Events, ChannelType} = require("discord.js")

module.exports = {
	name: Events.MessageCreate,
	execute: async(message) => {

    if (message.channel.type === ChannelType.DM ) return;

/**
 * Leaving this here in case you want to make prefix commands
 */
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