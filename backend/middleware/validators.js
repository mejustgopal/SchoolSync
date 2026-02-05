const { body, param, validationResult } = require('express-validator');

// Middleware to check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Student validation
const studentRegisterValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('rollNum').isInt({ min: 1 }).withMessage('Roll number must be a positive integer'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('sclassName').notEmpty().withMessage('Class is required'),
    body('adminID').notEmpty().withMessage('Admin ID is required'),
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
    body('school').notEmpty().withMessage('School ID is required'),
    body('teachSubject').notEmpty().withMessage('Subject is required'),
    body('teachSclass').notEmpty().withMessage('Class is required'),
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
    body('subjects').isArray().withMessage('Subjects must be an array'),
    body('subjects.*.subName').trim().notEmpty().withMessage('Subject name is required'),
    body('subjects.*.subCode').trim().notEmpty().withMessage('Subject code is required'),
    body('subjects.*.sessions').notEmpty().withMessage('Sessions is required'),
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

// ID parameter validation
const idParamValidation = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    validate
];

module.exports = {
    studentRegisterValidation,
    studentLoginValidation,
    teacherRegisterValidation,
    teacherLoginValidation,
    adminRegisterValidation,
    adminLoginValidation,
    subjectCreateValidation,
    noticeCreateValidation,
    complainCreateValidation,
    sclassCreateValidation,
    idParamValidation,
    validate
};
