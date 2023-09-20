require("dotenv").config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use('/img', express.static(__dirname + '/img'));
app.use(express.json())
app.use(cors())

app.use(require('./routes/user.route'));
app.use(require('./routes/card.route'))



mongoose.connect(process.env.MONGO_SERVER,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("start"))
.catch((error) => console.log(error))

app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
