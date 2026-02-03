const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

const requireTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'Teacher') {
        next();
    } else {
        res.status(403).json({ message: 'Teacher access required' });
    }
};

const requireStudent = (req, res, next) => {
    if (req.user && req.user.role === 'Student') {
        next();
    } else {
        res.status(403).json({ message: 'Student access required' });
    }
};

const requireAdminOrTeacher = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Teacher')) {
        next();
    } else {
        res.status(403).json({ message: 'Admin or Teacher access required' });
    }
};

module.exports = {
    requireAdmin,
    requireTeacher,
    requireStudent,
    requireAdminOrTeacher
};
