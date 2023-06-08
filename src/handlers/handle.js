const fs = require('fs');
var AsciiTable = require('ascii-table');
module.exports = {
    Slash: async function(client) {

        /**
         * Dont touch anything if you dont know what you're doing
         */


        let table = new AsciiTable();
        table.setHeading("Commands", "Status");

        let slashCommands = [];
        const commandsFolder = fs.readdirSync('./src/slashCommands');
        for ( const folder of commandsFolder) {
            const commandFiles = fs.readdirSync(`./src/slashCommands/${folder}`).filter((file) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const commandFile = require(`../slashCommands/${folder}/${file}`);
                
                client.commands.set(commandFile.data.name, commandFile);
                slashCommands.push(commandFile.data.toJSON());

                table.addRow(file, "loaded");
                continue;
            }
        }

        client.application.commands.set(slashCommands);

        return console.log(table.toString(),'\n Loaded Commands');
    },

    Events: async function(client) {
        let table = new AsciiTable();
        table.setHeading('Events', 'Status').setBorder('|', '=', "0", "0");
        
        const folders = fs.readdirSync('./src/events/');
        for (const folder of folders) {
        const files = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const event = require(`../events/${folder}/${file}`);

            if (event.rest) {
                if(event.once)
                client.rest.once(event.name, (...args) =>
                event.execute(...args, client)
                );
                else 
                client.rest.on(event.name, (...args) =>
                event.execute(...args, client)
                );

            } else {
                if (event.once)
                client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args,client))
            }
            table.addRow(file, 'Loaded');
            continue;
                    
        }       
    }
    
        return console.log(table.toString(), "\n Loaded Events")
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