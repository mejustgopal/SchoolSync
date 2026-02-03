const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const errorHandler = require("./middleware/errorHandler.js")

dotenv.config();

const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5000

// Validate required environment variables
const requiredEnvVars = ['MONGO_URL', 'SECRET_KEY'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`❌ Missing required environment variable: ${varName}`);
        process.exit(1);
    }
});

app.use(express.json({ limit: '10mb' }))

// Configure CORS to only allow frontend URL
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Connect to MongoDB and start server only if connection succeeds
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ Connected to MongoDB");
        
        app.use('/', Routes);
        
        // Error handler must be LAST middleware
        app.use(errorHandler);
        
        app.listen(PORT, () => {
            console.log(`🚀 Server started at port no. ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });

module.exports = app;