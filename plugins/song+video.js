const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

// SONG COMMAND
cmd({
    pattern: "song",
    desc: "Download songs",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a song name or YouTube link.");

        const isYouTubeUrl = q.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/);
        let url, title, thumbnail;

        if (isYouTubeUrl) {
            url = q; // Use direct URL
        } else {
            const search = await yts(q);
            const data = search.videos[0];

            if (!data) {
                return reply("❌ No video found for the given query.");
            }

            url = data.url;
            title = data.title;
            thumbnail = data.thumbnail;
        }

        const down = await fg.yta(url); // Download audio
        if (!down || !down.dl_url) {
            return reply("❌ Unable to fetch the download URL.");
        }

        let desc = `🎵 *SENAL MD SONG DOWNLOADER*\n\n` +
                   `🎼 *Title:* ${title || down.title}\n` +
                   `👀 *Size:* ${down.size}\n`;

        await conn.sendMessage(from, { image: { url: thumbnail || down.thumbnail }, caption: desc }, { quoted: mek });
        await conn.sendMessage(from, { audio: { url: down.dl_url }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: down.dl_url }, mimetype: "audio/mpeg", fileName: `${title || down.title}.mp3` }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your song request.");
    }
});

// VIDEO COMMAND
cmd({
    pattern: "video",
    desc: "Download videos",
    category: "download",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a video name or YouTube link.");

        const isYouTubeUrl = q.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/);
        let url, title, thumbnail;

        if (isYouTubeUrl) {
            url = q; // Use direct URL
        } else {
            const search = await yts(q);
            const data = search.videos[0];

            if (!data) {
                return reply("❌ No video found for the given query.");
            }

            url = data.url;
            title = data.title;
            thumbnail = data.thumbnail;
        }

        const down = await fg.ytv(url); // Download video
        if (!down || !down.dl_url) {
            return reply("❌ Unable to fetch the download URL.");
        }

        let desc = `🎥 *SENAL MD VIDEO DOWNLOADER*\n\n` +
                   `🎬 *Title:* ${title || down.title}\n` +
                   `👀 *Size:* ${down.size}\n`;

        await conn.sendMessage(from, { image: { url: thumbnail || down.thumbnail }, caption: desc }, { quoted: mek });
        await conn.sendMessage(from, { video: { url: down.dl_url }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: down.dl_url }, mimetype: "video/mp4", fileName: `${title || down.title}.mp4` }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your video request.");
    }
});
