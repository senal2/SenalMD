const { cmd } = require('../command');
const MovieDL = require('mrnima-moviedl');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "movied",
    desc: "Download movies and send as file",
    category: "download",
    react: "🎥",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*🎬 Please provide a movie name!*\nExample: .moviedl Spider-Man");

        // Step 1: Search for the Movie
        reply("*🔎 Searching for movie torrents...*");
        const results = await MovieDL.search(q);
        if (results.length === 0) return reply("*🚫 No results found for this movie!*");

        const selectedMovie = results[0];
        reply(`*🎥 Found: ${selectedMovie.title}*\n*⬇️ Starting download...*`);

        // Step 2: Download Movie
        const movieStream = await MovieDL.download(selectedMovie.magnet);
        if (!movieStream) return reply("*🚫 Failed to download the movie!*");

        const fileName = `${selectedMovie.title}.mp4`;
        const filePath = path.join('/tmp', fileName); // Save in a temporary location
        const fileStream = fs.createWriteStream(filePath);
        movieStream.pipe(fileStream);

        fileStream.on('finish', async () => {
            try {
                // Step 3: Upload to Pixeldrain or similar API
                reply("*📤 Uploading movie to a temporary server...*");
                const form = new FormData();
                form.append('file', fs.createReadStream(filePath));

                const uploadResponse = await axios.post('https://pixeldrain.com/api/file', form, {
                    headers: form.getHeaders(),
                });

                const fileUrl = `https://pixeldrain.com/u/${uploadResponse.data.id}`;
                reply(`*✅ Movie uploaded! Sending now...*`);

                // Step 4: Send the movie file directly via WhatsApp
                await conn.sendMessage(from, {
                    document: { url: fileUrl },
                    mimetype: "video/mp4",
                    fileName: fileName,
                    caption: `*🎬 Movie*: ${selectedMovie.title}\nPowered by SENAL MD`,
                }, { quoted: mek });

                // Cleanup temporary file
                fs.unlinkSync(filePath);
            } catch (error) {
                reply(`*🚫 Error uploading movie:*\n${error.message}`);
                fs.unlinkSync(filePath);
            }
        });
    } catch (e) {
        console.error(e);
        reply(`*🚫 Error:*\n${e}`);
    }
});
