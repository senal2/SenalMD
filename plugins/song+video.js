const { cmd } = require('../command');
const yts = require('yt-search');
const dylux = require('api-dylux');
const fs = require('fs');
const path = require('path');

// Utility to download and save stream from URL
const downloadFromUrl = async (url, filePath) => {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync(filePath, buffer);
};

// Command to download audio using yt-search and api-dylux
cmd({
    pattern: "song",
    desc: "Download song",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        const search = await yts.search(q);
        const videoData = search.videos[0];
        if (!videoData) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

        const desc = `
🎞️ *Senal MD Audio Stream* 📄
Title: ${videoData.title}
📖 Description: ${videoData.description}
⏰ Duration: ${videoData.timestamp}
👁️ Views: ${videoData.views}
        `;
        await conn.sendMessage(from, { image: { url: videoData.thumbnail }, caption: desc }, { quoted: mek });

        // Fetch download URL from api-dylux
        const audioUrl = await dylux.youtube(audio, videoData.url);
        const filePath = path.join(__dirname, `${videoData.title}.mp3`);
        
        await downloadFromUrl(audioUrl, filePath);
        
        await conn.sendMessage(from, { audio: { url: filePath }, mimetype: "audio/mpeg" }, { quoted: mek });
        
        fs.unlinkSync(filePath); // Clean up
    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

// Command to download video using yt-search and api-dylux
cmd({
    pattern: "video",
    desc: "Download video",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        const search = await yts.search(q);
        const videoData = search.videos[0];
        if (!videoData) return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });

        const desc = `
🎞️ *Senal MD Video Stream* 📄
Title: ${videoData.title}
📖 Description: ${videoData.description}
⏰ Duration: ${videoData.timestamp}
👁️ Views: ${videoData.views}
        `;
        await conn.sendMessage(from, { image: { url: videoData.thumbnail }, caption: desc }, { quoted: mek });

        // Fetch download URL from api-dylux
        const videoUrl = await dylux.youtube(video, videoData.url);
        const filePath = path.join(__dirname, `${videoData.title}.mp4`);

        await downloadFromUrl(videoUrl, filePath);

        await conn.sendMessage(from, { video: { url: filePath }, mimetype: "video/mp4" }, { quoted: mek });
        
        fs.unlinkSync(filePath); // Clean up
    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
