import express from 'express';
import rateLimit from 'express-rate-limit';
import authMiddleware from '../middleware/authMiddleware.js';
import { requireAdmin, requireTeacher, requireAdminOrTeacher } from '../middleware/roleMiddleware.js';
import {
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
    idParamValidation
} from '../middleware/validators.js';

import { adminRegister, adminLogIn, getAdminDetail, updateAdmin } from '../controllers/admin-controller.js';
import { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents, getSclassTeachers } from '../controllers/class-controller.js';
import { complainCreate, complainList, deleteComplain, deleteComplains } from '../controllers/complain-controller.js';
import { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } from '../controllers/notice-controller.js';
import {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance
} from '../controllers/student_controller.js';
import { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects, deleteSubjects } from '../controllers/subject-controller.js';
import { teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance, updateTeacher } from '../controllers/teacher-controller.js';

const router = express.Router();

// Rate limiting for login endpoints
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many login attempts, please try again later'
});

// Admin
router.post('/AdminReg', adminRegisterValidation, adminRegister);
router.post('/AdminLogin', loginLimiter, adminLoginValidation, adminLogIn);

router.get("/Admin/:id", authMiddleware, idParamValidation, getAdminDetail)
router.put("/Admin/:id", authMiddleware, idParamValidation, updateAdmin)


// Student

router.post('/StudentReg', authMiddleware, requireAdmin, studentRegisterValidation, studentRegister);
router.post('/StudentLogin', loginLimiter, studentLoginValidation, studentLogIn)

router.get("/Students/:id", authMiddleware, requireAdmin, idParamValidation, getStudents)
router.get("/Student/:id", authMiddleware, getStudentDetail)

router.delete("/Students/:id", authMiddleware, requireAdmin, idParamValidation, deleteStudents)
router.delete("/StudentsClass/:id", authMiddleware, requireAdmin, idParamValidation, deleteStudentsByClass)
router.delete("/Student/:id", authMiddleware, requireAdmin, idParamValidation, deleteStudent)

router.put("/Student/:id", authMiddleware, updateStudent)

router.put('/UpdateExamResult/:id', authMiddleware, requireAdminOrTeacher, updateExamResult)

router.put('/StudentAttendance/:id', authMiddleware, requireAdminOrTeacher, studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', authMiddleware, requireAdmin, clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', authMiddleware, requireAdmin, clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', authMiddleware, requireAdmin, removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', authMiddleware, requireAdmin, removeStudentAttendance)

// Teacher

router.post('/TeacherReg', authMiddleware, requireAdmin, teacherRegisterValidation, teacherRegister);
router.post('/TeacherLogin', loginLimiter, teacherLoginValidation, teacherLogIn)

router.get("/Teachers/:id", authMiddleware, requireAdmin, idParamValidation, getTeachers)
router.get("/Teacher/:id", authMiddleware, getTeacherDetail)

router.delete("/Teachers/:id", authMiddleware, requireAdmin, idParamValidation, deleteTeachers)
router.delete("/TeachersClass/:id", authMiddleware, requireAdmin, idParamValidation, deleteTeachersByClass)
router.delete("/Teacher/:id", authMiddleware, requireAdmin, idParamValidation, deleteTeacher)

router.put("/Teacher/:id", authMiddleware, updateTeacher)

router.put("/TeacherSubject", authMiddleware, requireAdmin, updateTeacherSubject)

router.post('/TeacherAttendance/:id', authMiddleware, requireAdmin, teacherAttendance)

// Notice

router.post('/NoticeCreate', authMiddleware, requireAdmin, noticeCreateValidation, noticeCreate);

router.get('/NoticeList/:id', authMiddleware, idParamValidation, noticeList);

router.delete("/Notices/:id", authMiddleware, requireAdmin, idParamValidation, deleteNotices)
router.delete("/Notice/:id", authMiddleware, requireAdmin, idParamValidation, deleteNotice)

router.put("/Notice/:id", authMiddleware, requireAdmin, updateNotice)

// Complain

router.post('/ComplainCreate', authMiddleware, complainCreateValidation, complainCreate);

router.get('/ComplainList/:id', authMiddleware, requireAdmin, idParamValidation, complainList);
router.delete("/Complain/:id", authMiddleware, requireAdmin, idParamValidation, deleteComplain)
router.delete("/Complains/:id", authMiddleware, requireAdmin, idParamValidation, deleteComplains)

// Sclass

router.post('/SclassCreate', authMiddleware, requireAdmin, sclassCreateValidation, sclassCreate);

router.get('/SclassList/:id', authMiddleware, idParamValidation, sclassList);
router.get("/Sclass/:id", idParamValidation, getSclassDetail)

router.get("/Sclass/Teachers/:id", authMiddleware, requireAdminOrTeacher, idParamValidation, getSclassTeachers)
router.get("/Sclass/Students/:id", authMiddleware, requireAdminOrTeacher, idParamValidation, getSclassStudents)

router.delete("/Sclasses/:id", authMiddleware, requireAdmin, idParamValidation, deleteSclasses)
router.delete("/Sclass/:id", authMiddleware, requireAdmin, idParamValidation, deleteSclass)

// Subject

router.post('/SubjectCreate', authMiddleware, requireAdmin, subjectCreateValidation, subjectCreate);

router.get('/AllSubjects/:id', authMiddleware, idParamValidation, allSubjects);
router.get('/ClassSubjects/:id', authMiddleware, idParamValidation, classSubjects);
router.get('/FreeSubjectList/:id', authMiddleware, requireAdmin, idParamValidation, freeSubjectList);
router.get("/Subject/:id", authMiddleware, idParamValidation, getSubjectDetail)

router.delete("/Subject/:id", authMiddleware, requireAdmin, idParamValidation, deleteSubject)
router.delete("/Subjects/:id", authMiddleware, requireAdmin, idParamValidation, deleteSubjects)
router.delete("/SubjectsClass/:id", authMiddleware, requireAdmin, idParamValidation, deleteSubjectsByClass)

export default router;