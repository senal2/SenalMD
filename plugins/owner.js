const {cmd , commands} = require('../command')

cmd({
    pattern: "owner",
    desc: "owner the bot",
    category: "main",
    react: "👨‍💻",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `╭───────────────◎◎▷
👋𝐇𝐄𝐋𝐋𝐎 ........................🔰

> ​🇼​​🇪​​🇱​​🇨​​🇴​​🇲​​🇪​ ​🇹​​🇴​ ​🇸​​🇪​​🇳​​🇦​​🇱​ ​🇲​​🇩​ ​🇼​​🇺​​🇱​​🇹​​🇮​​🇩​​🇪​​🇻​​🇮​​🇨​​🇪​ ​🇼​​🇭​​🇦​​🇹​​🇸​​🇦​​🇵​​🇵​ ​🇧​​🇴​​🇹​ ☢︎︎

☺︎︎☻︎☺︎︎☻︎☺︎︎☻︎☺︎︎☻︎☺︎︎☻︎☺︎︎☻︎☺︎︎☻︎
𝗟𝗢𝗢𝗞𝗜𝗡𝗚 𝗡𝗢𝗪 ☟︎︎︎☟︎︎︎☟︎︎︎☟︎︎︎

> SENAL MD 𝔹𝕆𝕋 𝕆𝕎𝔼ℕ𝔼ℝ 𝔸𝔹𝕆𝕌𝕋»

> ➪𝐌𝐘 𝐑𝐄𝐀𝐋 𝐍𝐀𝐌𝐄☞︎︎︎ Mr SENAL

> ➪𝐈'𝐌 𝐅𝐑𝐎𝐌☞︎︎︎ SRI LANKA 

> ➪𝐌𝐘 𝐀𝐆𝐄☞︎︎︎ ♕︎18 TO 25.♕︎

> 𝗠𝗬 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗡𝗨𝗠𝗕𝗘𝗥☟︎︎︎☟︎︎︎☟︎︎︎☟︎︎︎

 https://wa.link/bgbwbp
 
> 𝐨𝐰𝐞𝐧𝐞𝐫 : SENAL-MD OᖴIᑕIᗩᒪ
╰───────────────◎◎▷


> © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐄𝐍𝐀𝐋 𝐌𝐃
`
await conn.sendMessage(from,{image:{url: `https://files.catbox.moe/gm88nn.png`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
