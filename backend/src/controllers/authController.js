const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      throw { status: 400, message: 'All fields required' };

    const user = await authService.register(name, email, password);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw { status: 400, message: 'All fields required' };

    const data = await authService.login(email, password);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };