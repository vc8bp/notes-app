const connectToMongo = require("./db")
const express = require('express')
connectToMongo();
var cors = require('cors')
const app = express()
const port = 5000


//used to acces api from browser
app.use(cors())

app.use(express.json())
 
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth', require('./routs/auth'))
app.use('/api/notes', require('./routs/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
