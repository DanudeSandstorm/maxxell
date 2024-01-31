const { SlashCommandBuilder } = require("discord.js");
const DB = require('../../db.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist-update')
        .setDescription('Update/add user on whitelist')
        .addUserOption(option => option.setName('user').setDescription('User to add').setRequired(true))
        .addStringOption(option => option.setName('name').setDescription('Roblox username').setRequired(true))
        .setDefaultMemberPermissions(0),
    /**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        if (!['1069012828159221812', '1184949523177553982'].includes(interaction.channel.id)) {
            return interaction.reply({ content: 'This command can not be used in this channel', ephemeral: true });
        }
        

        const user = interaction.options.getUser('user');
        const roblox_name = interaction.options.getString('name');

        DB.updateUser(user.id, roblox_name);

        return interaction.reply({
            content: `${user.username} whitelisted as ${roblox_name}`,
            ephemeral: true
        });
    }
};
