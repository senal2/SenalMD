const { cmd } = require('../command');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Helper function to download files from a URL with custom headers
async function downloadFromUrl(url, filePath) {
    if (!url) throw new Error("Invalid download URL provided.");
    
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    });
    
    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// Command to download and send audio from YouTube
cmd({
    pattern: "song",
    desc: "Download song from YouTube",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        const search = await yts.search(q);
        const videoData = search.videos[0];
        if (!videoData) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

        const desc = `
🎞️ *Senal MD Audio Download* 📄

Title: ${videoData.title}
📖 Description: ${videoData.description}
⏰ Duration: ${videoData.timestamp}
👁️ Views: ${videoData.views}

Made By Senal-MD ✔️
        `;
        await conn.sendMessage(from, { image: { url: videoData.thumbnail }, caption: desc }, { quoted: mek });

        const audioStream = ytdl(videoData.url, { quality: 'highestaudio' });
        const filePath = path.join(__dirname, `${videoData.title}.mp3`);

        const writer = fs.createWriteStream(filePath);
        audioStream.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await conn.sendMessage(from, { audio: { url: filePath }, mimetype: "audio/mpeg" }, { quoted: mek });
        fs.unlinkSync(filePath); // Clean up
    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

// Command to download and send video from YouTube
cmd({
    pattern: "video",
    desc: "Download video from YouTube",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        const search = await yts.search(q);
        const videoData = search.videos[0];
        if (!videoData) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

        const desc = `
🎞️ *Senal MD Video Download* 📄

Title: ${videoData.title}
📖 Description: ${videoData.description}
⏰ Duration: ${videoData.timestamp}
👁️ Views: ${videoData.views}

Made By Senal-MD ✔️
        `;
        await conn.sendMessage(from, { image: { url: videoData.thumbnail }, caption: desc }, { quoted: mek });

        const videoStream = ytdl(videoData.url, { quality: 'highestvideo' });
        const filePath = path.join(__dirname, `${videoData.title}.mp4`);

        const writer = fs.createWriteStream(filePath);
        videoStream.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await conn.sendMessage(from, { video: { url: filePath }, mimetype: "video/mp4" }, { quoted: mek });
        fs.unlinkSync(filePath); // Clean up
    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
