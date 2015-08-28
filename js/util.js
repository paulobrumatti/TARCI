(function() {
	var util = TARSI.util = {};

	util.find = function find(selector, scope) {
		if (!scope) scope = document;
		return document.querySelectorAll(selector);
	};

	util.toArray = function toArray(arrayLike) {
		return Array.prototype.splice.call(arrayLike);
	};

	util.ajaxTimeout = function ajaxTimeout(url, data, callback, timeout) {
		loadingScreen(true);
		var ajaxPromise = jQuery.getJSON(url, data, function() {
			loadingScreen(false);
			clearTimeout(ajaxLife);
			callback.apply(this, arguments);
		});

		var ajaxLife = setTimeout(function() {
			loadingScreen(false);
			ajaxPromise.abort();
			TARSI.message({
				message: 'O servidor não está respondendo no momento. Tente novamente.',
				type: 'warning'
			});
		}, timeout);
	};

	var loadingScreenElement = jQuery('.loading-screen');

	util.loadingScreen = function loadingScreen(start) {
		loadingScreenElement.toggleClass('show-loading-screen', start)
	};

	util.message = function message(msg, type) {

	};
}());