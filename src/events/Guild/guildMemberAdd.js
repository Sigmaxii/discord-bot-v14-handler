const config = require('../../config.js');
module.exports = {
	name: 'guildMemberAdd',
	execute(client, member) {
        if (config.status != 'GLOBAL') {

            let guild = member.guild;
            if (guild.id != '980539403099340841') {
              return; 
            }
            const mcchannel = client.channels.cache.get("1038644279234535504")
            const serverMembers = guild.memberCount;
            mcchannel.setName(`👤・Members: ${serverMembers}`)
          } else {
           let guild = member.guild;
        if (guild.id != '937084834868789278') {
          return; 
        }
          
        /**
         * Member Counter
         */
        const mcchannel = client.channels.cache.get("943272220740943902")
        const serverMembers = guild.memberCount;
        mcchannel.setName(`👤・Members: ${serverMembers}`)
        }
}};

















/**
 * 
 * This template is made by sigmaxii
 * Sigma Bot aka https://sigmaxii.com is running with this template
 * Free to use without credits
 * Just add sigma bot in your server and we're cool 
 * 
 */