const express = require('express')
const mongoose = require('mongoose')
const ActivityRouter = require('./routes/routes')

const app = express();

require('dotenv').config()

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://dev:dev123@cluster0.hnkooxq.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api", ActivityRouter)

mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
    .then(() => {
        app.listen(PORT, console.log(`Server started on ${PORT}`))
    })
    .catch((err) => {
        console.log(err)
    });