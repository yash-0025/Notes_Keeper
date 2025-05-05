const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./routes/userRoutes')
const notesRoutes = require('./routes/notesRoutes')



const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {})
mongoose.connection.on('connected', () => {
    console.log("Database Connected Successfully...");
})

app.use("/api/user", userRoutes)
app.use("/api/notes", notesRoutes);



const port = process.env.PORT || 5001;
app.listen(port, () => {
   console.log(`Server is up and running on port:: ${port}`)
})