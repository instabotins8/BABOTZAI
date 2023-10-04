const fs = require('fs')
const chalk = require('chalk')

global.owner = '6285704026706@s.whatsapp.net'
global.namabotnya = '~BABOTZ AI'
global.namaownernya = 'Aril Narindra'
global.packname = '©Powered By ArilNarindra|+62🇲🇨\nIG: @xinnchan_795'
global.author = 'Wa : +62 857-0402-6706\nYT : XinnChan'
global.sessionName = 'session'
global.lolkey = 'XinnKenjiFong'
global.email = 'westatas21@gmail.com'
global.group = 'https://chat.whatsapp.com/CyXve8oC4Gn9VbvwHdHZym'
global.youtube = 'https://youtube.com/channel/UCHEovj1ueVlQQRyiF0ObPRA'
global.website = 'https://github.com/ArilNarindra'
global.github = 'https://github.com/ArilNarindra'
global.nomorowner = 'https://wa.me/6285753428048'
global.region = 'I`m From Indonesia'
global.prefa = ['','!','.','#','-','•']
global.self = true
global.krmd = {
    success: '```Success✅```',
    admin: '```Fitur Khusus Admin Group!!!```',
    botAdmin: '```Bot Harus Menjadi Admin Terlebih Dahulu!!!```',
    owner: '```Fitur Khusus Owner Bot!!!```',
    group: '```Fitur Digunakan Hanya Untuk Group!!!```',
    private: '```Fitur Digunakan Hanya Untuk Private Chat!!!```',
    bot: '```Fitur Khusus Pengguna Nomor Bot!!!```',
    error: '```Mungkin Lagi Error Kak Harap Lapor Owner Biar Langsung Di Benerin🙏```',
    wait: '```Waittt...```',
    sewa: '```Fitur ini hanya bisa di akses setelah melakukan sewa bot ketik .sewa untuk melihat list sewa bot santed🙏```'
}

global.f1 = (a, b) => {let fake = {key: {remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net'}, message: {orderMessage: {itemCount: 1000000, status: 1, surface: 1, message: a, orderTitle: '', thumbnail: b, sellerJid: '0@s.whatsapp.net'}}};return fake}

// SETTING GAME
global.gamewaktu = 60 // Game waktu
global.bmin = 1000 // Balance minimal 
global.bmax = 3000 // Balance maksimal
global.limit = 15 // Limit user

// DATABASE GAME
global.suit = {};
global.petakbom = {};
global.kuis = {};
global.siapakahaku = {};
global.asahotak = {};
global.susunkata = {};
global.caklontong = {};
global.family100 = {};
global.tebaklirik = {};
global.tebaklagu = {};
global.tebakgambar = {};
global.tebakkimia = {};
global.tebakkata = {};
global.tebakkalimat = {};
global.tebakbendera = {};
global.tebakanime = {};
global.tebakkabupaten = {};
global.kuismath = {};

global.thumb = fs.existsSync('./thumbnail.jpg') ? fs.readFileSync('./thumbnail.jpg') : console.log("Error: no such file or directory, open './thumbnail.jpg'")

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
