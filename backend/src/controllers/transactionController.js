const transactionService = require('../services/transactionService');

const create = async (req, res, next) => {
  try {
    const data = await transactionService.create(req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

const getAll = async (req, res, next) => {
  try {
    const data = await transactionService.getAll(req.user.id, req.query);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const data = await transactionService.update(req.params.id, req.user.id, req.body);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const data = await transactionService.remove(req.params.id, req.user.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getMonthlySummary = async (req, res, next) => {
  try {
    const data = await transactionService.getMonthlySummary(req.user.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

const getDashboardSummary = async (req, res, next) => {
  try {
    const data = await transactionService.getDashboardSummary(req.user.id);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

module.exports = { create, getAll, update, remove, getMonthlySummary, getDashboardSummary };