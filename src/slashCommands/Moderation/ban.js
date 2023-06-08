const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('ban a user from the guild')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Mention a user')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('reason')
        .setDescription('Provide a reason')
        .setRequired(false)
    )
    ,
    async execute(interaction, client) {
        let colorb = await client.db.get(`embedcolor_${interaction.guild.id}`)
        let embedColor = colorb;
        if (!colorb) embedColor = 0x00ffff;
        const member = interaction.options.getMember('user');
        let reason = interaction.options.getString('reason');
        if (!reason) {
            reason = 'No reason was provided';
        };

        if (!interaction.guild.members.me.permissions.has([PermissionFlagsBits.BanMembers])) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("***You don't have the permission to do that!***")
                    .setColor(0xcc0000)
                ]
            });
        }

        if (!interaction.member.permissions.has([PermissionFlagsBits.BanMembers]))
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xcc0000)
                    .setTitle("***You don't have the permission to do that!***")
                ]
            });


        if (interaction.user.id === member) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`***Hey ${interaction.author.username} you can't ban yourself!***`)
                    .setColor(embedColor)
                ]
            });
        }
        try {

            await member.ban({ reason: `${reason}` });
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(`***${member} has been banned permamently.***`)
                    .setColor(embedColor)
                ]
            })


            if (!reason) reason = 'No reason was provided';
            return client.modLog(
                interaction, `<@${interaction.user.id}> banned ${member.id} | ${member.user.username}. \n Reason: ${reason}`);

        } catch (e) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("***I can't find this user or I cant ban this user.***")
                    .setColor(0xfff700)
                ]
            })
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