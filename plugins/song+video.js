const { cmd } = require('../command');
const yts = require('yt-search');
const { exec } = require('child_process');
const { uploadMedia } = require('./uploader');
const path = require('path');

// Path to yt-dlp and cookies file
const YT_DLP_PATH = '/home/codespace/.python/current/bin/yt-dlp';
const COOKIES_PATH = path.join(__dirname, 'cookies.txt');

// Helper function to fetch download link using yt-dlp with cookies
const getDownloadLink = async (url, format) => {
    return new Promise((resolve, reject) => {
        const audioFormat = format === 'mp3' ? 'bestaudio' : 'bestvideo';
        
        // Command includes cookies for authenticated requests
        const command = `${YT_DLP_PATH} -f ${audioFormat} --cookies ${COOKIES_PATH} --get-url "${url}"`;
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject(new Error(`Error executing yt-dlp: ${stderr || error.message}`));
            }
            resolve(stdout.trim());
        });
    });
};

// Command to download and send audio from YouTube
cmd({
    pattern: "song",
    desc: "Download song from YouTube",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, args }) => {
    try {
        const query = args.join(" ");
        if (!query) return conn.sendMessage(from, { text: "Please provide a song title or URL." }, { quoted: mek });

        // Search for the video on YouTube
        const search = await yts(query);
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

        if (!videoData.url) {
            return conn.sendMessage(from, { text: "No valid URL found for the video." }, { quoted: mek });
        }

        // Get MP3 download link using yt-dlp with cookies
        const mp3Link = await getDownloadLink(videoData.url, 'mp3');
        if (!mp3Link) {
            return conn.sendMessage(from, { text: "Error fetching download link." }, { quoted: mek });
        }

        // Send the audio file directly
        await conn.sendMessage(from, { audio: { url: mp3Link }, mimetype: "audio/mpeg" }, { quoted: mek });
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
}, async (conn, mek, m, { from, quoted, args }) => {
    try {
        const query = args.join(" ");
        if (!query) return conn.sendMessage(from, { text: "Please provide a video title or URL." }, { quoted: mek });

        // Search for the video on YouTube
        const search = await yts(query);
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

        if (!videoData.url) {
            return conn.sendMessage(from, { text: "No valid URL found for the video." }, { quoted: mek });
        }

        // Get MP4 download link using yt-dlp with cookies
        const mp4Link = await getDownloadLink(videoData.url, 'mp4');
        if (!mp4Link) {
            return conn.sendMessage(from, { text: "Error fetching download link." }, { quoted: mek });
        }

        // Send the video file directly
        await conn.sendMessage(from, { video: { url: mp4Link }, mimetype: "video/mp4" }, { quoted: mek });
    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
