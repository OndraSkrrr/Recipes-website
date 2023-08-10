const mongoose = require("mongoose");

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://admin:password@localhost:27017');
    console.log("MongoDB Connected")
}

module.exports = mongoose