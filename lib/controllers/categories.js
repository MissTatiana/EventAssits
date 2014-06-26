/**
 * categories.js - backend controller
 * functionality for categories
**/

'use strict';

var mongoose = require('mongoose'),
	Category = mongoose.model('Category');


/* Create Category
---------------------*/
exports.createCategory = function (req, res, next) {
	var newCategory = new Category(req.body);
	newCategory.provider = 'local';
	newCategory.save(function(err) {
		if (err) return res.json(400, err);
	});
};
