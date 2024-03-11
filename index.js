const express = require('express')
const urlShortenRouter = require('./routes/urlShorten')
const app = express();
// app.use(bodyParser.json());
app.use(express.json());

app.use("/",urlShortenRouter)
app.listen(3000, ()=> {
    console.log("App listening to port 3000");
})