const Discord = require('discord.js');
const config = require('../../config.json')
exports.help = { 
    name:"info",
    category: 'dscgg',
    description: "Permet d'avoir une liste des invitations DSCGG de son serveur.",
    permission: "Aucune permission nécessaire"
} 

exports.run = async (bot, message, args) => {
    if(args[0] == "dscgg") {
        return message.reply(`*Non disponible*`)
    }

}