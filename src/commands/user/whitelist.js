const { SlashCommandBuilder } = require("discord.js");
const DB = require('../../db.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Add Roblox account to whitelist')
        .addStringOption(option => option.setName('name').setDescription('Roblox username').setRequired(true))
        .setDefaultMemberPermissions(0),
    /**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const user = interaction.user;
        const roblox_name = interaction.options.getString('name');

        if (DB.getUser(user.id)) {
            return interaction.reply({
                content: `You are already whitelisted`,
                ephemeral: true
            });
        }

        DB.addUser(user.id, roblox_name);

        return interaction.reply({
            content: `${roblox_name}`,
        });
    }
};
