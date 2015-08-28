(function() {
	var actions = TARSI.actions = {};

	actions.doLogin = function doLogin() {
		function callback(response) {
			if (response.type === 'success')
				return TARSI.setState('dashboard');

			return TARSI.message({
				message: response.message,
				type: response.type
			});
		}

		TARSI.util.ajaxTimeout(TARSI.config.login, TARSI.getLoginCredentials(), callback);
	};
}());