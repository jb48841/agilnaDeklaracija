const Router = require("@koa/router");
const router = new Router();
const { readFile } = require("fs").promises;

router.get("/signatures", async (ctx) => {
  const files = await readFile("./names.txt");
  const filesParsed = JSON.parse(files);
  ctx.body = filesParsed;
});

module.exports = router;
