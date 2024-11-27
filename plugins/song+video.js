const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

/**
 * Normalize YouTube URL
 * Converts shortened YouTube URLs (https://youtu.be/...) to standard format.
 */
const normalizeYouTubeURL = (url) => {
    if (url.startsWith('https://youtu.be/')) {
        const videoId = url.split('/').pop().split('?')[0];
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return url;
};

//===========SONG-DL===========

cmd({
    pattern: "song",
    desc: "Download songs",
    category: "download",
    react: "🎵",
    filename: __filename,
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("*කරුණාකර Link එකක් හෝ නමක් ලබා දෙන්න 🔎...*");

        // Normalize URL if it is provided as a link
        const normalizedQuery = q.startsWith('http') ? normalizeYouTubeURL(q) : q;

        const search = await yts(normalizedQuery);
        const data = search.videos[0];
        const url = data.url;

        if (!url) return reply("*🚫 සොයාගත නොහැක!*");

        let desc = `╭━❮◆ SENAL MD SONG DOWNLOADER ◆❯━╮
┃➤✰ 𝚃𝙸𝚃𝙻𝙴 : ${data.title}
┃➤✰ 𝚅𝙸𝙴𝚆𝚂 : ${data.views}
┃➤✰ 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽 : ${data.description}
┃➤✰ 𝚃𝙸𝙼𝙴 : ${data.timestamp}
┃➤✰ 𝙰𝙶𝙾 : ${data.ago}
╰━━━━━━━━━━━━━━━⪼

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚂𝙴𝙽𝙰𝙻`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Send downloading message
        await reply("*_Downloading_*   ⬇️");

        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        // Send audio
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚂𝙴𝙽𝙰𝙻 𝙼𝙳" }, { quoted: mek });

        // Send uploaded message
        await reply("*_UPLOADED_*  ✅");
    } catch (e) {
        reply(`🚫 *දෝෂයක් ඇති විය:*\n${e}`);
    }
});

//===========VIDEO-DL===========

cmd({
    pattern: "video",
    desc: "Download video",
    category: "download",
    react: "🎥",
    filename: __filename,
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply("*කරුණාකර Link එකක් හෝ නමක් ලබා දෙන්න 🔎...*");

        // Normalize URL if it is provided as a link
        const normalizedQuery = q.startsWith('http') ? normalizeYouTubeURL(q) : q;

        const search = await yts(normalizedQuery);
        const data = search.videos[0];
        const url = data.url;

        if (!url) return reply("*🚫 සොයාගත නොහැක!*");

        let des = `╭━❮◆ SENAL MD VIDEO DOWNLOADER ◆❯━╮
┃➤✰ 𝚃𝙸𝚃𝙻𝙴 : ${data.title}
┃➤✰ 𝚅𝙸𝙴𝚆𝚂 : ${data.views}
┃➤✰ 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽 : ${data.description}
┃➤✰ 𝚃𝙸𝙼𝙴 : ${data.timestamp}
┃➤✰ 𝙰𝙶𝙾 : ${data.ago}
╰━━━━━━━━━━━━━━━⪼

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚂𝙴𝙽𝙰𝙻`;

        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: des }, { quoted: mek });

        // Send downloading message
        await reply("*_Downloading_*   ⬇️");

        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;

        // Send video
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚂𝙴𝙽𝙰𝙻 𝙼𝙳" }, { quoted: mek });

        // Send uploaded message
        await reply("*_UPLOADED_*  ✅");
    } catch (a) {
        reply(`🚫 *දෝෂයක් ඇති විය:*\n${a}`);
    }
});
