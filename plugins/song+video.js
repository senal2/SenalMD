const { cmd, commands } = require('../command');
const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        // Search for video with yt-search
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

        // Define the output file path for the audio file
        const audioOutputPath = path.join(downloadsDir, `${data.title}.mp3`);

        // Use API-Dylux or similar to download the audio (Example using axios or your API)
        // Replace with actual API request if needed (assuming API-Dylux can fetch the audio directly)
        try {
            const response = await axios.get(`https://api-dylux.com/download?videoUrl=${data.url}`, { responseType: 'stream' });
            const writer = fs.createWriteStream(audioOutputPath);

            response.data.pipe(writer);

            writer.on('finish', async () => {
                // Send the audio to the user
                await conn.sendMessage(from, { audio: { url: audioOutputPath }, mimetype: "audio/mpeg" }, { quoted: mek });
                // Optionally send as document
                await conn.sendMessage(from, { document: { url: audioOutputPath }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "Made By SenalMD" }, { quoted: mek });
            });

            writer.on('error', (err) => {
                console.error("Error downloading the file:", err);
                conn.sendMessage(from, { text: `Error downloading audio: ${err.message}` }, { quoted: mek });
            });

        } catch (err) {
            console.error("Error with API call:", err);
            conn.sendMessage(from, { text: `Error: ${err.message}` }, { quoted: mek });
        }

    } catch (e) {
        console.log(e);
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
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        // Search for video with yt-search
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

        // Define the output file path for the video file
        const videoOutputPath = path.join(downloadsDir, `${data.title}.mp4`);

        // Use API-Dylux or similar to download the video (Example using axios or your API)
        try {
            const response = await axios.get(`https://api-dylux.com/download?videoUrl=${data.url}`, { responseType: 'stream' });
            const writer = fs.createWriteStream(videoOutputPath);

            response.data.pipe(writer);

            writer.on('finish', async () => {
                // Send the video to the user
                await conn.sendMessage(from, { video: { url: videoOutputPath }, mimetype: "video/mp4" }, { quoted: mek });
                // Optionally send as document
                await conn.sendMessage(from, { document: { url: videoOutputPath }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "Made By SenalMD" }, { quoted: mek });
            });

            writer.on('error', (err) => {
                console.error("Error downloading the file:", err);
                conn.sendMessage(from, { text: `Error downloading video: ${err.message}` }, { quoted: mek });
            });

        } catch (err) {
            console.error("Error with API call:", err);
            conn.sendMessage(from, { text: `Error: ${err.message}` }, { quoted: mek });
        }

    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
