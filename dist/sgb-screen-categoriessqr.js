(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('sgb-screen-categoriessqr', ['megazord'])
    .controller('sgb-screen-categoriessqr-controller', ['$scope','$http','Base64', '_router', '_screen', '_screenParams', '$stateParams', function ($scope, $http, Base64, _router, _screen, _screenParams, $stateParams) {
        _screen.initialize($scope, _screenParams);
        $scope.categories=[];
        $scope.services=[];
        

		var getServices = function() {
			var userName='mobile';
			var passWord='ulan';

			var authdata = Base64.encode(userName + ':' + passWord);

			console.log(authdata);
			$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
			$http.get('http://orchestraware.isc-bunkerramo.com/rest/services', { username: userName, password: passWord })
			.success(function (response) {
			  $scope.categories = response;
		    });
	  	};


	  	$scope.addProp = function (val) {
	  		switch(val) {
				    case 10:
				        return "ion-briefcase";
				        break;
				    case 8:
				        return "ion-person";
				        break;
				    case 5:
				        return "ion-paper-airplane";
				        break;
				    case 13:
				        return "ion-calendar";
				        break;
				    case 6:
				        return "ion-key";
				        break;
				    case 7:
				        return "ion-arrow-graph-up-right";
				        break;
				    case 14:
				        return "ion-card";
				        break;
				    case 2:
				        return "ion-play";
				        break;
				    case 9:
				        return "ion-calculator";
				        break;
				    case 11:
				        return "ion-briefcase";
				        break;
				    case 12:
				        return "ion-compose";
				        break;
				    default:
				        return "ion-pound";
				}
	  	};

	  	getServices();

	  	$scope.itemClickHandler = function(service){
            //Nothing to do but fire the event
            _router.fireEvent({
                 name: 'itemClick',
                 params: {
                   service: service
                 }
            })
        };


    }])

	.factory('Base64', function () {
	    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	  
	    return {
	        encode: function (input) {
	            var output = "";
	            var chr1, chr2, chr3 = "";
	            var enc1, enc2, enc3, enc4 = "";
	            var i = 0;
	  
	            do {
	                chr1 = input.charCodeAt(i++);
	                chr2 = input.charCodeAt(i++);
	                chr3 = input.charCodeAt(i++);
	  
	                enc1 = chr1 >> 2;
	                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	                enc4 = chr3 & 63;
	  
	                if (isNaN(chr2)) {
	                    enc3 = enc4 = 64;
	                } else if (isNaN(chr3)) {
	                    enc4 = 64;
	                }
	  
	                output = output +
	                    keyStr.charAt(enc1) +
	                    keyStr.charAt(enc2) +
	                    keyStr.charAt(enc3) +
	                    keyStr.charAt(enc4);
	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";
	            } while (i < input.length);
	  
	            return output;
	        },
	  
	        decode: function (input) {
	            var output = "";
	            var chr1, chr2, chr3 = "";
	            var enc1, enc2, enc3, enc4 = "";
	            var i = 0;
	  
	            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	            var base64test = /[^A-Za-z0-9\+\/\=]/g;
	            if (base64test.exec(input)) {
	                window.alert("There were invalid base64 characters in the input text.\n" +
	                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
	                    "Expect errors in decoding.");
	            }
	            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	  
	            do {
	                enc1 = keyStr.indexOf(input.charAt(i++));
	                enc2 = keyStr.indexOf(input.charAt(i++));
	                enc3 = keyStr.indexOf(input.charAt(i++));
	                enc4 = keyStr.indexOf(input.charAt(i++));
	  
	                chr1 = (enc1 << 2) | (enc2 >> 4);
	                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	                chr3 = ((enc3 & 3) << 6) | enc4;
	  
	                output = output + String.fromCharCode(chr1);
	  
	                if (enc3 != 64) {
	                    output = output + String.fromCharCode(chr2);
	                }
	                if (enc4 != 64) {
	                    output = output + String.fromCharCode(chr3);
	                }
	  
	                chr1 = chr2 = chr3 = "";
	                enc1 = enc2 = enc3 = enc4 = "";
	  
	            } while (i < input.length);
	  
	            return output;
	        }
	    }
	});





/*

var reformatCategories = function () {
        	for (var i=0;i<$scope.services.length;i++){
        		var category = {
					estimatedWait:$scope.services[i].estimatedWait,
					externalDescription:$scope.services[i].externalDescription,
					id:$scope.services[i].id,
					internalDescription:$scope.services[i].internalDescription,
					message:$scope.services[i].message,
					name:$scope.services[i].name,
					queueId:$scope.services[i].queueId,
					queueLogicNumber:$scope.services[i].queueLogicNumber,
					waitingTime:$scope.services[i].waitinTime,
					icon:""
        		}

        		switch($scope.services[i].id) {
				    case 10:
				        category.icon="ion-briefcase";
				        break;
				    case 8:
				        category.icon="ion-person";
				        break;
				    case 5:
				        category.icon="ion-paper-airplane";
				        break;
				    case 13:
				        category.icon="ion-calendar";
				        break;
				    case 6:
				        category.icon="ion-key";
				        break;
				    case 7:
				        category.icon="ion-arrow-graph-up-right";
				        break;
				    case 14:
				        category.icon="ion-card";
				        break;
				    case 2:
				        category.icon="ion-play";
				        break;
				    case 9:
				        category.icon="ion-calculator";
				        break;
				    case 11:
				        category.icon="ion-briefcase";
				        break;
				    case 12:
				        category.icon="ion-compose";
				        break;
				    default:
				        category.icon="ion-pound";
				}
				console.log(category);
				$scope.categories.push(category);
        	}
        }

        reformatCategories();
*/

},{}]},{},[1]);
