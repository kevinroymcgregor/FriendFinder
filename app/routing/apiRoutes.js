module.exports = function apiRoutes(app) {
  const fs = require("fs");
  const path = require("path");
  const friends = require("./../data/friends.js");

  app.get("/api/friends", function (req, res) {
      return res.json(friends);
  }); //get /api/friends

  app.post("/api/friends", function (req, res) {
      let tDiff = 0;
      const diffArr = [];
      const newFriend = req.body;

      for (let i = 0; i < friends.length; i++) {
          for (let j = 0; j < newFriend.scores.length; j++) {
              tDiff += Math.abs(friends[i].scores[j] - newFriend.scores[j]);
          } //for j
          diffArr.push(tDiff);
      } //for i

      const match = diffArr.indexOf(Math.min(...diffArr));

      friends.push(newFriend);
      
      console.log(newFriend);

      fs.readFile(path.join(__dirname, "../data/friends.json"), "utf8", function (err, data) {
          if (err) throw err;
          const json = JSON.parse(data);
          json.push(newFriend);
          fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(json, null, 2), function (err) {
              if (err) throw err;
          });
      }); //fs.readFile
      res.json(friends[match]);
  }); //post /api/friends
} //module.exports