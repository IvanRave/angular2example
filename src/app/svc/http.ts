import {Injectable}     from 'angular2/core';

var objToForm = function(obj: any) {		
	var str: any[] = [];
	for(var p in obj){
		// skip null fields
		if (obj[p] !== null) {
			// skip all related, nested objects
			if (typeof obj[p] !== 'object'){
				str.push(encodeURIComponent(p) +
						 "=" + encodeURIComponent(obj[p]));
			}
		}
	}
	return str.join("&");
};

@Injectable()
export class HttpSvc {
	
	get(theUrl: string, urlParams: any){

		if (urlParams){
			var strParams = objToForm(urlParams);
			if (strParams){
				theUrl += "?" + strParams;
			}
		}
		
		// https://github.com/mdn/promises-test/blob/gh-pages/index.html
		return new Promise(function(resolve, reject) {
			var xmlHttp = new XMLHttpRequest();

			// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
			// The readystatechange event will not be fired when an XMLHttpRequest request is canceled with the abort() method.
			// Once the HTTP response content has finished loading, the readyState property of the XMLHttpRequest object should be assigned a value of 4.
			xmlHttp.onreadystatechange = function() {
				if (xmlHttp.readyState === XMLHttpRequest.DONE){
					if (xmlHttp.status === 200){
						// always JSON
						try{
							var obj = JSON.parse(xmlHttp.responseText);
							resolve(obj.data);
						}
						catch(exc){
							console.log('exc', exc);
							reject({
								status: 500,
								msg: 'ParseError',
								exc: exc
							});
						}
					} else {
						reject({
							status: xmlHttp.status,
							msg: xmlHttp.responseText
						});
					}
				}
			};

			// Also deal with the case when the entire request fails to begin with
			// This is probably a network error, so reject the promise with an appropriate message
			xmlHttp.onerror = function(){
				console.log('onerror xmlHttp');
				reject({
					status: 500,
					msg: 'NetworkError'
				});
			};
			
			xmlHttp.open("GET", theUrl, true); // true for asynchronous

			// not required, if no  body
			//xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			
			xmlHttp.send(null);
		});
		
	}	
}
