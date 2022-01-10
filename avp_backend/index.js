const app = require("./app");
const scrape = require("./scrape");

scrape();

app.listen(8080, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server radi na portu", 8080);
});
