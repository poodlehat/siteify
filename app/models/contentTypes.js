
var mongoose = require('mongoose'),
      relations = require('relations');

var ContentSchema = new mongoose.Schema({
  type : {

  }
});

PagesSchema.statics.new = function (user, fields, callback) {
  fields.homepage = fields.isThereAHomepage ? false : true;
  fields.name = fields.title;
  fields.path = fields.title;

  var page = new PagesModel(fields);

  page.save(function (err, page) {
    if(err) return callback(err);
    relations.pages('%s is the owner of %s', user._id.toString(), page._id.toString());
    callback(err, page);
  });
};

mongoose.model('pages', PagesSchema);
var PagesModel = mongoose.model('pages');
module.exports = PagesModel;