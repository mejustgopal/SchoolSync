import Subject from '../models/subjectSchema.js';
import Teacher from '../models/teacherSchema.js';
import Student from '../models/studentSchema.js';

const subjectCreate = async (req, res, next) => {
    try {
        const subjects = req.body.subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
            examDate: subject.examDate,
        }));

        // Check each subject code for uniqueness
        for (const subject of subjects) {
            const existingSubjectBySubCode = await Subject.findOne({
                subCode: subject.subCode,
                school: req.body.adminID,
            });

            if (existingSubjectBySubCode) {
                return res.status(409).json({ message: `Subject code ${subject.subCode} already exists` });
            }
        }

        const newSubjects = subjects.map((subject) => ({
            ...subject,
            sclassName: req.body.sclassName,
            school: req.body.adminID,
        }));

        const result = await Subject.insertMany(newSubjects);
        res.send(result);
    } catch (err) {
        next(err);
    }
};

const allSubjects = async (req, res, next) => {
    try {
        let subjects = await Subject.find({ school: req.params.id })
            .populate("sclassName", "sclassName")
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send([]);
        }
    } catch (err) {
        next(err);
    }
};

const classSubjects = async (req, res, next) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id })
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send([]);
        }
    } catch (err) {
        next(err);
    }
};

const freeSubjectList = async (req, res, next) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id, teacher: { $exists: false } });
        if (subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send([]);
        }
    } catch (err) {
        next(err);
    }
};

const getSubjectDetail = async (req, res, next) => {
    try {
        let subject = await Subject.findById(req.params.id);
        if (subject) {
            subject = await subject.populate("sclassName", "sclassName")
            subject = await subject.populate("teacher", "name")
            res.send(subject);
        }
        else {
            return res.status(404).json({ message: "No subject found" });
        }
    } catch (err) {
        next(err);
    }
}

const deleteSubject = async (req, res, next) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

        // Check if subject exists
        if (!deletedSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // Set the teachSubject field to null in teachers
        await Teacher.updateOne(
            { teachSubject: deletedSubject._id },
            { $unset: { teachSubject: "" } }
        );

        // Remove the objects containing the deleted subject from students' examResult array
        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedSubject._id } } }
        );

        // Remove the objects containing the deleted subject from students' attendance array
        await Student.updateMany(
            {},
            { $pull: { attendance: { subName: deletedSubject._id } } }
        );

        res.send(deletedSubject);
    } catch (error) {
        next(error);
    }
};

const deleteSubjects = async (req, res, next) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        next(error);
    }
};

const deleteSubjectsByClass = async (req, res, next) => {
    try {
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });

        // Set the teachSubject field to null in teachers
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" } }
        );

        // Set examResult and attendance to null in all students
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );

        res.send(deletedSubjects);
    } catch (error) {
        next(error);
    }
};


export { subjectCreate, freeSubjectList, classSubjects, getSubjectDetail, deleteSubjectsByClass, deleteSubjects, deleteSubject, allSubjects };