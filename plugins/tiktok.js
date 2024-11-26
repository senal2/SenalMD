const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiktok",
    desc: "Download TikTok videos",
    category: "download",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a TikTok video link.");
        const url = q.trim();
        console.log("[TIKTOK COMMAND] Input URL:", url);

        // Validate and normalize TikTok URL (shortened or full links)
        let fullUrl;
        if (url.match(/^https:\/\/vt\.tiktok\.com\/\S+$/)) {
            // If it's a shortened TikTok URL (like https://vt.tiktok.com/...)
            const response = await axios.get(url);
            const redirectedUrl = response.request.res.responseUrl;
            fullUrl = redirectedUrl;
        } else if (url.match(/^https:\/\/www\.tiktok\.com\/\S+$/)) {
            // If it's a full TikTok URL
            fullUrl = url;
        } else {
            return reply("❌ Invalid TikTok URL. Please provide a valid TikTok video link.");
        }

        console.log("[TIKTOK COMMAND] Full URL:", fullUrl);

        // Use an alternative API (like 'https://tiktokapi.com' or other available ones)
        const apiUrl = `https://tiktokapi.com/api/video?url=${encodeURIComponent(fullUrl)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.video || !data.video.url) {
            return reply("❌ Failed to fetch the TikTok video. Please try again.");
        }

        const downloadUrl = data.video.url;
        const videoTitle = data.video.title || "TikTok Video";

        console.log("[TIKTOK COMMAND] Download URL:", downloadUrl);

        // Send the video directly via the download URL
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4", caption: `🎥 *Downloaded from TikTok*\n\n🔗 *Source URL:* ${fullUrl}` }, { quoted: mek });

    } catch (e) {
        console.error("[TIKTOK COMMAND] Error:", e);
        reply(`❌ An error occurred while processing your TikTok request.\n\n*Error Details:* ${e.message}`);
    }
});
