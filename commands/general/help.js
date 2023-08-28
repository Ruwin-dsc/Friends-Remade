const Discord = require('discord.js');
const config = require('../../config.json')
exports.help = { 
    name:"help",
    category: 'general',
    description: "Permet de voir le menu d'aide.",
    permission: "Aucune permission nécessaire"
} 

exports.run = async (bot, message, args) => {
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: bot.user.tag, iconURL: bot.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/zcN3sB5KSv" })
    .setTitle(`Bienvenue sur ma page d'aide ${message.author.username} !`)
    .setDescription(`
    Grâce au menu déroulant situé juste en dessous, tu pourras découvrir toutes ces catégories de commandes :

    > 📡 bump
    > 📩 Vote 
    > 🔗 DSCGG
    > 🌟 Premium
    > 🛠️ Modération (ez à faire toi fait le)
    > 🧭 Utilitaire (ez à faire toi fait le)

    Tu as des **questions** ? Tu as trouvé(e) un **bug ou une faute d'orthographe** ? Ou tu souhaites tout simplement **suivre** Friend's, rejoins le [\`serveur support\`](https://discord.gg/zcN3sB5KSv) dès maintenant ! **CE BOT N'EST QU'UN REMADE**
    `)
    .setImage(`https://images-ext-2.discordapp.net/external/-J4jG74NnZSZ-S7YOuCFR-kHEowDn9B2obdZ2qwALZ8/https/cdn.friends-bot.com/img/barre.png?width=1139&height=72`)
    .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setColor('Blue')

    const bottoncounter = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setLabel(`Invite`)
                                .setEmoji(`📩`)
                                .setURL(`https://discord.com/api/oauth2/authorize?client_id=1128625929523036160&permissions=8&scope=applications.commands%20bot`)
                                .setStyle(Discord.ButtonStyle.Link),
                                new Discord.ButtonBuilder()
                                .setLabel("Support")
                                .setEmoji(`🔧`)
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL(`https://discord.gg/zcN3sB5KSv`),
                                new Discord.ButtonBuilder()
                                .setLabel("Site")
                                .setEmoji(`🌐`)
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL(`https://discord.gg/zcN3sB5KSv`),
                                new Discord.ButtonBuilder()
                                .setLabel("Premium")
                                .setEmoji(`<:whitehall:1145375041584889956>`)
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL(`https://discord.gg/zcN3sB5KSv`),
                            )

                            let menuoptions = new Discord.StringSelectMenuBuilder()
                            .setCustomId('MenuSelection')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Cliques ici pour voir les commandes")
                            .addOptions(
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel(`Bump`)
                                .setEmoji('📡')
                                .setValue("bumphelp"),
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel(`Vote`)
                                .setEmoji('📩')
                                .setValue("votehelp"),
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel(`DSCGG`)
                                .setEmoji('🔗')
                                .setValue("dscgghelp"),
                                new Discord.StringSelectMenuOptionBuilder()
                                .setLabel(`Premium`)
                                .setEmoji('🌟')
                                .setValue("premiumhelp"),
                            )

    const msg = await message.reply({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents(menuoptions), bottoncounter] })

    const collector = await msg.createMessageComponentCollector({})

    collector.on('collect', async (interaction) => {
        const noautorisation = new Discord.EmbedBuilder()
        .setDescription(`\`❌\` Tu ne peux pas utiliser cette interaction car tu n'es pas l'auteur de la commande, ou bien le délai d'exécution de la commande est dépassé !`)

        if(interaction.user.id !== message.author.id) return interaction.reply({ embeds: [noautorisation], ephemeral: true })

        if(interaction.customId == "back_help") {
            interaction.deferUpdate()
            msg.edit({ embeds: [embed], components: [new Discord.ActionRowBuilder().addComponents(menuoptions), bottoncounter] })
        } else if(interaction.values[0] == "bumphelp") {
            interaction.deferUpdate()
            const embed2 = new Discord.EmbedBuilder()
            .setAuthor({ name: bot.user.tag, iconURL: bot.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/zcN3sB5KSv" })
            .setTitle(`Voici mes commandes Bump.`)
            .setDescription(`
            \`${config.prefix}bump\`
            > **Permission :** Aucune permission nécessaire.
            > **Description :** Permet de bump le serveur.

            \`${config.prefix}config bump invitation\`
            > **Permission :** Administrateur.
            > **Description :** Permet de créer une invitation pour le bump.

            \`${config.prefix}config bump description\`
            > **Permission :** Administrateur.
            > **Description :** Permet de mettre une description pour son serveur.

            \`${config.prefix}config bump catégories\`
            > **Permission :** Administrateur.
            > **Description :** Permet de configurer les catégories pour son serveur.

            \`${config.prefix}config bump salon\`
            > **Permission :** Administrateur.
            > **Description :** Permet de recevoir les bumps sur son serveur.

            \`${config.prefix}config bump supprimer\`
            > **Permission :** Administrateur.
            > **Description :** Permet de ne plus recevoir les bumps sur son serveur.

            \`${config.prefix}top bump\`
            > **Permission :** Aucune permission nécessaire.
            > **Description :** Permet de voir les 20 serveurs ayant le plus de bumps.
            `)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('Blue')
            .setTimestamp()

            const bottoncounter2 = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setLabel(`Retour`)
                                .setEmoji(`↩️`)
                                .setCustomId(`back_help`)
                                .setStyle(Discord.ButtonStyle.Secondary),
                            )

            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(menuoptions), bottoncounter2] })
        } else if(interaction.values[0] == "votehelp") {
            interaction.deferUpdate()
            const embed2 = new Discord.EmbedBuilder()
            .setAuthor({ name: bot.user.tag, iconURL: bot.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/zcN3sB5KSv" })
            .setTitle(`Voici mes commandes Vote.`)
            .setDescription(`
            \`${config.prefix}vote\`
            > **Permission :** Aucune permission nécessaire.
            > **Description :** Permet de voter pour le serveur..

            \`${config.prefix}top vote\`
            > **Permission :** Aucune permission nécessaire.
            > **Description :** Permet de voir le top 3 des serveurs ayant le plus de votes.
            `)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('Blue')
            .setTimestamp()

            const bottoncounter2 = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setLabel(`Retour`)
                                .setEmoji(`↩️`)
                                .setCustomId(`back_help`)
                                .setStyle(Discord.ButtonStyle.Secondary),
                            )

            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(menuoptions), bottoncounter2] })
        } else if(interaction.values[0] == "dscgghelp") {
            interaction.deferUpdate()
            const embed2 = new Discord.EmbedBuilder()
            .setAuthor({ name: bot.user.tag, iconURL: bot.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/zcN3sB5KSv" })
            .setTitle(`Voici mes commandes DSCGG.`)
            .setDescription(`
            \`${config.prefix}config dscgg\`
            > **Permission :** Administrateur.
            > **Description :** Permet de configurer les invitations DSCGG.

            \`${config.prefix}info dscgg\`
            > **Permission :** Aucune permission nécessaire.
            > **Description :** Permet d'avoir une liste des invitations DSCGG de son serveur.
            `)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('Blue')
            .setTimestamp()

            const bottoncounter2 = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setLabel(`Retour`)
                                .setEmoji(`↩️`)
                                .setCustomId(`back_help`)
                                .setStyle(Discord.ButtonStyle.Secondary),
                            )

            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(menuoptions), bottoncounter2] })
        } else if(interaction.values[0] == "premiumhelp") {
            interaction.deferUpdate()
            const embed2 = new Discord.EmbedBuilder()
            .setAuthor({ name: bot.user.tag, iconURL: bot.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/zcN3sB5KSv" })
            .setTitle(`Voici mes commandes DSCGG.`)
            .setDescription(`
            \`${config.prefix}premium\`
            > **Permission :** Aucune permission nécessaire.
            > **Description :** Passe au niveau supérieur !

            \`${config.prefix}config premium\`
            > **Permission :** Administrateur.
            > **Description :** Permet de configurer le premium (auto-bump et reminder).
            `)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('Blue')
            .setTimestamp()

            const bottoncounter2 = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setLabel(`Retour`)
                                .setEmoji(`↩️`)
                                .setCustomId(`back_help`)
                                .setStyle(Discord.ButtonStyle.Secondary),
                            )

            msg.edit({ embeds: [embed2], components: [new Discord.ActionRowBuilder().addComponents(menuoptions), bottoncounter2] })
        }


        })

}