const { cmd } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const axios = require('axios');

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
        console.log("[SONG COMMAND] Input Query:", q);

        const isYouTubeUrl = q.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/);
        let url, title, thumbnail;

        if (isYouTubeUrl) {
            url = q;
            console.log("[SONG COMMAND] Detected YouTube URL:", url);
        } else {
            const search = await yts(q);
            console.log("[SONG COMMAND] Search Results:", search);

            const data = search.videos[0];
            if (!data) {
                return reply("❌ No video found for the given query.");
            }

            url = data.url;
            title = data.title;
            thumbnail = data.thumbnail;
            console.log("[SONG COMMAND] Extracted Data:", { url, title, thumbnail });
        }

        const down = await fg.yta(url);
        console.log("[SONG COMMAND] API-Dylux Response:", down);

        if (!down || !down.dl_url) {
            return reply("❌ Unable to fetch the download URL.");
        }

        let desc = `🎵 *SENAL MD SONG DOWNLOADER*\n\n` +
                   `🎼 *Title:* ${title || down.title}\n` +
                   `👀 *Size:* ${down.size}\n`;

        await conn.sendMessage(from, { image: { url: thumbnail || down.thumbnail }, caption: desc }, { quoted: mek });

        // Download the file as a buffer
        const response = await axios.get(down.dl_url, { responseType: 'arraybuffer' });
        const audioBuffer = Buffer.from(response.data, 'binary');

        // Send audio
        await conn.sendMessage(from, { audio: audioBuffer, mimetype: "audio/mpeg" }, { quoted: mek });

        // Send as document
        await conn.sendMessage(from, { document: audioBuffer, mimetype: "audio/mpeg", fileName: `${title || down.title}.mp3` }, { quoted: mek });

    } catch (e) {
        console.error("[SONG COMMAND] Error:", e);
        reply(`❌ An error occurred while processing your song request.\n\n*Error Details:* ${e.message}`);
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
        console.log("[VIDEO COMMAND] Input Query:", q);

        const isYouTubeUrl = q.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/);
        let url, title, thumbnail;

        if (isYouTubeUrl) {
            url = q;
            console.log("[VIDEO COMMAND] Detected YouTube URL:", url);
        } else {
            const search = await yts(q);
            console.log("[VIDEO COMMAND] Search Results:", search);

            const data = search.videos[0];
            if (!data) {
                return reply("❌ No video found for the given query.");
            }

            url = data.url;
            title = data.title;
            thumbnail = data.thumbnail;
            console.log("[VIDEO COMMAND] Extracted Data:", { url, title, thumbnail });
        }

        const down = await fg.ytv(url);
        console.log("[VIDEO COMMAND] API-Dylux Response:", down);

        if (!down || !down.dl_url) {
            return reply("❌ Unable to fetch the download URL.");
        }

        let desc = `🎥 *SENAL MD VIDEO DOWNLOADER*\n\n` +
                   `🎬 *Title:* ${title || down.title}\n` +
                   `👀 *Size:* ${down.size}\n`;

        await conn.sendMessage(from, { image: { url: thumbnail || down.thumbnail }, caption: desc }, { quoted: mek });

        // Download the file as a buffer
        const response = await axios.get(down.dl_url, { responseType: 'arraybuffer' });
        const videoBuffer = Buffer.from(response.data, 'binary');

        // Send video
        await conn.sendMessage(from, { video: videoBuffer, mimetype: "video/mp4" }, { quoted: mek });

        // Send as document
        await conn.sendMessage(from, { document: videoBuffer, mimetype: "video/mp4", fileName: `${title || down.title}.mp4` }, { quoted: mek });

    } catch (e) {
        console.error("[VIDEO COMMAND] Error:", e);
        reply(`❌ An error occurred while processing your video request.\n\n*Error Details:* ${e.message}`);
    }
});
