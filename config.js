const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "Am0EETTb#Q0CLGC5zKxSaXG-3_yxDr3ILpUvY818F-o8u88mpToQ",
ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/f2be313fe820b56b47748.png",
ALIVE_MSG: process.env.ALIVE_MSG || "Hello, I'm Senal",
};
