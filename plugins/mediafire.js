// MEDIAFIRE DOWNLOAD COMMAND


const { cmd } = require('../command')
const { fetchJson } = require('../DATABASE/functions')

const apilink = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )


cmd({
    pattern: "mfire",
    alias: ["mf","mediafire"],
    react: "🔥",
    desc: "",
    category: "download",
    use: '.mfire < mediafire url >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{
  
if(!q) return await reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖬𝖾𝖽𝗂𝖺𝖿𝗂𝗋𝖾 𝖴𝗋𝗅");
  if(!q.includes('mediafire.com')) return await reply("This url is invalid");
  
const mfire = await fetchJson(`${apilink}/download/mfire?url=${q}`);
  
const msg = `
           *乂 MALVIN-MD MEDIAFIRE DOWNLOADER* 🔥


• *𝖥𝗂𝗅𝖾 𝖭𝖺𝗆𝖾* - ${mfire.result.fileName}

• *𝖥𝗂𝗅𝖾 𝖲𝗂𝗓𝖾* - ${mfire.result.size}

• *𝖴𝗉𝗅𝗈𝖺𝖽 𝖣𝖺𝗍𝖾 𝖠𝗇𝖽 𝖳𝗂𝗆𝖾* - ${mfire.result.date}

> *©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ*`

       // Sending the image with caption
          const sentMsg = await conn.sendMessage(from, {


          text: msg,
          contextInfo: {

          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterName: '👾 ＭＡＬＶＩＮ  |   𝚃𝙴𝙲𝙷 ジ',
          newsletterJid: "120363296605464049@newsletter",
          },
          externalAdReply: {
              title: `ＭＡＬＶＩＮ-MD Mediafire Downloader`,
              body: `Can't Find The Information. You Can Try Another Way. Error Code 4043`,
              thumbnailUrl: `https://files.catbox.moe/gdvaaw.jpg`,
              sourceUrl: ``,
              mediaType: 1,
              renderLargerThumbnail: true
              }
                  }
              }, { quoted: mek });
  
// SEND FILE
await conn.sendMessage(from, { document: { url: mfire.result.dl_link }, mimetype: mfire.result.fileType , fileName: mfire.result.fileName, caption: mfire.result.fileName }, { quoted: mek });

  
} catch (e) {
console.log(e)
reply('𝖳𝗁𝗂𝗌 𝖴𝗋𝗅 𝖳𝗒𝗉𝖾 𝖨𝗌 𝖭𝗈𝗍 𝖶𝗈𝗋𝗄𝗂𝗇𝗀 !!')
}
})
