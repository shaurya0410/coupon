const express = require("express");
const app = express();
const auth = require("./router/auth");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/auth",auth);

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/4HS").then(()=>{console.log('mongodb connected');}).catch((error)=>{error});
// mongoose.connect("mongodb+srv://shaurya:21212121@4hs.qli2m8m.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log('mongodb connected');}).catch((error)=>{error});

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(PORT, () => {
  console.log(`listening at port - ${PORT}`);
});
