import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/studentSchema.js';
import Subject from '../models/subjectSchema.js';
import Complain from '../models/complainSchema.js';

const studentRegister = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        });

        if (existingStudent) {
            return res.status(409).json({ message: 'Roll Number already exists' });
        }
        else {
            const student = new Student({
                ...req.body,
                school: req.body.adminID,
                password: hashedPass
            });

            let result = await student.save();

            result.password = undefined;
            const token = jwt.sign({ _id: result._id, role: 'Student' }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ ...result._doc, token });
        }
    } catch (err) {
        next(err);
    }
};

const studentLogIn = async (req, res, next) => {
    try {
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
        if (student) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("school", "schoolName")
                student = await student.populate("sclassName", "sclassName")
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                const token = jwt.sign({ _id: student._id, role: 'Student' }, process.env.SECRET_KEY, { expiresIn: '1d' });
                res.send({ ...student._doc, token });
            } else {
                return res.status(401).json({ message: "Invalid password" });
            }
        } else {
            return res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        next(err);
    }
};

const getStudents = async (req, res, next) => {
    try {
        let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send([]);
        }
    } catch (err) {
        next(err);
    }
};

const getStudentDetail = async (req, res, next) => {
    try {
        // Authorization: Students can only view their own profile, teachers/admins can view any
        if (req.user.role === 'Student' && req.user._id !== req.params.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only view your own profile' });
        }

        let student = await Student.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName examDate")
            .populate("attendance.subName", "subName sessions");
        if (student) {
            student.password = undefined;
            res.send(student);
        }
        else {
            return res.status(404).json({ message: "No student found" });
        }
    } catch (err) {
        next(err);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        // Delete student's complaints first to prevent orphaned records
        await Complain.deleteMany({ user: req.params.id });

        // Then delete the student
        const result = await Student.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const deleteStudents = async (req, res, next) => {
    try {
        // Find all students to be deleted
        const studentsToDelete = await Student.find({ school: req.params.id });

        if (studentsToDelete.length === 0) {
            return res.status(404).json({ message: "No students found to delete" });
        }

        // Delete all complaints for these students
        await Complain.deleteMany({
            user: { $in: studentsToDelete.map(student => student._id) }
        });

        // Then delete the students
        const result = await Student.deleteMany({ school: req.params.id });
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const deleteStudentsByClass = async (req, res, next) => {
    try {
        // Find all students to be deleted
        const studentsToDelete = await Student.find({ sclassName: req.params.id });

        if (studentsToDelete.length === 0) {
            return res.status(404).json({ message: "No students found to delete" });
        }

        // Delete all complaints for these students
        await Complain.deleteMany({
            user: { $in: studentsToDelete.map(student => student._id) }
        });

        // Then delete the students
        const result = await Student.deleteMany({ sclassName: req.params.id });
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        // Authorization: Students can only update their own profile, admins can update any
        if (req.user.role === 'Student' && req.user._id !== req.params.id) {
            return res.status(403).json({ message: 'Unauthorized: You can only update your own profile' });
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName"); // Populate to ensure frontend updates correctly

        result.password = undefined;
        res.send(result)
    } catch (error) {
        next(error);
    }
}

const updateExamResult = async (req, res, next) => {
    const { subName, marksObtained } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const studentAttendance = async (req, res, next) => {
    const { subName, status, date } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const subject = await Subject.findById(subName);

        const existingAttendance = student.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString() &&
                a.subName.toString() === subName
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            // Check if the student has already attended the maximum number of sessions
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;

            if (attendedSessions >= parseInt(subject.sessions)) {
                subject.sessions = parseInt(subject.sessions) + 1;
                await subject.save();
            }

            student.attendance.push({ date, status, subName });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const clearAllStudentsAttendanceBySubject = async (req, res, next) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const clearAllStudentsAttendance = async (req, res, next) => {
    const schoolId = req.params.id

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const removeStudentAttendanceBySubject = async (req, res, next) => {
    const studentId = req.params.id;
    const subName = req.body.subId

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send(result);
    } catch (error) {
        next(error);
    }
};


const removeStudentAttendance = async (req, res, next) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        next(error);
    }
};


/**
 * GET /AttendanceReport/:id
 * Returns all students in a school with their subject-wise attendance summary.
 */
const getAttendanceReport = async (req, res, next) => {
    try {
        const students = await Student.find({ school: req.params.id })
            .populate('sclassName', 'sclassName')
            .populate('attendance.subName', 'subName sessions');

        if (!students || students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }

        const report = students.map((student) => {
            // Group attendance by subject
            const subjectMap = {};
            (student.attendance || []).forEach((record) => {
                if (!record.subName) return;
                const subId = record.subName._id?.toString();
                const subName = record.subName.subName || 'Unknown';
                const sessions = parseInt(record.subName.sessions) || 0;

                if (!subjectMap[subId]) {
                    subjectMap[subId] = { subName, sessions, present: 0, absent: 0 };
                }
                if (record.status === 'Present') subjectMap[subId].present++;
                else subjectMap[subId].absent++;
            });

            const subjects = Object.values(subjectMap).map((s) => ({
                subName: s.subName,
                sessions: s.sessions,
                present: s.present,
                absent: s.absent,
                percentage: s.sessions > 0 ? ((s.present / s.sessions) * 100).toFixed(2) : '0.00',
            }));

            // Overall
            const totalSessions = subjects.reduce((acc, s) => acc + s.sessions, 0);
            const totalPresent = subjects.reduce((acc, s) => acc + s.present, 0);
            const overallPercentage = totalSessions > 0
                ? ((totalPresent / totalSessions) * 100).toFixed(2)
                : '0.00';

            return {
                _id: student._id,
                name: student.name,
                rollNum: student.rollNum,
                className: student.sclassName?.sclassName || 'N/A',
                subjects,
                totalSessions,
                totalPresent,
                overallPercentage,
            };
        });

        res.json(report);
    } catch (err) {
        next(err);
    }
};

export {
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
    removeStudentAttendance,
    getAttendanceReport,
};