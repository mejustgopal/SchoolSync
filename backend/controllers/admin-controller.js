import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminSchema.js';
import Sclass from '../models/sclassSchema.js';
import Student from '../models/studentSchema.js';
import Teacher from '../models/teacherSchema.js';
import Subject from '../models/subjectSchema.js';
import Notice from '../models/noticeSchema.js';
import Complain from '../models/complainSchema.js';

const adminRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const admin = new Admin({
            ...req.body,
            password: hashedPass
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        else if (existingSchool) {
            return res.status(409).json({ message: 'School name already exists' });
        }
        else {
            let result = await admin.save();
            result.password = undefined;
            const token = jwt.sign({ _id: result._id, role: 'Admin' }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ ...result._doc, token });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const adminLogIn = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let admin = await Admin.findOne({ email: req.body.email });
            if (admin) {
                const validated = await bcrypt.compare(req.body.password, admin.password);
                if (validated) {
                    admin.password = undefined;
                    const token = jwt.sign({ _id: admin._id, role: 'Admin' }, process.env.SECRET_KEY, { expiresIn: '1d' });
                    res.send({ ...admin._doc, token });
                } else {
                    return res.status(401).json({ message: "Invalid password" });
                }
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } else {
            return res.status(400).json({ message: "Email and password are required" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

const getAdminDetail = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            return res.status(404).json({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateAdmin = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        let result = await Admin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        result.password = undefined;
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { adminRegister, adminLogIn, getAdminDetail, updateAdmin };
