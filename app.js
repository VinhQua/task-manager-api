

const express = require('express');
const app = express();
const taskRoute = require('./routes/tasks');
const {connectDB} = require('./db/connect')
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
require('dotenv').config()    
const port = 3000
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`listening on ${port}...`);
        })
    } catch (err) {

    }
}

start()

// middlewares
app.use(express.json())
app.use(express.static('./public'))

//routes
app.use('/api/v1/tasks', taskRoute)

//404
app.use(notFound)
app.use(errorHandlerMiddleware)







