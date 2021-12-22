const Koa = require('koa')

const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

app.use(require('koa-bodyparser')())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error(err)
    ctx.body = { err }
  }
})

app.use(require('./routes/signatures').routes())

module.exports = app
