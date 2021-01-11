import Vue from 'vue';
var numeral = require("numeral");
// http://numeraljs.com/


// switch between locales
numeral.locale('en');

Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0.00"); // displaying other groupings/separators is possible, look at the docs
});

Vue.filter("formatDollar", function(value) {
  return numeral(value).format(	'$ 0,0.00'); 
});

Vue.filter("percent", function(value) {
  return numeral(value).format(	'%0.00'); 
});

Vue.filter('toLowerCase', function(value) {
  return value.toLowerCase();
});

Vue.filter('toFloat', function(value) {
  return parseFloat(value);
});

Vue.filter('phone', function (phone) {
	return phone.replace(/[^0-9]/g, '')
							.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

Vue.filter('capitalize', function (value) {
	// console.log('value', value.toString())
	let val = value.toString()
	return val.charAt(0).toUpperCase() + val.slice(1)
});
//Make a filter to format the Permissions and module code name