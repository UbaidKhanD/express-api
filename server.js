const cors = require('cors');
const express = require('express')
const users=require('./route/users')



const app = express()
const port = 8000
app.use(express.json())
app.use(express.urlencoded());

app.use(cors());


app.use('/user', users)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




