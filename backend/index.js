import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
import Routes from "./routes/route.js";

// Security middlewares
app.use(helmet());
app.use(mongoSanitize());

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

// Configure CORS
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://schoolizonline.vercel.app',
    'http://localhost:3000'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(o => origin.startsWith(o))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.use('/', Routes);

// Error handler must be LAST middleware
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server started at port no. ${PORT}`);
    });
}

// Export for Vercel serverless
export default app;