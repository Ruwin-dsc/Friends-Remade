# :robot: **Friend's remade by WhiteHall**

## :pencil: **Description**
C'est le fameux bot bump "friends" ! CECI N'EST Q'UN REMADE, le serveur officiel est https://discord.gg/bump ! Comme jsuis un mec qui commence le HTML, j'avais la flemme de faire le site et en plus dans leurs cgu yavait écrit interdit de recopier donc tous les commandes en rapports complet avec le site sont désactivé. De plus la partie mods et utilitaire n'apparait pas car j'avais la flemme mais si vous êtes nombreux à demander je le ferais --> https://discord.gg/zcN3sB5KSv

## :gear: **Fonctionnalités**
- système de bump
- système de vote

## :wrench: **Configuration**

### **Prérequis**
- Discord.js (version 14.11.0)
- mysql (version 2.18.1)
- phpMyAdmin (voir étape instalation)

### **Étapes d'installation**
1. Clone le repository : `git clone https://github.com/Ruwin-dsc/friends.git`
2. Installe les dépendances : `npm install`
3. Utilise phpMyAdmin et met le fichier `friends.sql` dessus si tu n'as pas phpMyAdmin ou que tu ne sais pas l'utiliser je t'invite à te rendre dans le serveur https://discord.gg/cloudheaven et demander un hébergeur avec phpMyAdmin pour le friends (de la part de ruwinou) C'EST TOTALEMENT GRATUIT !!! Toutefois si t'as d'autre problème je t'invite à te rendre dans le serveur https://discord.gg/xkebY6nsxk
4. Configure ton fichier de configuration `config.json` avec les informations nécessaires.
5. Lance le bot : `node index.js`

### **Configuration du fichier `config.json`**
```json
{
    "token": "Token",
    "prefix": "prefix", 
    "linkbot": "LA BAH TU METS LE LIEN DU BOT oe ça va servir à rien c juste pour le style", 
        "BDD": {
        "note": "si tu ne comprend pas ce qu'il faut faire je te coneille d'aller voir le readme du github ou rejoindre le support https://discord.gg/zcN3sB5KSv",
        "host": "127.0.0.1 || host du vps",     
        "user": "root || user du vps",
        "password": "Supprimer cette ligne si vous êtes pas sur vps",
        "database": "friends",
        "charset": "utf8mb4"
    }

}
```

## :raised_hands: **Contribution**
Si tu souhaites contribuer à ce projet, n'hésite pas à ouvrir une pull request !

## :page_facing_up: **License**
Ce projet est sous license MIT. Voir le fichier `LICENSE` pour plus d'informations.

## **Support**
Serveur Discord: https://discord.gg/xkebY6nsxk
Message Privé: ruwinou
