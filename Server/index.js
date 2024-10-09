const express = require('express');

const dotenv = require('dotenv');
// const {} = require("openai")
const messageRoute = require('./router/message.js');
const app = express();
const PORT = process.env.PORT ||8000
dotenv.config();
app.use(messageRoute)

app.listen(PORT,()=>{
    console.log("Listening on ",PORT)
})