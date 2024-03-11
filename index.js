const express = require('express')
const cors = require('cors)
const urlShortenRouter = require('./routes/urlShorten')

const app = express();
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/",urlShortenRouter)
app.listen(3000, ()=> {
    console.log("App listening to port 3000");
})
