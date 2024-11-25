const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');
const { 
  getBuffer, 
  getGroupAdmins, 
  getRandom, 
  h2k, 
  isUrl, 
  Json, 
  runtime, 
  sleep, 
  fetchJson 
} = require('./lib/functions');
const fs = require('fs');
const P = require('pino');
const config = require('./config');
const qrcode = require('qrcode-terminal');
const util = require('util');
const { sms, downloadMediaMessage } = require('./lib/msg');
const axios = require('axios');
const { File } = require('megajs');
const express = require('express');

const app = express();
const port = process.env.PORT || 8000;
const prefix = '.';
const ownerNumber = ['94767707223'];

// ================= SESSION AUTH ============================
if (!fs.existsSync('./auth_info_baileys/creds.json')) {
  if (!config.SESSION_ID) return console.log('Please add SESSION_ID to your environment variables!');
  const sessdata = config.SESSION_ID;
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
  filer.download((err, data) => {
    if (err) throw err;
    fs.writeFile('./auth_info_baileys/creds.json', data, () => {
      console.log("Session downloaded ✅");
    });
  });
}

// ============ BOT CONNECTION ===========================
async function connectToWA() {
  console.log("Connecting WA bot 🧬...");
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info_baileys/');
  const { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version
  });

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log(`Connection closed. Reconnecting: ${shouldReconnect}`);
      if (shouldReconnect) connectToWA();
      else console.log("Logged out. Please reauthenticate.");
    } else if (connection === 'open') {
      console.log('Bot connected to WhatsApp ✅');
      loadPlugins(conn);
      conn.sendMessage(`${ownerNumber[0]}@s.whatsapp.net`, {
        text: `Bot connected successfully! Prefix: ${prefix}`
      });
    }
  });

  conn.ev.on('creds.update', saveCreds);

  conn.ev.on('messages.upsert', async (mek) => {
    const message = mek.messages[0];
    if (!message.message) return;

    const m = sms(conn, message);
    const type = getContentType(message.message);
    const from = message.key.remoteJid;
    const isCmd = m.body.startsWith(prefix);
    const command = isCmd ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const args = m.body.trim().split(/ +/).slice(1);
    const reply = (text) => conn.sendMessage(from, { text }, { quoted: message });

    // Handle Commands
    if (isCmd) {
      const cmdHandler = require('./command');
      const cmd = cmdHandler.commands.find((cmd) => cmd.pattern === command);
      if (cmd) {
        try {
          await cmd.function(conn, m, { from, command, args, reply });
        } catch (error) {
          console.error(`Command Error: ${error.message}`);
        }
      }
    }
  });
}

// ============ PLUGIN LOADER ================================
function loadPlugins(conn) {
  const path = require('path');
  fs.readdirSync("./plugins/").forEach((plugin) => {
    if (path.extname(plugin).toLowerCase() === ".js") {
      try {
        require(`./plugins/${plugin}`);
        console.log(`Loaded plugin: ${plugin}`);
      } catch (err) {
        console.error(`Failed to load plugin ${plugin}:`, err);
      }
    }
  });
}

// ============ SERVER ======================================
app.get("/", (req, res) => {
  res.send("Hey, bot started ✅");
});
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

// ============ START BOT ===================================
setTimeout(connectToWA, 4000);
