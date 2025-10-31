const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

// Load .env if present (optional)
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not installed or no .env file — that's fine
}

app.use(express.json());
app.use(cors());

// Prefer explicit env var. For local development, you can set MONGODB_URI or MONGO_LOCAL_URI.
// If neither is set, fall back to localhost (no credentials).
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_LOCAL_URI || 'mongodb+srv://Nazhmidev:Nazhmihakimah654@cluster0.qgccscf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

function startServer() {
    // API Creation
    app.get("/", (req, res) => {
        res.send("Express is running");
    });

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage:storage});

//Creating Upload Image 
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('product'),(req,res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Product
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id
    }
    const product = new Product({
        id:id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//Create API for delete product
app.post('/removeproduct', async (req, res) =>{
    await Product.findOneAndDelete({id:req.body});
    console.log("removed");
    res.json({
        success: true,
        name: req.body.name,
    })
});

// Create API for get All product
app.get('/allproducts', async (req, res) =>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


    app.listen(port, (error) => {
        if (!error) {
            console.log("Server is Successfully Running, and App is listening on port " + port);
        } else {
            console.log("Error : " + error);
        }
    });
}

// Try to connect to MongoDB but do not exit the process if it fails — start server in dev mode instead
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        startServer();
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error && error.message ? error.message : error);
        console.log("Starting server without DB connection (development fallback). Set MONGODB_URI to connect to your DB.");
        startServer();
    });

// catch unhandled rejections to provide a clearer log
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason && reason.message ? reason.message : reason);
});