const { cmd } = require('../command');
const yts = require('youtube-yts');
const ytdl = require('@distube/ytdl-core');

// Command to stream audio directly from YouTube
cmd({
    pattern: "song",
    desc: "Stream song directly",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        // Search for video data
        const search = await yts.search(q);
        const data = search.videos[0];

        if (!data) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

        // Display video details
        const desc = `
🎞️ *Senal MD Audio Stream* 📄

Title: ${data.title}
📖 Description: ${data.description}
⏰ Duration: ${data.timestamp}
👁️ Views: ${data.views}

Made By Senal-MD ✔️
        `;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Stream audio to WhatsApp
        const audioStream = ytdl(data.url, { filter: 'audioonly', quality: 'highestaudio' });
        await conn.sendMessage(from, { audio: { url: audioStream }, mimetype: "audio/mpeg" }, { quoted: mek });
    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

// Command to stream video directly from YouTube
cmd({
    pattern: "video",
    desc: "Stream video directly",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        // Search for video data
        const search = await yts.search(q);
        const data = search.videos[0];

        if (!data) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

        const desc = `
🎞️ *Senal MD Video Stream* 📄

Title: ${data.title}
📖 Description: ${data.description}
⏰ Duration: ${data.timestamp}
👁️ Views: ${data.views}

Made By Senal-MD ✔️
        `;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Stream video to WhatsApp
        const videoStream = ytdl(data.url, { filter: 'videoandaudio', quality: 'highest' });
        await conn.sendMessage(from, { video: { url: videoStream }, mimetype: "video/mp4" }, { quoted: mek });
    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
