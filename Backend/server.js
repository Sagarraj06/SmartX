require("dotenv").config();
const cors=require("cors");
const express = require("express");
const dbConnect = require("./config/mongoDbConnection");
const app = express();
const userRoute = require("./routes/userRoute");


const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// mount route
app.use("/api/v1",userRoute);

dbConnect();

app.listen(PORT,()=>{
console.log(`Servers is successfully running at port number ${PORT}`);
});
//