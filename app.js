const express = require('express'); 
const app = express();               
const taskRoutes = require("./routes/taskRoute.js");
const connectDB = require('./db');
const PORT = process.env.PORT || 3000;
              

// Middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Welcome to our server");
});

// const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use("/", taskRoutes);


//connect to MongoDb
connectDB();
 
