//Autenticando no active 
var ActiveCampaign = require("activecampaign");
var ac = new ActiveCampaign("https://marketingidebrasil.api-us1.com",'7cae44010b267b383b6e957729ffe19a1d898db5740d3bf3e2afc7467738550f6e289992');

	ac.credentials_test().then(function(result) {
		// successful request
		if (result.success) {
			console.log('VALID ACCOUNT')
		} else {
            console.log('INVALID ACCOUNT')
		}
	}, function(result) {
		console.log(result)
	});

module.exports = ac