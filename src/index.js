import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';

const client = new Client({ 
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages ], 
    partials: [ Partials.Channel ]
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Logged in as ${readyClient.user.tag}`);
});

if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('No token provided');
}

client.login(process.env.DISCORD_BOT_TOKEN);
