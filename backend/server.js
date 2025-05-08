const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors  = require('cors')
dotenv.config();
const userRoutes = require('./routes/userRoutes')
const notesRoutes = require('./routes/notesRoutes')

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {})
mongoose.connection.on('connected', () => {
    console.log("Database Connected Successfully...");
})

// Updated CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api/user", userRoutes)
app.use("/api/notes", notesRoutes);

const port = process.env.PORT || 5000; // Changed default to 5000
app.listen(port, () => {
   console.log(`Server is up and running on port:: ${port}`)
})