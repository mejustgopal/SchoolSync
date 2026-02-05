const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Complain = require('../models/complainSchema.js');

const sclassCreate = async (req, res) => {
    try {
        const sclass = new Sclass({
            sclassName: req.body.sclassName,
            school: req.body.adminID
        });

        const existingSclassByName = await Sclass.findOne({
            sclassName: req.body.sclassName,
            school: req.body.adminID
        });

        if (existingSclassByName) {
            return res.status(409).json({ message: 'Sorry this class name already exists' });
        }
        else {
            const result = await sclass.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const sclassList = async (req, res) => {
    try {
        let sclasses = await Sclass.find({ school: req.params.id })
        if (sclasses.length > 0) {
            res.send(sclasses)
        } else {
            res.send([]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSclassDetail = async (req, res) => {
    try {
        let sclass = await Sclass.findById(req.params.id);
        if (sclass) {
            sclass = await sclass.populate("school", "schoolName")
            res.send(sclass);
        }
        else {
            return res.status(404).json({ message: "No class found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const getSclassStudents = async (req, res) => {
    try {
        let students = await Student.find({ sclassName: req.params.id })
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send([]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteSclass = async (req, res) => {
    try {
        const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Find students before deleting to clean up their complaints
        const studentsToDelete = await Student.find({ sclassName: req.params.id });
        const studentIds = studentsToDelete.map(s => s._id);

        // Delete all complaints from these students
        await Complain.deleteMany({ user: { $in: studentIds } });

        // Delete students
        await Student.deleteMany({ sclassName: req.params.id });

        // Find subjects before deleting to clean up teacher references
        const subjectsToDelete = await Subject.find({ sclassName: req.params.id });
        const subjectIds = subjectsToDelete.map(s => s._id);

        // Delete subjects
        await Subject.deleteMany({ sclassName: req.params.id });

        // Update teachers - remove subject references and delete teachers assigned to this class
        await Teacher.updateMany(
            { teachSubject: { $in: subjectIds } },
            { $unset: { teachSubject: "" } }
        );
        await Teacher.deleteMany({ teachSclass: req.params.id });

        res.send(deletedClass);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteSclasses = async (req, res) => {
    try {
        const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
        if (deletedClasses.deletedCount === 0) {
            return res.status(404).json({ message: "No classes found to delete" });
        }

        // Find students before deleting to clean up their complaints
        const studentsToDelete = await Student.find({ school: req.params.id });
        const studentIds = studentsToDelete.map(s => s._id);

        // Delete all complaints from these students
        await Complain.deleteMany({ user: { $in: studentIds } });

        // Delete students
        await Student.deleteMany({ school: req.params.id });

        // Find subjects before deleting to clean up teacher references
        const subjectsToDelete = await Subject.find({ school: req.params.id });
        const subjectIds = subjectsToDelete.map(s => s._id);

        // Delete subjects
        await Subject.deleteMany({ school: req.params.id });

        // Update teachers - remove subject references and delete teachers
        await Teacher.updateMany(
            { teachSubject: { $in: subjectIds } },
            { $unset: { teachSubject: "" } }
        );
        await Teacher.deleteMany({ school: req.params.id });

        res.send(deletedClasses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents };