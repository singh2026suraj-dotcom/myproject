const express = require('express')
const cors = require('cors')
const connectDB = require('./db')

const app = express()
app.use(express.json())
var corsOptions = {
    origin: 'http://localhost:5173',
    method: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
const router = require('./router')
app.use('/things', router)
app.get('/', (req, res) => {
    res.send("hello ji ...")
})

connectDB()
    .then(() => {
        app.listen(4001, () => {
            console.log(`server is running at http://localhost:4001`)
        })
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message)
        process.exit(1)
    })