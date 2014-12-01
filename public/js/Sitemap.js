
define([
  'PageModel',
  'SiteifyModel',
  'Oauth2Model'
],

function (PageModel, SiteifyModel, Oauth2Model) {

  "use strict";

  var Sitemap = Backbone.Collection.extend({

    url : '/api/pages/all',
    urls : {
      new : '/api/pages/new',
      delete : '/api/pages/delete'
    },

    model : PageModel,

    initialize : function () {
      this.listenTo(this, 'add', function (page) {
        console.log('%c Page ' + page.get('title') + ' added ', 'background: #222222; color: #00FF00;');
      }, this);
      this.listenTo(this, 'remove', function (page) {
        console.log('%c Page ' + page.get('title') + ' removed ', 'background: #222222; color: #FF0000;');
      }, this);
    },

    parse : function (models) {
      return models;
    },

    getHomepage : function () {
      return this.get(SiteifyModel.get('homepageid'));
    },

    getSitemap : function (done) {
      var self = this;
      this.fetch({
        success : function (data, status) {
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    newPage : function (page, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.new,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        data : page,
        success : function (data, status) {
          if(data.homepage) {
            SiteifyModel.set('homepageid', data._id);
          }
          this.set(data, {
            parse:true,
            remove:false,
            merge:true
          });
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    delete : function (page, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.delete,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        data : {pageid : page.id},
        success : function (data, status) {
          this.remove(data._id);
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    }

  });

  return Sitemap;

});