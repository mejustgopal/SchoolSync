/**
 * Centralized Error Handler Middleware
 * Prevents sensitive data exposure and provides consistent error responses
 */

const errorHandler = (err, req, res, next) => {
    // Log error for debugging (will be replaced with Winston in Phase 2)
    console.error('Error:', {
        name: err.name,
        message: err.message,
        path: req.path,
        method: req.method
    });

    let statusCode = err.statusCode || 500;
    let message = err.message || 'An error occurred';

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        message = 'Resource not found or invalid ID format';
        statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        message = 'Duplicate field value entered';
        statusCode = 409;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message).join(', ');
        statusCode = 400;
    }

    // Don't expose internal errors in production
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
        message = 'Internal server error';
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};

export default errorHandler;
