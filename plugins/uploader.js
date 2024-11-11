const { fetchJson } = require('@whiskeysockets/baileys');
const { exec } = require('child_process');

// Function to upload media
async function uploadMedia(url, conn, from, mek) {
  try {
    const command = `yt-dlp -f bestaudio -o - ${url}`; // To get the audio stream directly
    exec(command, { encoding: 'buffer' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing yt-dlp: ${stderr}`);
        return;
      }

      // Send audio directly
      conn.sendMessage(from, { audio: { url: stdout }, mimetype: 'audio/mpeg' }, { quoted: mek });
    });
  } catch (err) {
    console.error('Error uploading media:', err);
  }
}

module.exports = { uploadMedia };
