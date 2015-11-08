'use strict';

var express = require('express');
var repository = require('../lib/repository');
var router = express.Router();

/* GET fech all repos for the logged user */
router.get('/home', function(req, res) {
  repository.getUserRepos(req.user.accessToken)
  .then(function(resolved) {
    var context = {};
    context.repos = resolved;
    res.render('home', context);
  }, function(rejected) {
    context.error = rejected;
    res.render('home', context);
  });
});

/* GET checks the information for a repo */
router.get('/check/:repo', function(req, res) {
  var context = {};
  var username = req.user.profile.username;
  var reponame = req.params.repo;
  context.user = username;
  context.repo = reponame;
  repository.getRepo(username, reponame).then(function(repo) {
    repository.checkRepo(repo).then(function(result) {
      console.log(result);
      res.redirect('/match/' + reponame);
    }, function(errors) {
      context.errors = errors;
      console.log(errors);
      res.render('invalid', context);
    });
  });
});

/* GET repo is valid so match process starts */
router.get('/match/:repo', function(req, res) {
  // TODO
  // var username = req.user.profile.username;
  // var reponame = req.params.repo;
  // var context = {
  //   user: req.user
  // };
  // res.render('match', context);
});

module.exports = router;
