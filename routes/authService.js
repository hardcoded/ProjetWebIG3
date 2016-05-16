module.exports = function(randomSecretKey, passwordHasher, jwt) {
  var module = {};

  // Requests tools

  module.authenticate = function(req, callback) {
    var token = req.cookies['Infotech'];
    if (token) {
      jwt.verify(token, randomSecretKey, function(err, decoded) {
        if (err) {
          callback.fail("WRONG_TOKEN_AUTH");
        } else {
          callback.success(decoded);
        }
      });
    } else {
      callback.fail("NO_TOKEN_AUTH");
    }
  };

  // Passwords & tokens tools

  module.hashPassword = function(plainPassword) {
    return passwordHasher.generate(plainPassword);
  };

  module.checkPassword = function(plainPassword, hashedPassword) {
    return passwordHasher.verify(plainPassword, hashedPassword);
  };

  module.createToken = function(object) {
    return jwt.sign(object, randomSecretKey);
  };

  return module;
};
