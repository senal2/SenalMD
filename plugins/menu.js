const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    desc: "menu the bot",
    category: "menu",
    react: "🧚‍♀️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `
 ╭─────────────━┈⊷
│*🧚‍♀️ ʙᴏᴛ ɴᴀᴍᴇ*: 😈🏆 Şєᶰάℓ м𝐝 ✎♡

│*👨‍💻 ᴏᴡɴᴇʀ*:【Ｍｒ　Ｓｅｎａｌ】
│*👤 ɴᴜᴍʙᴇʀ*: 0769872xxx
│
│*🧬Version*: 1.0.0
│*💻 HOST* :  fv-az661-842
│*💫 ᴘʀᴇғɪx:* .
╰─────────────━┈⊷ 

╭━❮ 𝙾𝚆𝙽𝙴𝚁 ❯━╮
┃◆ .𝙾𝚠𝚗𝚎𝚛
┃◆ .𝙼𝚎𝚗𝚞
┃◆ .𝙱𝚕𝚘𝚌𝚔
╰━━━━━━━━━━━━⪼
╭━❮ 𝙵𝚄𝙽 ❯━╮
┃◆ .𝙵𝚊𝚌𝚔
┃◆ .𝙳𝚘𝚐
╰━━━━━━━━━━━━⪼
╭━❮ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 ❯━╮
┃◆ .𝚂𝚝𝚒𝚌𝚔𝚎𝚛
╰━━━━━━━━━━━⪼
╭━❮ 𝙰𝙸 ❯━╮
┃◆ .𝙰𝚒
┃◆ .𝚐𝚙𝚝𝟺
┃◆ .𝙱𝚒𝚗𝚐
╰━━━━━━━━━━━━⪼
╭━❮ 𝙶𝚁𝙾𝚄𝙿 ❯━╮
┃◆ .𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
┃◆ .𝚂𝚎𝚝𝚙𝚙𝚐𝚌
┃◆ .𝚂𝚎𝚝𝚗𝚊𝚖𝚎
┃◆ .𝚂𝚎𝚝𝚍𝚎𝚜𝚌
┃◆ .𝙶𝚛𝚘𝚞𝚙
┃◆ .𝚂𝚎𝚝𝚐𝚘𝚘𝚍𝚋𝚞𝚢
┃◆ .𝚂𝚎𝚝𝚠𝚎𝚕𝚌𝚘𝚖𝚎
┃◆ .𝙰𝚍𝚍
┃◆ .𝚁𝚎𝚖𝚘𝚟𝚎
┃◆ .𝙿𝚛𝚘𝚖𝚘𝚝𝚎
┃◆ .𝙳𝚎𝚖𝚘𝚝𝚎
┃◆ .𝚄𝚗𝚖𝚞𝚝𝚎
┃◆ .𝙼𝚞𝚝𝚎
┃◆ .𝙳𝚎𝚕
╰━━━━━━━━━━━━⪼
╭━❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯━╮
┃◆ .𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
┃◆ .𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
┃◆ .𝙶𝚍𝚛𝚒𝚟𝚎
┃◆ .𝙸𝚗𝚜𝚝𝚊
┃◆ .𝚂𝚘𝚗𝚐
┃◆ .𝚅𝚒𝚍𝚎𝚘
┃◆ .𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
┃◆ .𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
┃◆ .𝚃𝚒𝚔𝚝𝚘𝚔
╰━━━━━━━━━━━━⪼
╭━❮ 𝙼𝙰𝙸𝙽 ❯━╮
┃◆ .𝙿𝚒𝚗𝚐
┃◆ .𝙰𝚕𝚒𝚟𝚎
┃◆ .𝙾𝚠𝚗𝚎𝚛
┃◆ .𝙼𝚎𝚗𝚞
┃◆ .𝚁𝚎𝚙𝚘
╰━━━━━━━━━━━━⪼
╭━❮ 𝙰𝙽𝙸𝙼𝙴 ❯━╮
┃◆ .𝚕𝚘𝚕𝚒
┃◆ .𝚠𝚊𝚒𝚏𝚞
┃◆ .𝚗𝚎𝚔𝚘
┃◆ .𝚖𝚎𝚐𝚞𝚖𝚒𝚗
┃◆ .𝚖𝚊𝚒𝚍
┃◆ .𝚊𝚠𝚘𝚘
╰━━━━━━━━━━━━⪼
╭━❮ 𝙾𝚃𝙷𝙴𝚁 ❯━╮
┃◆ .𝚃𝚛𝚝
┃◆ .𝙽𝚎𝚠𝚜
┃◆ .𝙼𝚘𝚟𝚒𝚎
╰━━━━━━━━━━━━⪼

 > © 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐒𝐄𝐍𝐀𝐋 𝐌𝐃
`
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/f2be313fe820b56b47748.png`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
