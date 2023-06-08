 # Discord Bot v14 Template
 ## Slash Commands Handler 
 ### Installation

 ###  Install all the dependecies needed
 ```shell
 npm i
 ```

 ### Fill up the config.js file
```js
module.exports = {
  token: "" || process.env.token, // main bot token
  betatoken: '' || process.env.betatoken, // beta token
  id: "" || process.env.id, // main bot id
  betaID: ''|| process.env.betaID, // beta id
  ownerID: "" || process.env.ownerID, // owner id
  mongourl: "" || process.env.mongourl, // mongourl for when you want to use the Database
  embedColor: 0x00ffff || process.env.embedColor,
  status: "GLOBAL" || process.env.status, // or BETA
}
```

 -----
## This Template offer's you

 * ### Custom Database 
 ```js
  client.db.set(key, value)
  
  client.db.get(key)
  
  client.db.add(key, value)
  
  client.db.delete(key)
  
  client.db.push(key, value)
  
  client.db.pull(key, value)
  
  client.db.has(key)  
   
  ```

* ### Custom Moderation Logs
```js
client.modLog(interaction, `Moderation Log message`)
```

* ### Translate Function

```js
client.translate(interaction, embedColor, 'Any Text to translate in any language to any language', "Albanian") // language = every language that is supported by google translate
```

* ### Custom Embed Color per guild

* ### Events Handler

------

> This Template is free to use, if you need support join my [Discord](https://sigmaxii.com/support) and feel free to tag me! 

> No credits required to use this template, the only thing you could do to help me out is to invite my bot in your server ;) [Invite Sigma Bot](https://sigmaxii.com/invite)
