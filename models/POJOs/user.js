function User(id, firstName, lastName, mail, pseudo, signupDate, admin, tokens, rank, section) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.mail = mail;
  this.pseudo = pseudo;
  this.signupDate = signupDate;
  this.admin = admin,
  this.tokens = tokens;
  this.rank = rank;
  this.section = section;
};

module.exports = User;
