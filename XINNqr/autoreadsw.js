
//utf-8
//clasesdex
//xinn KENJI
//JABAL SURYA

//KALO MAU RENAME MINIMAL IZIN YA TOLONG LAH JANGAN DI RENAME JUGA HARGAI PENCIPTA FUNCTION NYA TOLONG YAK TOLONG BANGET JANGAN DI RINEM KALIAN CUMAN TINGGAL PAKAI JADINYA AJA!!!!

/*
XIN BOTZ
*/

// wa.me/6282143067466


const fs = require('fs')
const chalk = require('chalk')
const { getContentType } = require('@adiwajshing/baileys')
const { getBuffer } = require('../XINNjs/lib/functions')

module.exports = async(xinn, msg, m) => {
if (global.autoreadsw && (msg.key.remoteJid === 'status@broadcast')) {
/*if (msg.key.participant == global.owner) return*/
await xinn.readMessages([msg.key])
let mt = getContentType(msg.message)
let swdel = `Status dari @${msg.key.participant.split('@')[0]} Telah dihapus`
if (/protocolMessage/i.test(mt)) xinn.sendMessage(global.owner, {text: swdel, mentions: [msg.key.participant]}, {quoted:m})
if (/(imageMessage|audioMessage|videoMessage|extendedTextMessage)/i.test(mt)) {
let laporsw = `Melihat story dari @${msg.key.participant.split('@')[0]} ${(mt == 'extendedTextMessage') ? '\nStory Teks Berisi : '+msg.message.extendedTextMessage.text : (mt == 'imageMessage') ? '\nStory Gambar dengan Caption : '+msg.message.imageMessage.caption : (mt == 'audioMessage') ? '\nStory Audio dengan Caption : '+msg.message.audioMessage.caption : (mt == 'videoMessage') ? '\nStory Video dengan Caption : '+msg.message.videoMessage.caption : '\nTidak diketahui cek aja langsung.'}`
xinn.copyNForward(global.owner, m, {text: laporsw, mentions: [msg.key.participant]}, {quoted:m})
xinn.sendMessage(global.owner, {text: laporsw, mentions: [msg.key.participant]}, {quoted: m })
}
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright("[ UPDATE ]"), chalk.whiteBright(`${__filename}`) )
delete require.cache[file]
require(file)
})