// Backup of index.js before introducing nomongo fallback

const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Load .env if present (optional)
try {
  require('dotenv').config();
} catch (e) {}

app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_LOCAL_URI || 'mongodb://0.0.0.0/0/Albani';

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: 0, message: 'No file uploaded' });
  res.json({ success: 1, image_url: `http://localhost:${port}/images/${req.file.filename}` });
});

// Product Schema and routes omitted in backup — full original is in index.js
