const { SlashCommandBuilder, Collection } = require("discord.js");
const chunkArray = require("../../utils/chunkArray");
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
        await interaction.deferReply();

        const users = DB.getUsers();
        const user_ids = users.map(user => user.discord_id);

        /** @type {Collection<string, import('discord.js').GuildMember>} */
        const members = new Collection();

        const chunks = chunkArray(user_ids, 100);
        for (const ids of chunks) {
            const fetched = await interaction.guild.members.fetch({ user: ids });
            members.concat(fetched);
        }

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

        return interaction.followUp({
            content: 'Sent whitelist',
            ephemeral: true
        });
    }
};
