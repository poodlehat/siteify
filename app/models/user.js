
var mongoose = require('mongoose'),
      bcrypt = require('bcrypt-nodejs');

var OAuthUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  owner : {
    type : Boolean,
    default : false
  },
  displayname : {
    type : String,
    default : 'Display name'
  },
  firstname: {
    type : String,
    default : 'First name'
  },
  lastname: {
    type : String,
    default : 'Last name'
  },
  company: {
    type : String,
    default : 'Company name'
  },
  hashed_password: {
    type: String,
    required: true
  },
  password_reset_token: {
    type: String
    // unique: true TODO Find out why this is duplicate if set
  },
  reset_token_expires: Date
});

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

OAuthUsersSchema.statics.register = function (fields, callback) {
  fields.hashed_password = hashPassword(fields.password);
  delete fields.password;
  var user = new OAuthUsersModel(fields);
  user.save(callback);
};

OAuthUsersSchema.statics.getUser = function (email, password, callback) {
   OAuthUsersModel.findOne({ email : email }, function (err, user) {
    if (err || !user) return callback(err, user);
    callback(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
  });
};

mongoose.model('users', OAuthUsersSchema);
var OAuthUsersModel = mongoose.model('users');
module.exports = OAuthUsersModel;