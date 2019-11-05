'use strict';



exports.myFirsttDetailsService = function(test, res) {
	res.setHeader("Content-Type", "application/json");

   console.log("I am here ------->")
	return new Promise(function(resolve, reject) {

		const successVal = {
			myFirstMessage: "My First Message",
			status: 200,
			message: "Test Message",
			fields: {
				name: "Authorization",
				issue: "My Test Message"
			}
		};
		resolve(successVal);
		return successVal;

	}).catch((err) => {
		const liveStatus = {
			"Live": false,
			"Error": err
		};
		reject(liveStatus);
		return liveStatus;
	});
};
