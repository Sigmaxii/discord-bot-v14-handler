 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction, client) => {
		if (!interaction.isChatInputCommand()) return;
		const command = client.commands.get(interaction.commandName)
		
		 if (!command) {
			console.log(`No command matching ${interaction.commandName} was found.`);
			return null;
		}
        await command.execute(interaction, client)
		 },
  }
  
















/**
 * 
 * This template is made by sigmaxii
 * Sigma Bot aka https://sigmaxii.com is running with this template
 * Free to use without credits
 * Just add sigma bot in your server and we're cool 
 * 
 */