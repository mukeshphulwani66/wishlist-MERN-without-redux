const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
//serving static files
app.use(express.static('public'))


require('./models/wish')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// import routes
require('./routes')(app);

// in case of production
if(process.env.NODE_ENV=="production"){

app.use(express.static('client/build'))
const path = require('path');
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})  

}


app.listen(port,()=>{
    console.log("server is running on port" + port)
})

