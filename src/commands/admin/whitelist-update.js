const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist-update')
        .setDescription('Update/add user on whitelist')
        .addUserOption(option => option.setName('user').setDescription('User to add').setRequired(true))
        .addStringOption(option => option.setName('name').setDescription('Roblox username').setRequired(true)),
    /**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const roblox_name = interaction.options.getString('name');
        // const whitelist = interaction.client.settings.get(interaction.guildId, 'whitelist', []);
        // if (whitelist.includes(user.id)) {
        //     return interaction.reply({
        //         content: `${user.tag} is already whitelisted`,
        //         ephemeral: true
        //     });
        // }
        // whitelist.push(user.id);
        // interaction.client.settings.set(interaction.guildId, 'whitelist', whitelist);
        return interaction.reply({
            content: `${user.username} has been whitelisted`,
        });
    }
}