const app = require('./app')

app.listen(8080, function (err) {
  if (err) {
    console.error(err)
    return
  }
  console.log('Server radi na portu', 8080)
})