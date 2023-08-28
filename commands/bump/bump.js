const Discord = require('discord.js');
const config = require('../../config.json')

const cooldownTime = 2 * 60 * 60;

const cooldownsbump = new Map();

exports.help = { 
    name:"bump",
    category: 'bump',
    description: "Permet de bump le serveur.",
    permission: "Aucune permission nécessaire"
} 

exports.run = async (bot, message, args) => {
    if (cooldownsbump.has(message.guild.id)) {
        const cooldownExpiration = cooldownsbump.get(message.guild.id) + cooldownTime;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const hours = Math.floor(remainingCooldown / 3600);
            const minutes = Math.floor((remainingCooldown % 3600) / 60);
            const seconds = Math.floor(remainingCooldown % 60);

            const CouldownEmbed = new Discord.EmbedBuilder()
            .setDescription(`\`⏱️\` **Tu dois attendre \`${hours}\` heure, \`${minutes}\` minutes & \`${seconds}\` secondes**`)

            return message.reply({ embeds: [CouldownEmbed] });
        }
    }

    let nodesc = "", servNumber = 0, nodesc2 = "", nochannel = ""
    bot.db.query(`SELECT * FROM bump WHERE guildId = "${message.guild.id}"`, async (err, req) => {
        const embed = new Discord.EmbedBuilder()
        .setDescription(`**\`❌\` Tu dois faire la commande \`${config.prefix}config bump invitation\` afin de créer une invitation !**`)
        .setColor("Blue")
        if(req.length < 1) return message.reply({ embeds: [embed] })
        if(req[0].invite == null) return message.reply({ embeds: [embed] })

        if(req[0].description == null) nodesc = `
        \`❌\` Aucune description n'a été définie pour ce serveur !
        > **Tu peux en mettre une via la commande \`${config.prefix} bump description\`**
        `
        const channelBump = message.guild.channels.cache.get(req[0].salon)
        if(!channelBump) nochannel = `
        \`🤩\` Découvre plein de serveurs trop cool ici même !
        > **Tu peux mettre un salon d'arrivée de bumps via la commande \`${config.prefix}config bump salon\`.**
        `

        const description = req[0].description
        const bump = Number(req[0].bump) + 1
        const invite = req[0].invite

        bot.db.query(`SELECT * FROM bump WHERE guildId = "${message.guild.id}"`, async (err, req) => {

            for(const row of req) {
                const channel = bot.channels.cache.get(row.salon)
                if(channel) {
                    if(description !== null) nodesc2 = `
                    **Description du serveur**
                    ${description}
                    `

                    const embed3 = new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.guild.name}・BUMP !`, iconURL: message.guild.iconURL(), url: "https://discord.gg/zcN3sB5KSv" })
                    .setDescription(`
                    Informations du serveur
                    > [\`${message.guild.name}\`](${invite}) vient d'être bump !
                    > Ce serveur possède \`${message.guild.memberCount}\` membres 👥
                    > Ce serveur a été bump \`${bump}\` fois 🌟

                    ${nodesc2}
                    `)
                    .setFooter({ text: `Bump par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)

                    const bottoncounter = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setLabel(`Ajouter WhiteHall`)
                                .setEmoji(`<:whitehall:1145375041584889956>`)
                                .setURL(`https://discord.com/api/oauth2/authorize?client_id=1128625929523036160&permissions=8&scope=applications.commands%20bot`)
                                .setStyle(Discord.ButtonStyle.Link),
                                new Discord.ButtonBuilder()
                                .setLabel(message.guild.name)
                                .setEmoji(`🌐`)
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL(`${invite}`),
                                new Discord.ButtonBuilder()
                                .setCustomId("info")
                                .setEmoji(`ℹ️`)
                                .setStyle(Discord.ButtonStyle.Primary),
                            )
                        
                    const msg = await channel.send({ content: invite, embeds: [embed3], components: [bottoncounter] })
                    servNumber++

                    const collector = await msg.createMessageComponentCollector({})

                    collector.on('collect', async (interaction) => {
                        if(interaction) {

                            const embed6 = new Discord.EmbedBuilder()
                            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL(), url: "https://discord.gg/zcN3sB5KSv" })
                            .setDescription(`
                            🔍 **Informations sur le serveur**\`\`\`apache\nNom             ➜ ${message.guild.name}\nID              ➜ ${message.guild.id}\nOwner           ➜ ${message.guild.ownerId}\nInvite Perso    ➜ ${message.guild.vanityURLCode || "❌"}\n\`\`\`\n👥 **Membres**\n\`\`\`apache\nTotal Membres  ➜ ${message.guild.memberCount}\n\`\`\`
                            `)
                            .setThumbnail(message.guild.iconURL())

                            const bottoncounter2 = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setLabel(message.guild.name)
                                .setEmoji(`🌐`)
                                .setURL(invite)
                                .setStyle(Discord.ButtonStyle.Link)
                            )

                            interaction.reply({ embeds: [embed6], components: [bottoncounter2], ephemeral: true})
                        }
                    })
                }
            }
            const embed2 = new Discord.EmbedBuilder()
            .setTitle(`Retrouves les BUMPS sur notre site !`)
            .setAuthor({ name: `${message.guild.name}・BUMP !`, url: "https://discord.gg/zcN3sB5KSv" })
            .setDescription(`
            > Bump effectué avec **succès** en \`${bot.ws.ping}ms\`
            > [Clique ici pour voir où ton serveur a été envoyé !](https://discord.gg/zcN3sB5KSv)

            ${nodesc}

            ${nochannel}
            `)
            .setURL(`https://discord.gg/zcN3sB5KSvs`)
            .setColor('Blue')
            .setTimestamp()
            .setFooter({ text: `Le serveur a été envoyé dans ${servNumber} serveurs d'arrivées de bumps.` })
            bot.db.query(`UPDATE bump SET bump = bump + 1 WHERE guildId = ${message.guild.id}`);

            cooldownsbump.set(message.guild.id, Math.floor(Date.now() / 1000));

            message.channel.send({ embeds: [embed2] })
        })
        

    })
}