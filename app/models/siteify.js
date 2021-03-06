
var mongoose = require('mongoose'),
      relations = require('relations');

var SiteifySchema = new mongoose.Schema({
  owner : {
    type : Boolean,
    default : false
  },
  setup : {
    type : Boolean,
    default : false
  },
  homepage : {
    type : Boolean,
    default : false
  },
  sitename : {
    type : String,
    default : ""
  },
  homepageid : {
    type : String,
    default : ""
  }
});

SiteifySchema.statics.hello = function (callback) {
  SiteifyModel.findOne({}, function (err, siteify) {
    if(err) callback(err);
    callback(err, siteify);
  });
};

SiteifySchema.statics.setHomePageId = function (options, callback) {
  SiteifyModel.findOneAndUpdate({}, {
    homepageid : options.homepageid,
    homepage : true
  }, null, callback);
};

SiteifySchema.statics.registerOwner = function (options, callback) {
  SiteifyModel.findOneAndUpdate({}, {
    owner : true
  }, null, function (err, siteify) {
    if(err) return callback(err);
    relations.siteify('%s is the owner of %s', options.userid, siteify._id.toString());
    callback(err, siteify);
  });
};

SiteifySchema.statics.setup = function (options, callback) {
  SiteifyModel.findOneAndUpdate({}, {
    setup : true,
    sitename : options.sitename
  }, null, callback);
};

mongoose.model('siteify', SiteifySchema);
var SiteifyModel = mongoose.model('siteify');
module.exports = SiteifyModel;

/* FIRST TIME ONLY */
SiteifyModel.findOne(function (err, siteify) {
  if(!siteify) SiteifyModel.create({});
});