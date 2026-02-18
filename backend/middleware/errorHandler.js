/**
 * Centralized Error Handler Middleware
 * Prevents sensitive data exposure and provides consistent error responses
 */

const errorHandler = (err, req, res, next) => {
    // Log error for debugging (will be replaced with Winston in Phase 2)
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
        path: req.path,
        method: req.method
    });

    // Determine status code
    const statusCode = err.statusCode || 500;

    // Don't expose internal errors in production
    const message = process.env.NODE_ENV === 'production' && statusCode === 500
        ? 'Internal server error'
        : err.message || 'An error occurred';

    // Send error response
    res.status(statusCode).json({
        success: false,
        message,
        // Only include stack trace in development
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};

export default errorHandler;
