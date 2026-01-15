/*
 _       __      _ __    
| |     / /___ _(_) /____
| | /| / / __ `/ / / ___/
| |/ |/ / /_/ / / (__  ) 
|__/|__/\__,_/_/_/____/  
The electron alternative for Go
(c) Lea Anthony 2019-present
*/
/* jshint esversion: 6 */

import {Call} from './calls';

export function SetInjects(injectsObject) {
	try {
		injectsObject = JSON.parse(injectsObject);
	} catch (e) {
		console.error(e);
	}
	/* {
	    "injectName1": {
	      "method1": {
	         "call": ""
	      },
	  	  "method2": {
	         "call": ""
	      },
	    },
	    "injectName2": {
	      "method1": {
	         "call": ""
	      }
	    },
	 }
	 */
	// Iterate package names
	Object.keys(injectsObject).forEach((injectName) => {

		// Create inner map if it doesn't exist
		window[injectName] = window[injectName] || {};

		// Iterate struct names
		Object.keys(injectsObject[injectName]).forEach((methodName) => {

			window[injectName][methodName] = function () {

				const method = injectsObject[injectName][methodName]

				// No timeout by default
				let timeout = 0;

				// Actual function
				function dynamic() {
					const args = [].slice.call(arguments);
					return Call(method.call, args, timeout);
				}

				// Allow setting timeout to function
				dynamic.setTimeout = function (newTimeout) {
					timeout = newTimeout;
				};

				// Allow getting timeout to function
				dynamic.getTimeout = function () {
					return timeout;
				};

				return dynamic;
			}();
		});
	});
}
