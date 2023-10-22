const cors = require('cors');
const express = require('express')
const users=require('./route/users')



const app = express()
const port = 8000

app.use(cors());
app.use('/users', users)


app.get('/contact', (req, res) => {
  res.send('Hello World React App!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




