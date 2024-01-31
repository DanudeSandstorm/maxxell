const { SlashCommandBuilder } = require("discord.js");
const DB = require("../../db");

const booster_role = "1076643576303341620";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('displaylist')
        .setDescription('view whitelist')
        .setDefaultMemberPermissions(0),
    /**
     * @param {import('discord.js').ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        if (!['1069012828159221812', '1184949523177553982'].includes(interaction.channel.id)) {
            return interaction.reply({ content: 'This command can not be used in this channel', ephemeral: true });
        }

        await interaction.deferReply();

        const users = DB.getUsers();
        const ids = users.map(user => user.discord_id);

        /** @type {import('discord.js').Collection<string, import('discord.js').GuildMember>} */
        const members = await interaction.guild.members.fetch({ user: ids });

        let excluded = [];
        const boosters = users.filter(({ discord_id }) => {
            const member = members.get(discord_id);
            if (!member || !members.get(discord_id).roles.cache.has(booster_role)) {
                excluded.push(discord_id);
                return false;
            }
            return true;
        });

        const lists = [];
        let message = "";

        for (const booster of boosters.values()) {
            if (message.length + booster.roblox_name.length + 4 > 4000) {
                lists.push(message);
                message = "";
            }
            message += `"${booster.roblox_name}", `;
        }
        if (message) lists.push(message.slice(0, -2)); // remove trailing comma

        for (const content of lists) {
            await interaction.channel.send({
                content,
            });
        }


        await interaction.followUp({
            content: 'Sent whitelist',
            ephemeral: true
        });

        DB.removeUsers(excluded);

        return Promise.resolve();
    }
};
