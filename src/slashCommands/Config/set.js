const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Configure events!')
        .addSubcommand(subcommand =>
            subcommand
            .setName("modlogs").setDescription("Setup modlogs!")
            .addChannelOption(option =>
                option
                .setName('channel')
                .setDescription('Enter modlog channel for this guild')
                .setRequired(true)

            ))
        .addSubcommand(subcommand =>
            subcommand
            .setName("embedcolor").setDescription("Setup custom bot embed color for this guild")
            .addStringOption(option =>
                option
                .setName('color')
                .setDescription('Enter a color for the embeds. e.x. #ff0000')
                .setRequired(true)

            ))


    ,
    async execute(interaction, client) {

        switch (interaction.options.getSubcommand()) {
            case "moglogs":
            default:
                {

                    let colorb = await client.db.get(`embedcolor_${interaction.guild.id}`)
                    let embedColor = colorb;
                    if (!colorb) embedColor = 0x00FFFF;

                    let channel = interaction.options.getChannel('channel');


                    if (!interaction.guild.members.me.permissions.has([PermissionFlagsBits.ManageChannels]))
                        return interaction.reply({ content: "**You Do Not Have The Required Permissions! - [MANAGE_CHANNELS]**" })

                    if (!interaction.member.permissions.has("MANAGE_CHANNELS"))
                        return interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                .setColor(0xcc0000)
                                .setTitle("***You don't have the permission to do that!***")
                            ]
                        });

                    if (!channel) {
                        let b = await client.db.get(`modlog_${interaction.guild.id}`);
                        let channelName = interaction.guild.channels.cache.get(b);
                        try {
                            if (interaction.guild.channels.cache.has(b)) {
                            return interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor(embedColor)
                                    .setTitle(`**Moderation log channe is already set in: \`${channelName.name}\`!**`)
                                ]
                            });
                        }
                    } catch (e) {
                        console.log(e)
                            return interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor(0xfff700)
                                    .setTitle("**Please Enter A Valid Channel Name or ID To Set!**")
                                ]
                            });}
                    }

                    if (channel.type != ChannelType.GuildText ) return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                            .setColor(0xfff700)
                            .setTitle("**Please enter a text channel!**")
                        ]
                    });

                    try {
                        let a = await client.db.get(`modlog_${interaction.guild.id}`)

                        if (channel.id === a) {
                            return interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor(embedColor)
                                    .setTitle("**This channel is already set as mod log channel.**")
                                ]
                            })
                        } else {
                            client.guilds.cache.get(interaction.guild.id).channels.cache.get(channel.id).send({
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor(embedColor)
                                    .setTitle("**Mod Log channel has been set succesfully**")
                                ]
                            })
                            client.db.set(`modlog_${interaction.guild.id}`, channel.id)

                            interaction.reply({
                                content: `${channel.name}`,
                                embeds: [
                                    new EmbedBuilder()
                                    .setColor(embedColor)
                                    .setTitle(`**Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`)
                                ]
                            })
                        }
                    } catch (e) {
                        return interaction.reply({ content: "**Error - `Missing Permissions Or Channel Is Not A Text Channel!`** " + e });
                    }
                    break;
                }
            case "embedcolor":
                {
                    let colorb = await client.db.get(`embedcolor_${interaction.guild.id}`)
                    let embedColor = colorb;
                    if (!colorb) embedColor = 0x00FFFF;
                    let color = interaction.options.getString('color');
                    var isHexcolor = require('is-hexcolor')
                    if (!isHexcolor(color)) {
                        const embed2 = new EmbedBuilder()
                            .setDescription("Thats not a valid color try using [HEX color](https://g.co/kgs/51SG1x) code \ne.x. #00ffff")
                            .setColor(embedColor)
                        return interaction.reply({ embeds: [embed2] });

                    }
                    if (!interaction.guild.members.me.permissions.has([PermissionFlagsBits.ManageGuild]))
                        return interaction.reply({ content: "**I Do Not Have The Required Permissions! - [MANAGE_GUILD]**", ephemeral: true })
                    if (!interaction.member.permissions.has("MANAGE_GUILD"))
                        return interaction.reply({
                            content: "***You don't have the permission to do that!***",
                            ephemeral: true
                        });

                    if (color.length > 7) {
                        const embed = new EmbedBuilder()
                            .setDescription("Thats not a valid color try using [HEX color](https://g.co/kgs/51SG1x) code \ne.x. #00ffff")
                            .setColor(embedColor)
                        return interaction.reply({ embeds: [embed] });
                    }


                    try {
                        let b = await client.db.get(`embedcolor_${interaction.guild.id}`);
                        if (color === b) {
                            return interaction.reply({
                                content: `**Embed color is already set set as: ${color}!**`,
                                ephemeral: true
                            });
                        } else {

                            client.db.set(`embedcolor_${interaction.guild.id}`, color)

                            interaction.reply({
                                embeds: [new EmbedBuilder()
                                    .setColor(color)
                                    .setDescription(`***Embed color ha been set succesfully to ${color}!***`)
                                ],
                                ephemeral: true
                            })
                        }

                    } catch (e) {
                        console.log(e)
                    }
                    break;

                }
                   }
    }
}