
define([],

function () {

  "use strict";

  var NewPage = Backbone.Model.extend({

    urls : { title : '/api/pages/unique', },

    validation : {
      title : [{
        required : true,
        msg : 'Your gonna need a page title'
      },{
        unique : true,
        msg : 'A page already exists with that name'
      }]
    }
  });

  return NewPage;

});