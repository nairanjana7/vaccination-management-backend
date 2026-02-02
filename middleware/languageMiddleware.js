const User = require("../models/User");
const messages = require("../utils/messages");

const languageMiddleware = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      const user = await User.findById(req.user.id);
      req.lang = user?.preferredLanguage || "en";
    } else {
      req.lang = "en";
    }

    req.t = (key) => messages[req.lang][key] || key;
    next();
  } catch (error) {
    req.lang = "en";
    req.t = (key) => messages.en[key] || key;
    next();
  }
};

module.exports = languageMiddleware;
