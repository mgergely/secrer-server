'use strict';
var fs = require('fs'),
    path = require('path'),
    http = require('http'),
	moment = require('moment'),
	uuid = require('uuid');

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
	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 201;
	
	var currentTime = moment().format();

	var examples = {};
	examples = fs.readFileSync('secrets.json', 'utf8');
	examples = JSON.parse(examples);

	var newElement = {
	"secretText" : args.secret.value,
	"createdAt" : currentTime,
	"remainingViews" : args.expireAfterViews.value,
	"hash" : uuid.v4(),
	"expiresAt" : moment(args.expireAfter.value).format()
	};
	
	examples.secrets.push(newElement);
	var toWrite = JSON.stringify(examples);
	fs.writeFile('secrets.json', toWrite, 'utf8');

	res.end("Your secret has saved!");
	/*if (Object.keys(examples).length > 0) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
	} else {
		res.end();
	}*/
}

exports.getSecretByHash = function(args, res, next) {
  /**
   * Find a secret by hash
   * Returns a single secret
   *
   * hash String Unique hash to identify the secret
   * returns Secret
   **/
	var examples = fs.readFileSync('secrets.json', 'utf8');
	examples = JSON.parse(examples);

	var matchingObj = Object.keys(examples.secrets).filter(function(key) {
		var isMatch = false;
		if(examples.secrets[key].hash == args.hash.value){
			isMatch = true;
		}
		return isMatch;
	}).reduce(function(obj,key){
		obj[key] = examples.secrets[key];
		var currentTime = moment().format();
		if(obj[key].createdAt < currentTime &&
			obj[key].expiresAt > currentTime &&
			obj[key].remainingViews > 0){
				obj[key].remainingViews -= 1;
				var toWrite = JSON.stringify(examples);
				fs.writeFile('secrets.json', toWrite, 'utf8');
				return obj;
		}
		else {
			return {};
		}
	}, {});
    res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(matchingObj));
}

