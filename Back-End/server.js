const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productRoute = require('./routes/product.js')
const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/users.js')
const cors = require("cors");
const path = require("path")
const static_path=path.join(__dirname,"../public");
console.log(static_path)



const PORT = process.env.PORT || 3000;
dotenv.config();
const app = express()



mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=>  console.log("mongo is connected"))
    .catch((err)=>{
        console.log(err);
    });
    
    app.use(cors());

    //All API Route Goes Here
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use(express.static(static_path));

app.get('/', (req, res) => {
    const filePath = path.join('public',  'index.html');
    const options = {
      root: path.join(__dirname, '/')
    };
    res.sendFile(filePath, options);
  });

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})