const crypto = require("crypto");

exports.hashToken = (token) => {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
};