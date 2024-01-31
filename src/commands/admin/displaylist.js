const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('displaylist')
        .setDescription('view whitelist'),
    /**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        // const whitelist = interaction.client.settings.get(interaction.guildId, 'whitelist', []);
        // if (whitelist.includes(user.id)) {
        //     return interaction.reply({
        //         content: `${user.tag} is already whitelisted`,
        //         ephemeral: true
        //     });
        // }
        // whitelist.push(user.id);
        // interaction.client.settings.set(interaction.guildId, 'whitelist', whitelist);
        // return interaction.reply({
        //     content: `${user.username} has been whitelisted`,
        //     ephemeral: true
        // });
        return Promise.resolve();
    }
}
