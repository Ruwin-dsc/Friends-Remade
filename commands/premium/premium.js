const Discord = require('discord.js');
const config = require('../../config.json')
exports.help = { 
    name:"premium",
    category: 'premium',
    description: "Passe au niveau supérieur !",
    permission: "Aucune permission nécessaire"
} 

exports.run = async (bot, message, args) => {
    if(!args[0]) return message.reply(`:x: Veuillez indiquer une clé !`)
    else {
    const embed = new Discord.EmbedBuilder()
    .setTitle(`La clé de licence est invalide !`)
    .setDescription(`
    \`❌\` Pour devenir premium, tu dois te rendre sur [\`le site\`](https://discord.gg/zcN3sB5KSv) et acheter notre premium. Une fois l'offre achetée, tu recevras une clé premium que tu devras mettre dans cette commande.

    > Tu peux consulter les avantages des serveurs premium sur la même page.

    **Si tu as des questions n'hésites pas à rejoindre le [\`serveur support\`](https://discord.gg/zcN3sB5KSv).**
    `)
    .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
    .setColor('Blue')

    message.reply({ embeds: [embed] })
    }
}