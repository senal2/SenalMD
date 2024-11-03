const { cmd, commands } = require('../command');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

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

        // Download audio
        const audioStream = ytdl(data.url, { filter: 'audioonly' });
        audioStream.pipe(fs.createWriteStream(audioOutputPath))
            .on('finish', async () => {
                try {
                    // Verify file type
                    const metadata = await mm.parseFile(audioOutputPath);
                    if (metadata && metadata.format && metadata.format.container === 'mp3') {
                        // Send audio message
                        await conn.sendMessage(from, { audio: { url: audioOutputPath }, mimetype: "audio/mpeg" }, { quoted: mek });
                        // Optionally send as a document
                        await conn.sendMessage(from, { document: { url: audioOutputPath }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "Made By SenalMD" }, { quoted: mek });
                    } else {
                        conn.sendMessage(from, { text: "Error: Unsupported file type. The downloaded file may not be an audio file." }, { quoted: mek });
                    }
                } catch (err) {
                    console.error(err);
                    conn.sendMessage(from, { text: `Error verifying audio file: ${err.message}` }, { quoted: mek });
                }
            })
            .on('error', (e) => {
                console.log(e);
                conn.sendMessage(from, { text: `Error downloading audio: ${e.message}` }, { quoted: mek });
            });

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

        // Download video
        const videoStream = ytdl(data.url, { quality: 'highestvideo' });
        videoStream.pipe(fs.createWriteStream(videoOutputPath))
            .on('finish', async () => {
                try {
                    // Verify file type
                    const metadata = await mm.parseFile(videoOutputPath);
                    if (metadata && metadata.format && metadata.format.container === 'mp4') {
                        // Send video message
                        await conn.sendMessage(from, { video: { url: videoOutputPath }, mimetype: "video/mp4" }, { quoted: mek });
                        // Optionally send as a document
                        await conn.sendMessage(from, { document: { url: videoOutputPath }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "Made By SenalMD" }, { quoted: mek });
                    } else {
                        conn.sendMessage(from, { text: "Error: Unsupported file type. The downloaded file may not be a video file." }, { quoted: mek });
                    }
                } catch (err) {
                    console.error(err);
                    conn.sendMessage(from, { text: `Error verifying video file: ${err.message}` }, { quoted: mek });
                }
            })
            .on('error', (e) => {
                console.log(e);
                conn.sendMessage(from, { text: `Error downloading video: ${e.message}` }, { quoted: mek });
            });

    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
