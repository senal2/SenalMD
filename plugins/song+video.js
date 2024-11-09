const { cmd } = require('../command');
const yts = require('yt-search');
const fg = require('api-dylux'); // For downloading YouTube media
const fs = require('fs');
const path = require('path');

// Command to download and send audio from YouTube
cmd({
    pattern: "song",
    desc: "Download song from YouTube",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        const search = await yts(q);
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

        // Using api-dylux to get MP3 download link
        const mp3Data = await fg.ytmp3(videoData.url);
        if (!mp3Data || !mp3Data.link) {
            return conn.sendMessage(from, { text: "Error fetching download link." }, { quoted: mek });
        }

        await conn.sendMessage(from, { audio: { url: mp3Data.link }, mimetype: "audio/mpeg" }, { quoted: mek });

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

        const search = await yts(q);
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

        // Using api-dylux to get MP4 download link
        const mp4Data = await fg.ytmp4(videoData.url);
        if (!mp4Data || !mp4Data.link) {
            return conn.sendMessage(from, { text: "Error fetching download link." }, { quoted: mek });
        }

        await conn.sendMessage(from, { video: { url: mp4Data.link }, mimetype: "video/mp4" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

// Helper function to search YouTube and return video details
async function searchYouTube(query) {
    try {
        const result = await yts(query);
        if (!result || !result.videos || result.videos.length === 0) {
            throw new Error('No videos found for your query');
        }
        const video = result.videos[0]; // Get the first video
        return video;
    } catch (e) {
        console.error('Error searching YouTube:', e.message);
        return null;
    }
}

// Example function to test search
async function testSearch(query) {
    const video = await searchYouTube(query);
    if (video) {
        console.log(`Found video: ${video.title}`);
        console.log(`Video URL: ${video.url}`);
    } else {
        console.log('No video found');
    }
}

// Example Usage: Search for a song
testSearch('superman theme');
