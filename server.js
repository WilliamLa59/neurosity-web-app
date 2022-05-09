//imports
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
var cors = require('cors');
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

//app.use
app.use(morgan('tiny'));//HTTP request logger
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

require("dotenv").config();

//mongoose connect
const connection_string = process.env.CONNECTION_STRING
mongoose.connect(connection_string, {
    useNewURLParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully..."))
.catch((error) => console.error("MongoDB connection failed: ", error.message) )

//schema
const Schema = mongoose.Schema;
const MindSchema = new Schema ({
    brainwaves: String,
    calm: String,
    focus: String,
    date: { type: String, default: Date.now }
})

//model
const MindLog = mongoose.model("MindLog", MindSchema);

//routes
app.post('/save', (req, res) => {
    const data = req.body;
    const newMindLog = new MindLog(data)
    console.log(newMindLog);
    newMindLog.save((error) => {
        if (error) {
            res.status(500).json({msg: 'internal server error'});
            return;
        }
        return res.json({
            msg:'data has been saved'
        });
        
    });
});

app.listen(PORT, console.log("Server is starting at " + PORT));

