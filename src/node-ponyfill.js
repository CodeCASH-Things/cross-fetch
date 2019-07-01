var nodeFetch = require('node-fetch')
var realFetch = nodeFetch.default || nodeFetch
var wrappedFetch = require('socks5-node-fetch')


var fetch = function (url, options) {
  // Support schemaless URIs on the server for parity with the browser.
  // Ex: //github.com/ -> https://github.com/
  if (/^\/\//.test(url)) {
  	url = 'https:' + url
  }
  return realFetch.call(this, url, options)
}




if(process.env.SOCKS_PROXY!="" && process.env.SOCKS_PORT!=""){
	//We know we are using a Proxy System

	console.log("Fetch with Proxy Support Loaded....");
	var fetch = wrappedFetch({
		socksHost: process.env.SOCKS_PROXY,
		socksPort: process.env.SOCKS_PORT
	});

	fetch.call(this, url, options);

}

module.exports = exports = fetch
exports.fetch = fetch
exports.Headers = nodeFetch.Headers
exports.Request = nodeFetch.Request
exports.Response = nodeFetch.Response

// Needed for TypeScript consumers without esModuleInterop.
exports.default = fetch
