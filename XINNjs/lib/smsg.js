const fs = require('fs')
const chalk = require('chalk')

const { proto, downloadContentFromMessage, jidDecode, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')


const dlMessage = async(message) => {
try {
let mime = (message.msg || message).mimetype || '';
let messageType = message.mtype ? message.mtype.replace(/Message/gi, ''): mime.split('/')[0];
const stream = await downloadContentFromMessage(message,messageType);
let buffer = Buffer.from([]);
for await(const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
return buffer
}catch(e){console.log(e)}
}

module.exports = (xinn, m) => {
if (!m) return m
let M = proto.WebMessageInfo
m = M.fromObject(m)
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
m.chat = xinn.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
m.now = m.messageTimestamp
m.isGroup = m.chat.endsWith('@g.us')
m.sender = xinn.decodeJid(m.key.fromMe && xinn.user.id || m.participant || m.key.participant || m.chat || '')
m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, xinn.user.id)
m.from = m.key.remoteJid
}

if (m.message) {
let mtype = Object.keys(m.message)
m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || 
(mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || mtype[mtype.length - 1] 
m.mtype = getContentType(m.message) /*Dapatkan dan meng Inisialisasi content ambil dari baileys*/
m.content = JSON.stringify(m.message)
m.botNumber = xinn.user.id ? xinn.user.id.split(":")[0]+"@s.whatsapp.net" : xinn.user.jid
m.senderNumber = m.sender.split('@')[0]
m.pushname = m.pushName || 'No Name'
m.itsMe = m.sender == m.botNumber ? true : false
m.mentionByTag = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
m.mentionByReply = m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : "" 
m.users = m.mentionByReply ? m.mentionByReply : m.mentionByTag[0]
m.budy = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype === 'extendedTextMessage') ? m.message.extendedTextMessage.text : '' 
m.body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId ) : ''
m.args = m.body.trim().split(/ +/).slice(1) 
m.numberQuery = m.args.join(' ').replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
m.msg = (m.mtype == 'viewOnceMessageV2' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
if (m.mtype == 'protocolMessage' && m.msg.key) {
if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
m.msg.key.fromMe = xinn.decodeJid(m.msg.key.participant) === xinn.decodeJid(xinn.user.id)
if (!m.msg.key.fromMe && m.msg.key.remoteJid === xinn.decodeJid(xinn.user.id)) m.msg.key.remoteJid = m.sender
}
//m.msg.text || m.msg.caption || m.msg.contentText ||
m.text =m.msg || ''
//m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
if (m.quoted) {
let type = Object.keys(m.quoted)[0]
m.quoted = m.quoted[type]
if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = xinn.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
m.quoted.sender = xinn.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === xinn.user.jid
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
let vM = m.quoted.fakeObj = M.fromObject({
key: {
fromMe: m.quoted.fromMe,
remoteJid: m.quoted.chat,
id: m.quoted.id
},
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return null
let q = M.fromObject(await xinn.loadMessage(m.quoted.id) || vM)
return exports.smsg(xinn, q)
}
if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => xinn.downloadMediaMessage(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
m.quoted.reply = (text, chatId, options) => xinn.sendteks(chatId ? chatId : m.chat, text, vM, options)
m.quoted.copy = () => exports.smsg(xinn, M.fromObject(M.toObject(vM)))
m.quoted.forward = (jid, forceForward = false) => xinn.forwardMessage(jid, vM, forceForward)
m.quoted.copyNForward = (jid, forceForward = true, options = {}) => xinn.copyNForward(jid, vM, forceForward, options)
m.quoted.delete = () => xinn.sendMessage(m.quoted.chat, { delete: vM.key })
}
}
//if (m.msg && m.msg.url) m.download = (saveToFile = false) => xinn.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
if (m.msg?.url) m.download = () => dlMessage(m.msg)
//m.reply = (text, chatId, options) => xinn.reply(chatId ? chatId : m.chat, text, m, options)
m.reply = (text, chatId, options) => xinn.sendteks(chatId ? chatId : m.chat, text, m, options)
m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => xinn.copyNForward(jid, m, forceForward, options)
m.delete = () => xinn.sendMessage(m.chat, { delete: m.key })

return m
}