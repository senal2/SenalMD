const {cmd , commands} = require('../command')
const fg = require("api-dylux")
const yts = require("yt-search")

cmd({
    pattern: "song",
    desc: "download songs",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if(!q) return(please url or title)
    const search = await yts(q)
    const data = search.video[0]

    let desc = '
    🎞️ *Senal MD Audio Downloader* 📄

    title: ${data.title}
    📖 description: ${data.description}
    time: ${data.time}
    ago: ${data.ago}
    👁️ views: ${data.views}

    Made By Senal-MD ✔️
    
    '
    await conn.sendmessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

    //download audio

    let down = await fg.yta(url)
    let downloadUrl = down.dl_url

    //send audio message
    await conn.sendMessage(from.{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
    await conn.sendMessage(from.{document: {url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"Made By SenalMD"},{quoted:mek})

}catch(e){
    console.log(e)
    reply('${e}')
}
})

//==========video dl========//

cmd({
    pattern: "video",
    desc: "download videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if(!q) return(please url or title)
    const search = await yts(q)
    const data = search.video[0]

    let desc = '
    🎞️ *Senal MD video Downloader* 📄

    title: ${data.title}
    📖 description: ${data.description}
    time: ${data.time}
    ago: ${data.ago}
    👁️ views: ${data.views}

    Made By Senal-MD ✔️
    
    '
    await conn.sendmessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

    //download video

    let down = await fg.ytv(url)
    let downloadUrl = down.dl_url

    //send video message
    await conn.sendMessage(from.{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
    await conn.sendMessage(from.{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"Made By SenalMD"},{quoted:mek})


}catch(e){
    console.log(e)
    reply('${e}')
}
})
