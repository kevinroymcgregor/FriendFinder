const fs = require("fs");
const path = require("path");
const raw = fs.readFileSync(path.join(__dirname, "friends.json"));
const friends = JSON.parse(raw);
module.exports = friends;