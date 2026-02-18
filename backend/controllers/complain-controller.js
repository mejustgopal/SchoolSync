import Complain from '../models/complainSchema.js';

const complainCreate = async (req, res) => {
    try {
        const complain = new Complain(req.body)
        const result = await complain.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const complainList = async (req, res) => {
    try {
        let complains = await Complain.find({ school: req.params.id }).populate("user", "name");
        if (complains.length > 0) {
            res.send(complains)
        } else {
            res.send([]);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};


const deleteComplain = async (req, res) => {
    try {
        const result = await Complain.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteComplains = async (req, res) => {
    try {
        const result = await Complain.deleteMany({ school: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No complains found to delete" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export { complainCreate, complainList, deleteComplain, deleteComplains };
