const Discord = require('discord.js');
const config = require('../../config.json')

exports.help = { 
    name:"config",
    category: 'bump',
    description: "Permet de configurer.",
    permission: "Administrateur"
} 

exports.run = async (bot, message, args) => {
    if(args[0] == "bump") {
        if(args[1] == "invitation") {
            if(!args[2]) return message.reply(`\`❌\` Veuillez indiquer un salon valide !`)
            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])
            if(!channel) return message.reply(`\`❌\` Veuillez indiquer un salon valide !`)
            const invite = await channel.createInvite({ maxAge: 0, maxUses: 0 })
            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.guild.name}`})
            .setDescription(`
            \`✅\` Le lien d'invitation a bien été créé !
            > **Voici le lien: ${invite} **

            \`⚠️\` **Attention :**
            > Si le salon \`${channel.name}\` est supprimé, l'invitation ne sera plus valide.
            `)
            .setColor('Blue')
            .setTimestamp()
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

            bot.db.query(`SELECT * FROM bump WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if (req.length < 1) {
                  bot.db.query(`INSERT INTO bump (guildId, invite) VALUES ("${message.guild.id}", "${invite}")`);
                } else {
                    bot.db.query(`UPDATE bump SET invite = '${invite}' WHERE guildId = ${message.guild.id}`);
                }

                message.reply({ embeds: [embed] })
            })
        } else if(args[1] == "salon") {
            if(!args[2]) return message.reply(`\`❌\` Veuillez indiquer un salon valide !`)
            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])
            if(!channel) return message.reply(`\`❌\` Veuillez indiquer un salon valide !`)

            const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: `${message.guild.name}`})
            .setDescription(`
            \`✅\` Le salon **d'arrivée de bump a bien été défini** sur \`${channel.name}\`.

            \`⚠️\` **Attention :**
            > Cela veut dire que tu vas recevoir tous les bumps des autres serveurs dans le salon \`${channel.name}\`. Si tu penses avoir fait une erreur, utilises la commande \`${config.prefix}config bump supprimer\`.
            `)
            .setColor('Blue')
            .setTimestamp()
            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

            bot.db.query(`SELECT * FROM bump WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if (req.length < 1) {
                  bot.db.query(`INSERT INTO bump (guildId, salon) VALUES ("${message.guild.id}", "${channel.id}")`);
                } else {
                    bot.db.query(`UPDATE bump SET salon = '${channel.id}' WHERE guildId = ${message.guild.id}`);
                }

                message.reply({ embeds: [embed] })
            })
        } else if(args[1] == "description") {
            const bottoncounter = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setCustomId("clicked")
                                .setLabel(`Clique ici`)
                                .setStyle(Discord.ButtonStyle.Secondary),
                            )
            const msg = await message.reply({ components: [bottoncounter] })
            const collector = await msg.createMessageComponentCollector({})

            collector.on('collect', async (interaction) => {
                if(interaction.user.id !== message.author.id) return interaction.reply({ content: `:x:`, ephemeral: true})
                if(interaction) {
                    const modal = new Discord.ModalBuilder()
                    .setCustomId('myModal')
                    .setTitle('Mets une belle description !');

                    const DescriptionrInput = new Discord.TextInputBuilder()
                    .setCustomId('DescriptionInput')
                    .setLabel("VOTRE DESCRIPTION")
                    .setMaxLength(400)
                    .setPlaceholder(`Exemple: ${message.guild.name} est trop un bon serveur !`)
                    .setStyle(Discord.TextInputStyle.Paragraph)
                    .setRequired(true);

                    const firstActionRow = new Discord.ActionRowBuilder().addComponents(DescriptionrInput);

                    modal.addComponents(firstActionRow)

                    await interaction.showModal(modal);

                    bot.on(Discord.Events.InteractionCreate, interaction => {
                        if (!interaction.isModalSubmit()) return;
                    
                        interaction.deferUpdate()
                        const DescriptionModal = interaction.fields.getTextInputValue('DescriptionInput');

                        bot.db.query(`SELECT * FROM bump WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                            if (req.length < 1) {
                              bot.db.query(`INSERT INTO bump (guildId, description) VALUES ("${message.guild.id}", ?)`, [DescriptionModal]);
                            } else {
                                bot.db.query(`UPDATE bump SET description = ? WHERE guildId = ${message.guild.id}`, [DescriptionModal]);
                            }

                            const embed59 = new Discord.EmbedBuilder()
                            .setAuthor({ name: message.guild.name })
                            .setDescription(`
                            \`✅\` La description de ton serveur a bien été enregistrée !
                            
                            Ta description :   
                            \`\`\`${DescriptionModal}\`\`\`
                            :warning: **À savoir !**
                            > Essaie d'obtenir un badge pour pouvoir mettre une description de **500 caractères** (utilise la commande \`${config.prefix}info devenir\` pour plus d'informations).
                            > Ou encore mieux, mets une description de **1000 caractères** grâce à notre premium. Obtiens le en cliquant [\`ici\`](https://discord.gg/zcN3sB5KSv).
                            `)
                            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
                            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                            .setColor('Blue')
            
                            message.reply({ embeds: [embed59] })
                            msg.delete()
                        })
                    });


                }
            })
        } else if(args[1] == "catégories") {
                const embed59 = new Discord.EmbedBuilder()
                            .setAuthor({ name: message.guild.name })
                            .setTitle(`Bienvenue sur la page de configuration des catégories`)
                            .setDescription(`
                            Que souhaites-tu configurer ?
                            > Le bouton \`Catégories\` permet de choisir jusqu'à 5 catégories qui représentent le mieux Serveur de lxcra.
                            > *Exemple : \`gaming\`, \`chill\`*
                            > Le bouton \`Sous-catégories\` permet de choisir jusqu'à 5 sous-catégories qui décrient plus en détails l'activité de ce serveur.
                            > *Exemple: \`gta\`, \`minecraft\`, \`pepouze\`*
                            `)
                            .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
                            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                            .setColor('Blue')

                            const bottoncounter = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                .setCustomId("Category")
                                .setDisabled(true)
                                .setLabel(`Catégories`)
                                .setEmoji(`🔖`)
                                .setStyle(Discord.ButtonStyle.Primary),
                                new Discord.ButtonBuilder()
                                .setCustomId("Under-Category")
                                .setDisabled(true)
                                .setLabel(`Sous-catégories`)
                                .setEmoji(`🏷️`)
                                .setStyle(Discord.ButtonStyle.Success),
                            )
                            
                            message.reply({ embeds: [embed59], components: [bottoncounter] })
        } else if(args[1] == "supprimer") {
            bot.db.query(`SELECT * FROM bump WHERE guildId = "${message.guild.id}"`, async (err, req) => {
                if (req.length < 1) {
                  const embed49 = new Discord.EmbedBuilder()
                  .setDescription(`\`❌\` **Aucun salon de bumps n'a été défini sur ce serveur !**`)

                  return message.reply({ embeds: [embed49] })
                } else {
                    if(!message.guild.channels.cache.get(req[0].salon)) {
                        const embed49 = new Discord.EmbedBuilder()
                        .setDescription(`\`❌\` **Aucun salon de bumps n'a été défini sur ce serveur !**`)

                         return message.reply({ embeds: [embed49] })
                    } else {
                    bot.db.query(`UPDATE bump SET salon = '${null}' WHERE guildId = ${message.guild.id}`);

                    const embed24 = new Discord.EmbedBuilder()
                    .setAuthor({ name: `${message.guild.name}`})
                    .setDescription(`
                    **\`✅\` Le salon ${message.guild.channels.cache.get(req[0].salon).name} a bien été retiré de la liste des serveurs d'arrivées de BUMPS**
                    *Tu ne recevras donc plus les BUMPS sur ton serveur !*

                    ⚠️ **Attention :**
                    > Cela veut dire **que ton serveur perd les avantages qu'il avait** en ayant un salon d'arrivée de BUMPS.
                    > Consultes la commande \`${config.prefix}info devenir\` pour plus d'informations.
                    `)
                    .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
                    .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setColor('Blue')
                    .setTimestamp()

                    message.reply({ embeds: [embed24] })
                    }
                }

            })
        } 
    } else if(args[0] == "dscgg") {
        return message.reply(`*Non disponible*`)
    } else if(args[0] == "premium") {
        const embed24 = new Discord.EmbedBuilder()
                .setAuthor({ name: `${message.guild.name}`})
                .setDescription(`
                \`❌\` \`${message.guild.name}\` **n'est pas premium !**

                Pour devenir premium, tu dois te rendre sur le [site](https://discord.gg/zcN3sB5KSv) et acheter notre premium. Une fois l'offre achetée, tu recevras une clé premium que tu devras mettre dans la commande \`${config.prefix}premium\`

                > Tu peux consulter les avantages des serveurs premiums sur la même page.

                **Si tu as des questions, n'hésites pas à rejoindre le [serveur support](https://discord.gg/zcN3sB5KSv).**
                `)
                .setImage(`https://media.discordapp.net/attachments/1121718489829347358/1145279918821879838/barre.png?width=1139&height=72`)
                .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                .setColor('Blue')
                .setTimestamp()

                message.reply({ embeds: [embed24] })
    }
}