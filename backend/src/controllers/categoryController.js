const categoryService = require('../services/categoryService');

const getAll = async (req, res, next) => {
    try {
        const data = await categoryService.getAll(req.user.id);
        res.json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { name, type } = req.body;
        if (!name || !type) throw { status: 400, message: 'name and type required' };
        const data = await categoryService.create(name, type, req.user.id);
        res.status(201).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

module.exports = { getAll, create };