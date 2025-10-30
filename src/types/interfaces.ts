import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChannelType,
    CommandInteraction,
    Guild,
    Message,
    PermissionsBitField,
    TextChannel
} from "discord.js";
import {
    Categoris,
    CommandOptions
} from "./types";
import DiscordClient from "../models/Client";

export interface SendGuildAlert {
    client: DiscordClient,
    guild: Guild,
    guildChannel?: TextChannel | null,
    isWebhook?: boolean,
    description?: string,
    isLeaved?: boolean
}

export interface PackageJson {
    name: string;
    version: string;
}

export interface CommandOption {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    channel_types?: ChannelType[];
    required?: boolean;
    options?: CommandOptions;
    autocomplete?: boolean;
    choices?: Array<{ name: string, value: string }>;
    default_member_permissions?: PermissionsBitField;
    default_bot_permissions?: PermissionsBitField;
}

export interface CommandType {
    data: {
        id?: string;
        name: string;
        description: string;
        type?: ApplicationCommandType;
        default_member_permissions?: PermissionsBitField;
        default_bot_permissions?: PermissionsBitField;
        dm_permission?: boolean;
        nsfw?: boolean;
        options?: CommandOptions;
    };
    category: Categoris;
    aliases?: string[];
    usage?: string;
    cooldown?: number;
    only_owner?: boolean;
    only_slash?: boolean;
    only_message?: boolean;
    run: (client: DiscordClient, interaction: CommandInteraction | Message, args?: string[]) => Promise<any>;
};

export interface Deletable {
    deletable?: boolean;
    delete(): Promise<void>;
};
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */