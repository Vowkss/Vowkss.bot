const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.login = (process.env.token);

bot.on('message', message => {
  if (message.content === 'Bonjour') {
    message.reply('Comment vas-tu ?')
  }
})
bot.on('message', message => {
  if (message.content === 'Salut') {
    message.reply('Comment vas-tu ?')
  }
})
bot.on('message', message => {
  if (message.content === 'Je vais très bien et toi?') {
    message.reply('Oui parfait')
  }
})
bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur mon serveur ' + member.displayName)
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})
bot.on('message', message => {

  if (message.content.startsWith('!play')) {
    // On récupère le premier channel audio du serveur
    let voiceChannel = message.guild.channels
      .filter(function (channel) { return channel.type === 'voice' })
      .first()
    // On récupère les arguments de la commande 
    // il faudrait utiliser une expression régulière pour valider le lien youtube
    let args = message.content.split(' ')
    // On rejoint le channel audio
    voiceChannel
      .join()
      .then(function (connection) {
        // On démarre un stream à partir de la vidéo youtube
        let stream = YoutubeStream(args[1])
        stream.on('error', function () {
          message.reply("Je n'ai pas réussi à lire cette vidéo :(")
          connection.disconnect()
        })
        // On envoie le stream au channel audio
        // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
        connection
          .playStream(stream)
          .on('end', function () {
            connection.disconnect()
          })
      })
  }

})

bot.on('message', message => {
  if (message.content === '!youtube') {
    message.reply('__**Chaîne Youtube**__ : https://www.youtube.com/channel/UCE1t0xvUxQwkwg8Iwm_120Q?view_as=subscriber')
  }
})
bot.on('message', message => {
  if (message.content === '!twitch') {
    message.reply('__**Chaîne Twitch**__ : https://www.twitch.tv/vowkss')
  }
})



