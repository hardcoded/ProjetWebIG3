function User(id, firstName, lastName, mail, pseudo, password, admin, tokens, rank, section) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.mail = mail;
  this.pseudo = pseudo;
  this.password = password;
  this.admin = admin,
  this.tokens = tokens;
  this.rank = rank;
  this.section = section;
};

module.exports = User;
