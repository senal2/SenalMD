const { fetchJson } = require('../DATABASE/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();


const yourName = "❗This is a web copy, and to add Malvin subtitles separately, click the Malvin Subtitles button.\n\n> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ*\n\n 🎬*ᴍᴀʟᴠɪɴ ᴍᴅ ᴄɪɴᴇʀᴜ.ʟᴋ ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*🎬​";


cmd({
    pattern: "gdmovie",
    alias: ["googledrivemovie","gdrivemovie"],
    desc: "download cinerulk movie ",
    category: "movie",
    react: "🎬",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("I'm having trouble understanding this🙃.\nJust get the Google Drive link and use it. ")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${q}`)
        reply("🎬 *ᴍᴀʟᴠɪɴ ᴍᴅ ᴄɪɴᴇʀᴜ.ʟᴋ ᴍᴏᴠɪᴇ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* 🎬​ \n*--------------------------------------------*\n𝕐𝕆𝕌ℝ 𝕄𝕆𝕍𝕀𝔼 𝕀𝕊\n*📤𝕌ℙ𝕃𝕆𝔸𝔻𝕀ℕ𝔾 ◽◽◽◽◽◽*\n\n> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ*")
        await conn.sendMessage(from, { document: { url: data.data.download }, fileName: data.data.fileName, mimetype: data.data.mimeType, caption: `🍟Movie Name : ${data.data.fileName} | Malvin subtitles not included.\n🙃Bot Owner : 263714757857 \n\n${yourName}` }, { quoted: mek })                                                                                                                 
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
