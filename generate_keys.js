const { createECDH, createPublicKey } = require("crypto");
const { exit } = require("process");
const args = require("yargs").argv
const fs = require("fs")
console.log(args.name);

if(!args.name){
    console.log("please specify the --name argument to start the execution" );
    exit(0)
}

const keyPair = createECDH("secp521r1")
const publicKey = keyPair.generateKeys("hex")
const privateKey = keyPair.getPrivateKey("hex")
fs.writeFileSync("./data/"+args.name+".pub", publicKey)
fs.writeFileSync("./data/"+args.name+".key", privateKey)