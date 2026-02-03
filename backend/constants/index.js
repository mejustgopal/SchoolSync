// User Roles
const USER_ROLES = {
    ADMIN: 'Admin',
    TEACHER: 'Teacher',
    STUDENT: 'Student'
};

// Attendance Status
const ATTENDANCE_STATUS = {
    PRESENT: 'Present',
    ABSENT: 'Absent'
};

// HTTP Status Codes
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

// Error Messages
const ERROR_MESSAGES = {
    INVALID_CREDENTIALS: 'Invalid credentials',
    UNAUTHORIZED: 'Unauthorized access',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error'
};

module.exports = {
    USER_ROLES,
    ATTENDANCE_STATUS,
    HTTP_STATUS,
    ERROR_MESSAGES
};
