(function() {
	var util = TARCI.util = {};

	util.find = function find(selector, scope) {
		if (!scope) scope = document;
		return document.querySelectorAll(selector);
	};

	util.toArray = function toArray(arrayLike) {
		return Array.prototype.splice.call(arrayLike);
	};

	util.ajaxTimeout = function ajaxTimeout(url, data, callback, timeout) {
		util.loadingScreen(true);
		var ajaxPromise = jQuery.getJSON(url, data, function() {
			util.loadingScreen(false);
			clearTimeout(ajaxLife);
			callback.apply(this, arguments);
		});

		var ajaxLife = setTimeout(function() {
			util.loadingScreen(false);
			ajaxPromise.abort();
			TARCI.util.message({
				message: 'O servidor não está respondendo no momento. Tente novamente mais tarde.',
				type: 'warning'
			});
		}, timeout);
	};

	var loadingScreenElement = jQuery('#loading-screen');

	util.loadingScreen = function loadingScreen(show) {
		loadingScreenElement.toggleClass('loading-show', show)
	};

	util.message = function message(obj) {
		alert(obj.type + '\n\n' + obj.message);
	};
}());