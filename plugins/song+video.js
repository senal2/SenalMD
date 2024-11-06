const { cmd, commands } = require('../command');
const yts = require('yt-search');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
}

// Command to download songs
cmd({
    pattern: "song",
    desc: "Download songs",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a song title or keywords." }, { quoted: mek });
        const search = await yts(q);
        const data = search.videos[0];

        if (!data) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

        let desc = `
🎞️ *Senal MD Audio Downloader* 📄

Title: ${data.title}
📖 Description: ${data.description}
⏰ Duration: ${data.timestamp}
👁️ Views: ${data.views}

Made By Senal-MD ✔️
        `;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Define the output file path
        const audioOutputPath = path.join(downloadsDir, `${data.title}.mp3`);

        // Use axios to download audio
        const response = await axios({
            method: 'get',
            url: `${data.url}`,
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(audioOutputPath))
            .on('finish', async () => {
                await conn.sendMessage(from, { audio: { url: audioOutputPath }, mimetype: "audio/mpeg" }, { quoted: mek });
            })
            .on('error', (e) => {
                console.error(e);
                conn.sendMessage(from, { text: `Error downloading audio: ${e.message}` }, { quoted: mek });
            });
    } catch (e) {
        console.error(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

// Command to download videos
cmd({
    pattern: "video",
    desc: "Download videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a video title or keywords." }, { quoted: mek });
        const search = await yts(q);
        const data = search.videos[0];

        if (!data) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

        let desc = `
🎞️ *Senal MD Video Downloader* 📄

Title: ${data.title}
📖 Description: ${data.description}
⏰ Duration: ${data.timestamp}
👁️ Views: ${data.views}

Made By Senal-MD ✔️
        `;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Define the output file path
        const videoOutputPath = path.join(downloadsDir, `${data.title}.mp4`);

        // Use axios to download video
        const response = await axios({
            method: 'get',
            url: `${data.url}`,
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(videoOutputPath))
            .on('finish', async () => {
                await conn.sendMessage(from, { video: { url: videoOutputPath }, mimetype: "video/mp4" }, { quoted: mek });
            })
            .on('error', (e) => {
                console.error(e);
                conn.sendMessage(from, { text: `Error downloading video: ${e.message}` }, { quoted: mek });
            });
    } catch (e) {
        console.error(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
