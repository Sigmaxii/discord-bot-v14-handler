const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const config = require('../config.js');
const Database = require('../utils/Database.js');
const { Slash, Events, Button, Modal }  = require('../handlers/handle.js');


module.exports = {
    Sigma: class Sigma extends Client {
        constructor() {
            super({
                allowedMentions: {
                    parse: ["roles", "users", "everyone"],
                    repliedUser: false
                },
                shards: 'auto',
                intents: [
                    GatewayIntentBits.Guilds, 
                    GatewayIntentBits.GuildMembers, 
                    GatewayIntentBits.GuildIntegrations, 
                    GatewayIntentBits.GuildVoiceStates, 
                    GatewayIntentBits.GuildMessages, 
                    GatewayIntentBits.GuildMessageReactions, 
                    GatewayIntentBits.GuildMessageTyping, 
                    GatewayIntentBits.DirectMessages, 
                    GatewayIntentBits.DirectMessageReactions, 
                    GatewayIntentBits.MessageContent
                ],
            });
            
            this.commands = new Collection()
            this.slashCommands = new Collection()
            this.commandaliases = new Collection()
            this.config = config;
            this.db = new Database();
            this.modLog = require('../utils/modLog.js').modLog;
            this.translate = require('../utils/translate.js').trsl;

            process.on("unhandledRejection", e => {
                console.log(e)
            })
            process.on("uncaughtException", e => {
                console.log(e)
            })
            process.on("uncaughtExceptionMonitor", e => {
                console.log(e)
            })
 
 
        }
        connect() {
            if(this.config.status === 'GLOBAL'){
                super.login(this.config.token).then(() => {
                    Slash(this, this.id);
                    Events(this);
                    Button(this);
                    Modal(this);
                    this.db.connect();
                })
            } else {
                super.login(this.config.betatoken).then(() => {
                    Slash(this)
                    Events(this)
                    Button(this);
                    Modal(this);
                    this.db.connect();
                })
            }
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