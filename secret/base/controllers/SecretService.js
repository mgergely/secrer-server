'use strict';

exports.addSecret = function(args, res, next) {
  /**
   * Add a new secret
   * 
   *
   * secret String This text will be saved as a secret
   * expireAfterViews Integer The secret won't be available after the given number of views. It must be greater than 0.
   * expireAfter Integer The secret won't be available after the given time. The value is provided in minutes. 0 means never expires
   * returns Secret
   **/
  var examples = {};
  examples['application/json'] = {
  "secretText" : "aeiou",
  "createdAt" : "2000-01-23T04:56:07.000+00:00",
  "remainingViews" : 0,
  "hash" : "aeiou",
  "expiresAt" : "2000-01-23T04:56:07.000+00:00"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getSecretByHash = function(args, res, next) {
  /**
   * Find a secret by hash
   * Returns a single secret
   *
   * hash String Unique hash to identify the secret
   * returns Secret
   **/
  var examples = {};
  examples['application/json'] = {
  "secretText" : "aeiou",
  "createdAt" : "2000-01-23T04:56:07.000+00:00",
  "remainingViews" : 0,
  "hash" : "aeiou",
  "expiresAt" : "2000-01-23T04:56:07.000+00:00"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

