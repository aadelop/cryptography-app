const {createCipher, createECDH, createCipheriv} = require("crypto")
const args = require("yargs").argv
const { exit } = require("process");
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

//cipher of the file
const algot = 'aes-256-cbc'
var cipher = createCipheriv(algot, secret.slice(0,32), secret.slice(0,16))

fs.createReadStream("./data/"+args.file)
    .pipe(cipher)
    .pipe(new fs.createWriteStream("./data/"+ args.public + "-" + args.file + ".enc"))