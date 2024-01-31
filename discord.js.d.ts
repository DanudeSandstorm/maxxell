import 'discord.js';
import { SlashCommandBuilder } from 'discord.js';

declare module "discord.js" {
    export interface Command {
        data: SlashCommandBuilder;
        execute: (interaction: CommandInteraction) => Promise<void>;
    }

    export interface Client extends Discord.Client {
        commands: Collection<string, Command>;
        aliases: Collection<string, Command>;
    }

}
