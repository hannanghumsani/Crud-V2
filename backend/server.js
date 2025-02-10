const express = require("express")
require('dotenv').config()
const connectDB = require('./config/db')
const userRoutes = require("./route/userRoute");
const cors = require('cors')


const app = express()
// console.log(process.env.Port);
connectDB();

app.use(cors())
app.use(express.json());
const Port = process.env.Port

app.get("/", (req, res) => {
    res.send("Express server is listening")
})

app.use("/user", userRoutes);


app.listen(Port, () => {
    console.log("listening on port 8080");
})