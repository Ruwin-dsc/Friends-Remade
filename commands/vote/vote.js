const Discord = require('discord.js');
const config = require('../../config.json')

const cooldownTime = 9 * 60 * 60;

const cooldownsvote = new Map();
const cooldownsvote2 = new Map();

exports.help = { 
    name:"vote",
    category: 'general',
    description: "Permet de voter pour le serveur.",
    permission: "Aucune permission nécessaire"
} 

exports.run = async (bot, message, args) => {
    let vote;
    if (cooldownsvote.has(message.guild.id)) {
        const cooldownExpiration = cooldownsvote.get(message.guild.id) + cooldownTime;
        const remainingCooldown = cooldownExpiration - Math.floor(Date.now() / 1000);

        if (remainingCooldown > 0) {
            const cooldownTImer = cooldownsvote2.get(message.guild.id)
            const CouldownEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.guild.name}`})
            .setDescription(`
            \`❌\` **Tu as déjà voté aujourd'hui !**
            > Reviiens voter ${cooldownTImer}
            `)
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145714338561273947/voteImage.png?width=1540&height=440`)
            .setColor('Blue')
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

            return message.reply({ embeds: [CouldownEmbed] });
        }
    }

    bot.db.query(`SELECT * FROM bump WHERE guildId = "${message.guild.id}"`, async (err, req) => {

        if (req.length < 1) {
            bot.db.query(`INSERT INTO bump (guildId, vote) VALUES ("${message.guild.id}", "1")`);
            vote = 1
          } else {
              bot.db.query(`UPDATE bump SET vote = vote + 1 WHERE guildId = ${message.guild.id}`);
              vote = Number(req[0].vote) + 1
          }

    const time = Date.now() + 9 * 60 * 60 * 1000
    const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: `${message.guild.name}`})
    .setTitle(`Nouveau vote pour ${message.guild.name} !`)
    .setDescription(`
    \`✅\` Bravo \`${message.author.username}\` **tu viens de voter !**
    > Reviens voter <t:${Math.floor(time / 1000)}:R>
    > \`${message.guild.name}\` a donc maintenant **${vote}** votes !
    `)
    .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145705610621501610/Untitled_Project_1.jpg?width=3359&height=959`)
    .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setColor(`Blue`)

    cooldownsvote.set(message.guild.id, Math.floor(Date.now() / 1000));
    cooldownsvote2.set(message.guild.id, `<t:${Math.floor(time / 1000)}:R>`);

    message.reply({ embeds: [embed] })

    })
}