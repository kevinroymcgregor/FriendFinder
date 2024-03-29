const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "/app/public")));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("FriendFinder listening on PORT " + PORT);
});