import Notice from '../models/noticeSchema.js';

const noticeCreate = async (req, res, next) => {
    try {
        const notice = new Notice({
            ...req.body,
            school: req.body.adminID
        })
        const result = await notice.save()
        res.send(result)
    } catch (err) {
        next(err);
    }
};

const noticeList = async (req, res, next) => {
    try {
        let notices = await Notice.find({ school: req.params.id })
        if (notices.length > 0) {
            res.send(notices)
        } else {
            res.send([]);
        }
    } catch (err) {
        next(err);
    }
};

const updateNotice = async (req, res, next) => {
    try {
        const result = await Notice.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        res.send(result)
    } catch (error) {
        next(error);
    }
}

const deleteNotice = async (req, res, next) => {
    try {
        const result = await Notice.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        next(error);
    }
}

const deleteNotices = async (req, res, next) => {
    try {
        const result = await Notice.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No notices found to delete" });
        } else {
            res.send(result)
        }
    } catch (error) {
        next(error);
    }
}

export { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices };