const fs = require('fs')
const chalk = require('chalk')
const { join, dirname } = require('path')

const dirr = join('./XINNjs', './database')

const data = {
user: join(dirr, 'user.db.json'),
listall: join(dirr, 'listall.db.json'),
};

// database user
try {
fs.existsSync(data.user) ? JSON.parse(fs.readFileSync(data.user)) : fs.writeFileSync(data.user, JSON.stringify({}, null, 2))
} catch (err) {
fs.writeFileSync(data.user, JSON.stringify({}, null, 2));
console.log('FILE DATABASE USER ERROR!')
}

try {
fs.existsSync(data.listall) ? JSON.parse(fs.readFileSync(data.listall)) : fs.writeFileSync(data.listall, JSON.stringify([], null, 2))
} catch (err) {
fs.writeFileSync(data.listall, JSON.stringify([], null, 2));
console.log('FILE DATABASE LISTALL ERROR')
}

let db = {
user: JSON.parse(fs.readFileSync(data.user)),
listall: JSON.parse(fs.readFileSync(data.listall)),
}

async function initDatabase() {
setInterval(async() => {
fs.writeFileSync(data.user, JSON.stringify(db.user, null, 2)); //Write from read file db user 
fs.writeFileSync(data.listall, JSON.stringify(db.listall, null, 2)); //Write from read file db listall
}, 990);
}

module.exports = { db, initDatabase }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright("[ UPDATE ]"), chalk.whiteBright(`${__filename}`) )
delete require.cache[file]
require(file)
})