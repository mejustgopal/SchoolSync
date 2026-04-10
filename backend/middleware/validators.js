import { body, param, validationResult } from 'express-validator';

// Middleware to check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation Errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Student validation
const studentRegisterValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('rollNum').isInt({ min: 1 }).withMessage('Roll number must be a positive integer'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('sclassName').isMongoId().withMessage('Valid Class ID is required'),
    body('adminID').isMongoId().withMessage('Valid Admin ID is required'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    validate
];

const studentLoginValidation = [
    body('rollNum').isInt({ min: 1 }).withMessage('Roll number must be a positive integer'),
    body('studentName').trim().notEmpty().withMessage('Student name is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
];

// Teacher validation
const teacherRegisterValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('school').isMongoId().withMessage('Valid School ID is required'),
    body('teachSubject').isMongoId().withMessage('Valid Subject ID is required'),
    body('teachSclass').isMongoId().withMessage('Valid Class ID is required'),
    validate
];

const teacherLoginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
];

// Admin validation
const adminRegisterValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('schoolName').trim().notEmpty().withMessage('School name is required'),
    validate
];

const adminLoginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
];

// Subject validation
const subjectCreateValidation = [
    body('subjects').isArray({ min: 1 }).withMessage('Subjects must be a non-empty array'),
    body('subjects.*.subName').trim().notEmpty().withMessage('Subject name is required'),
    body('subjects.*.subCode').trim().notEmpty().withMessage('Subject code is required'),
    body('subjects.*.sessions').isInt({ min: 1 }).withMessage('Sessions must be a positive integer'),
    body('sclassName').notEmpty().withMessage('Class is required'),
    body('adminID').notEmpty().withMessage('Admin ID is required'),
    validate
];

// Notice validation
const noticeCreateValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('details').trim().notEmpty().withMessage('Details are required'),
    body('date').isISO8601().withMessage('Invalid date format'),
    validate
];

// Notice update validation
const noticeUpdateValidation = [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('details').optional().trim().notEmpty().withMessage('Details cannot be empty'),
    body('date').optional().isISO8601().withMessage('Invalid date format'),
    validate
];

// Complain validation
const complainCreateValidation = [
    body('complaint').trim().notEmpty().withMessage('Complaint is required'),
    body('date').isISO8601().withMessage('Invalid date format'),
    body('user').notEmpty().withMessage('User ID is required'),
    body('school').notEmpty().withMessage('School ID is required'),
    validate
];

// Class validation
const sclassCreateValidation = [
    body('sclassName').trim().notEmpty().withMessage('Class name is required'),
    validate
];

// Student attendance validation
const studentAttendanceValidation = [
    body('subName').notEmpty().withMessage('Subject ID is required'),
    body('status').isIn(['Present', 'Absent']).withMessage('Status must be "Present" or "Absent"'),
    body('date').isISO8601().withMessage('Valid date is required'),
    validate
];

// Exam result validation
const examResultValidation = [
    body('subName').notEmpty().withMessage('Subject ID is required'),
    body('marksObtained').isFloat({ min: 0, max: 100 }).withMessage('Marks must be between 0 and 100'),
    validate
];

// Student profile update validation (all fields optional)
const studentUpdateValidation = [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('rollNum').optional().isInt({ min: 1 }).withMessage('Roll number must be a positive integer'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate
];

// ID parameter validation
const idParamValidation = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    validate
];

export {
    studentRegisterValidation,
    studentLoginValidation,
    teacherRegisterValidation,
    teacherLoginValidation,
    adminRegisterValidation,
    adminLoginValidation,
    subjectCreateValidation,
    noticeCreateValidation,
    noticeUpdateValidation,
    complainCreateValidation,
    sclassCreateValidation,
    idParamValidation,
    studentAttendanceValidation,
    examResultValidation,
    studentUpdateValidation,
    validate
};
