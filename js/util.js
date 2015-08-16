var util = TARSI.util = {};

util.find = function find(selector, scope) {
	if (!scope) scope = document;
	return document.querySelectorAll(selector);
};

util.ajaxTimeout = function ajaxTimeout(url, data, callback, timeout) {
	var ajaxPromise = TARSI.getJSON(url, data, function() {
		clearTimeout(ajaxLife);
		callback.apply(this, arguments);
	});

	var ajaxLife = setTimeout(function() {
		ajaxPromise.abort();
	}, timeout);
};

util.getJSON = function getJSON(url, data, callback) {
	return jQuery.getJSON(url, data, callback);
};

util.message