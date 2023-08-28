const Discord = require('discord.js');
const config = require('../../config.json')
exports.help = { 
    name:"top",
    category: 'bump',
    description: "Permet de voir les 20 serveurs ayant le plus de bumps.",
    permission: "Aucune permission nécessaire"
} 

exports.run = async (bot, message, args) => {
    if(args[0] == "bump") {
    let description = "", number = 1, emoji
    bot.db.query(`SELECT * FROM bump`, async (err, req) => {
        const Ordre2 = req.sort((a, b) => b.bump - a.bump);

        for (const row of Ordre2.slice(0, 20)) {
            const guild = bot.guilds.cache.get(row.guildId)
            if(guild) {
                const invite = row.invite
                if(invite !== null) {
                    const bump = row.bump
                    if(bump !== "0") {
                        if(number == 1) emoji = "🥇"
                        else if(number == 2) emoji = "🥈"
                        else if(number == 3) emoji = "🥉"
                        else emoji = `\`#${number}\``
                        description += `> ${emoji} [\`${message.guild.name}\`](${invite}) **qui a ${bump} bumps**\n`
                        number++
                    }
                }
            }
        }
        if(description === "") description = "Aucun résultat"

        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: bot.user.tag, iconURL: bot.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/zcN3sB5KSv" })
        .setTitle(`Top 20 des serveurs ayant le plus de bumps`)
        .setDescription(description)
        .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
        .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor('Blue')
        .setTimestamp()

        message.reply({ embeds: [embed] })
    })
} else if(args[0] == "vote") {
    let description = "", number = 1, emoji
    bot.db.query(`SELECT * FROM bump`, async (err, req) => {
        const Ordre2 = req.sort((a, b) => b.vote - a.vote);

        for (const row of Ordre2.slice(0, 3)) {
            const guild = bot.guilds.cache.get(row.guildId)
            if(guild) {
                const invite = row.invite
                if(invite !== null) {
                    const bump = row.bump
                    if(bump !== "0") {
                        if(number == 1) emoji = "🥇"
                        else if(number == 2) emoji = "🥈"
                        else if(number == 3) emoji = "🥉"
                        else emoji = `\`#${number}\``
                        description += `> ${emoji} [${message.guild.name}](${invite}) **qui a ${guild.memberCount} membres**\n`
                        number++
                    }
                }
            }
        }
        if(description === "") description = "Aucun résultat"

        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: bot.user.tag, iconURL: bot.user.displayAvatarURL({ dynamic: true }), url: "https://discord.gg/zcN3sB5KSv" })
        .setTitle(`Top 3 des serveurs les plus votés !`)
        .setDescription(description)
        .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145717757241987092/Untitled_Project_2.jpg?width=1623&height=1419`)
        .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor('Blue')
        .setTimestamp()

        const bottoncounter2 = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setLabel(`Clique ici pour voir le TOP 10 !`)
                                .setEmoji(`✨`)
                                .setURL('https://discord.gg/zcN3sB5KSv')
                                .setStyle(Discord.ButtonStyle.Link)
                            )

        message.reply({ embeds: [embed], components: [bottoncounter2] })
    })
}

}