const { createECDH, createDecipheriv } = require("crypto");
const { exit } = require("process")
const args = require("yargs").argv
const fs = require("fs")

if(!args.private && !args.public && !args.file){
    console.log("Please add --file, --private, --public, parameters to start encryption. ");
    exit(0)
}

const origin = createECDH("secp521r1")
const key = fs.readFileSync("./data/"+ args.private + ".key").toString()
origin.setPrivateKey(key, "hex")

const pub = fs.readFileSync("./data/" + args.public +".pub").toString()


//Creation of SHARED secret key
const secret = Uint8Array.from(origin.computeSecret(pub, "hex", 'binary'))


//decipher of the file
const algot = 'aes-256-cbc'
var decipher = createDecipheriv(algot, secret.slice(0,32), secret.slice(0,16))
const encryptedFile = fs.readFileSync("./data/" + args.private + "-" + args.file + ".enc").toString()

let decrypted = decipher.update(encryptedFile, 'hex', 'utf-8')
decrypted += decipher.final("utf-8")
console.log(decrypted);
fs.writeFileSync("./data/" + args.private + "-" + args.file  + ".dec", decrypted)