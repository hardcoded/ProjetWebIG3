function Project(id, name, description, maxHelpers, startDate, endDate, achievment, rankRequired, owner) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.maxHelpers = maxHelpers;
  this.start = startDate;
  this.end = endDate;
  this.achievment = achievment;
  this.rank = rankRequired;
  this.owner = owner;
};

module.exports = Project;
