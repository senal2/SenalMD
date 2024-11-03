const { cmd, commands } = require('../command');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

// Command for downloading songs
cmd({
    pattern: "song",
    desc: "Download songs",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        const search = await yts(q);
        if (!search || !search.videos || search.videos.length === 0) {
            return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });
        }

        const data = search.videos[0];

        let desc = `
🎞️ *Senal MD Audio Downloader* 📄
Title: ${data.title}
📖 Description: ${data.description}
Time: ${data.time}
Ago: ${data.ago}
👁️ Views: ${data.views}
Made By Senal-MD ✔️
`;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio
        const stream = ytdl(data.url, { filter: 'audioonly', quality: 'highestaudio' });

        stream.on('error', (error) => {
            console.error('Download error:', error);
            if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
                return conn.sendMessage(from, { text: "Network error. Please try again later." }, { quoted: mek });
            } else if (error.message.includes("410")) {
                return conn.sendMessage(from, { text: "The video is no longer available. Please try another video." }, { quoted: mek });
            }
            return conn.sendMessage(from, { text: `Error: ${error.message}` }, { quoted: mek });
        });

        await conn.sendMessage(from, { audio: { url: data.url }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: data.url }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "Made By SenalMD" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

// Command for downloading videos
cmd({
    pattern: "video",
    desc: "Download videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q }) => {
    try {
        if (!q) return conn.sendMessage(from, { text: "Please provide a URL or title." }, { quoted: mek });

        const search = await yts(q);
        if (!search || !search.videos || search.videos.length === 0) {
            return conn.sendMessage(from, { text: "No results found." }, { quoted: mek });
        }

        const data = search.videos[0];

        let desc = `
🎞️ *Senal MD Video Downloader* 📄
Title: ${data.title}
📖 Description: ${data.description}
Time: ${data.time}
Ago: ${data.ago}
👁️ Views: ${data.views}
Made By Senal-MD ✔️
`;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download video
        const stream = ytdl(data.url, { filter: 'videoandaudio', quality: 'highestvideo' });

        stream.on('error', (error) => {
            console.error('Download error:', error);
            if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
                return conn.sendMessage(from, { text: "Network error. Please try again later." }, { quoted: mek });
            } else if (error.message.includes("410")) {
                return conn.sendMessage(from, { text: "The video is no longer available. Please try another video." }, { quoted: mek });
            }
            return conn.sendMessage(from, { text: `Error: ${error.message}` }, { quoted: mek });
        });

        await conn.sendMessage(from, { video: { url: data.url }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: data.url }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "Made By SenalMD" }, { quoted: mek });

    } catch (e) {
        console.log(e);
        conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});
