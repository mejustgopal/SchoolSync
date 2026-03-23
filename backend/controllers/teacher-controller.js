import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacherSchema.js';
import Subject from '../models/subjectSchema.js';

const teacherRegister = async (req, res, next) => {
    const { name, email, password, role, school, teachSubject, teachSclass } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const teacher = new Teacher({ name, email, password: hashedPass, role, school, teachSubject, teachSclass });

        const existingTeacherByEmail = await Teacher.findOne({ email });

        if (existingTeacherByEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        else {
            let result = await teacher.save();
            await Subject.findByIdAndUpdate(teachSubject, { teacher: teacher._id });
            result.password = undefined;
            const token = jwt.sign({ _id: result._id, role: 'Teacher' }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ ...result._doc, token });
        }
    } catch (err) {
        next(err);
    }
};

const teacherLogIn = async (req, res, next) => {
    try {
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (teacher) {
            const validated = await bcrypt.compare(req.body.password, teacher.password);
            if (validated) {
                teacher = await teacher.populate("teachSubject", "subName sessions")
                teacher = await teacher.populate("school", "schoolName")
                teacher = await teacher.populate("teachSclass", "sclassName")
                teacher.password = undefined;
                const token = jwt.sign({ _id: teacher._id, role: 'Teacher' }, process.env.SECRET_KEY, { expiresIn: '1d' });
                res.send({ ...teacher._doc, token });
            } else {
                return res.status(401).json({ message: "Invalid password" });
            }
        } else {
            return res.status(404).json({ message: "Teacher not found" });
        }
    } catch (err) {
        next(err);
    }
};

const getTeachers = async (req, res, next) => {
    try {
        let teachers = await Teacher.find({ school: req.params.id })
            .populate("teachSubject", "subName")
            .populate("teachSclass", "sclassName");
        if (teachers.length > 0) {
            let modifiedTeachers = teachers.map((teacher) => {
                return { ...teacher._doc, password: undefined };
            });
            res.send(modifiedTeachers);
        } else {
            res.send([]);
        }
    } catch (err) {
        next(err);
    }
};

const getTeacherDetail = async (req, res, next) => {
    try {
        let teacher = await Teacher.findById(req.params.id)
            .populate("teachSubject", "subName sessions")
            .populate("school", "schoolName")
            .populate("teachSclass", "sclassName")
        if (teacher) {
            teacher.password = undefined;
            res.send(teacher);
        }
        else {
            return res.status(404).json({ message: "No teacher found" });
        }
    } catch (err) {
        next(err);
    }
}

const updateTeacherSubject = async (req, res, next) => {
    const { teacherId, teachSubject } = req.body;
    try {
        // Validate that subject exists
        const subject = await Subject.findById(teachSubject);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { teachSubject },
            { new: true }
        );

        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        await Subject.findByIdAndUpdate(teachSubject, { teacher: updatedTeacher._id });

        res.send(updatedTeacher);
    } catch (error) {
        next(error);
    }
};

const deleteTeacher = async (req, res, next) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        await Subject.updateOne(
            { teacher: deletedTeacher._id, teacher: { $exists: true } },
            { $unset: { teacher: 1 } }
        );

        res.send(deletedTeacher);
    } catch (error) {
        next(error);
    }
};

const deleteTeachers = async (req, res, next) => {
    try {
        // Find teachers BEFORE deleting them
        const teachersToDelete = await Teacher.find({ school: req.params.id });

        if (teachersToDelete.length === 0) {
            return res.status(404).json({ message: "No teachers found to delete" });
        }

        // Delete the teachers
        const deletionResult = await Teacher.deleteMany({ school: req.params.id });

        // Update subjects to remove teacher references
        await Subject.updateMany(
            { teacher: { $in: teachersToDelete.map(teacher => teacher._id) } },
            { $unset: { teacher: 1 } }
        );

        res.send(deletionResult);
    } catch (error) {
        next(error);
    }
};

const deleteTeachersByClass = async (req, res, next) => {
    try {
        // Find teachers BEFORE deleting them
        const teachersToDelete = await Teacher.find({ teachSclass: req.params.id });

        if (teachersToDelete.length === 0) {
            return res.status(404).json({ message: "No teachers found to delete" });
        }

        // Delete the teachers
        const deletionResult = await Teacher.deleteMany({ teachSclass: req.params.id });

        // Update subjects to remove teacher references
        await Subject.updateMany(
            { teacher: { $in: teachersToDelete.map(teacher => teacher._id) } },
            { $unset: { teacher: 1 } }
        );

        res.send(deletionResult);
    } catch (error) {
        next(error);
    }
};

const teacherAttendance = async (req, res, next) => {
    const { status, date } = req.body;

    try {
        // Validation: Ensure required fields are present
        if (!status || !date) {
            return res.status(400).json({
                message: 'Status and date are required fields'
            });
        }

        // Validation: Ensure status is valid
        const validStatuses = ['Present', 'Absent'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Status must be either "Present" or "Absent"'
            });
        }

        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const existingAttendance = teacher.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString()
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            teacher.attendance.push({ date, status });
        }

        const result = await teacher.save();
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export {
    teacherRegister,
    teacherLogIn,
    getTeachers,
    getTeacherDetail,
    updateTeacherSubject,
    deleteTeacher,
    deleteTeachers,
    deleteTeachersByClass,
    teacherAttendance
};