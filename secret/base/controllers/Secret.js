'use strict';

var url = require('url');

var Secret = require('./SecretService');

module.exports.addSecret = function addSecret (req, res, next) {
  Secret.addSecret(req.swagger.params, res, next);
};

module.exports.getSecretByHash = function getSecretByHash (req, res, next) {
  Secret.getSecretByHash(req.swagger.params, res, next);
};
