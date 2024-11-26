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

        // Validate TikTok URL (both shortened and full links)
        const isTikTokUrl = url.match(/^(https?:\/\/)?(www\.)?(tiktok\.com)\/.+$/);
        if (!isTikTokUrl) {
            return reply("❌ Invalid TikTok URL. Please provide a valid TikTok video link.");
        }

        // Fetch video download link using an API (you can replace with another API if needed)
        const apiUrl = `https://api.dylux.com/tiktok?url=${encodeURIComponent(url)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.video || !data.video.url) {
            return reply("❌ Failed to fetch the TikTok video. Please try again.");
        }

        const downloadUrl = data.video.url;
        const videoTitle = data.video.title || "TikTok Video";

        console.log("[TIKTOK COMMAND] Download URL:", downloadUrl);

        // Send the video directly via the download URL
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4", caption: `🎥 *Downloaded from TikTok*\n\n🔗 *Source URL:* ${url}` }, { quoted: mek });

    } catch (e) {
        console.error("[TIKTOK COMMAND] Error:", e);
        reply(`❌ An error occurred while processing your TikTok request.\n\n*Error Details:* ${e.message}`);
    }
});
