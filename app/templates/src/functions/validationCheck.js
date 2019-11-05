/**
 * Check if the value is an empty string
 * @param {string} value - the string value used to validate the contents
 * @return {boolean} returns whether the value is an empty string
 */
exports.isEmpty = (value) => {
	return (typeof value === 'string' && (!value.trim() || value.trim().toLowerCase() === 'undefined')) || (typeof value === 'undefined') || (value === null);
};

/**
 * Check if the value is a valid banker initial
 * @param {string} value - the string value used to validate the contents
 * @return {boolean} returns whether the value is a valid number
 */
/*exports.isValidInitial = (value) => {
	var regExForInitial=/^[a-zA-Z0-9]+$/;
	return !(value === null || value === undefined || (typeof value === 'string' && value.trim() === '') || ((value.trim().length < 1 && value.trim().length > 5) || !value.match(regExForInitial)));
};*/

/**
 * Check if the value is a valid banker initial
 * @param {string} value - the string value used to validate the contents
 * @return {boolean} returns whether the value is a valid number
 */
exports.isValidInitial = (value) => {
	//console.log('initials param value',value);
	var regExForInitial=/^[a-zA-Z0-9]+$/;
	if(value === null || value === undefined || value.trim() === ''){
		console.log('initial is null or empty!');
		return false;
	}
	if(value.trim().length < 1 || value.trim().length > 50){
		console.log('initial param length exceeds 50');
		return false;
	}
	var initialsArr = value.split(',');
	if(initialsArr.length > 10){
		console.log('total number of initials exceeds 10');
		return false;
	}
	var validInitials = true;
	for(let initial of initialsArr){
		//console.log('initial',initial);
		if(initial === null || initial === undefined || initial.trim() === '' || initial.trim().length < 1 || initial.trim().length > 5 || !initial.match(regExForInitial)){
			//console.log('initial',initial,'is invalid');
			validInitials = false;
			break;
		}
	}
	//console.log('valid initials!',validInitials);
	return validInitials;
};

/**
 * Check if the value is a valid active status
 * @param {Integer} value - the string value used to validate the contents
 * @return {boolean} returns whether the value is a valid number
 */
exports.isValidStatus = (value) => {
	return !(value === null || value === undefined || (typeof value === 'string' && value.trim() === '') || isNaN(Number(value)) || (Number(value) != 0 && Number(value) != 1));
};


/**
 * Check if the value is a valid email address
 * @param {String} value - the string value used to validate the contents
 * @return {boolean} returns whether the value is a valid number
 */
exports.isValidEmail = (email) => {
	//console.log("validating email... ",email);
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(email.indexOf('<') > 0 & email.indexOf('>') > 0) {
		let emailAddress = email.substring(email.indexOf('<'), email.indexOf('>')+1);
		console.log(emailAddress);
		return re.test(emailAddress);
	} else {
		return re.test(email);
	}
};
