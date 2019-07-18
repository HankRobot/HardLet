'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2018 NEM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @callback WebSocketCallback
 * @param {object} WebSocketMessage
 */

/**
 * @module listeners/Listener
 */
var Listener = function () {
	/**
  * @constructor
  * @param domain
  * @param port
  * @param WebSocketDependency
  */
	function Listener(domain, port, WebSocketDependency) {
		_classCallCheck(this, Listener);

		if (WebSocketDependency) this.connection = new WebSocketDependency('ws://' + domain + ':' + port + '/ws');else this.connection = new _ws2.default('ws://' + domain + ':' + port + '/ws');
	}

	/**
  * open the WebSocket connection
  */


	_createClass(Listener, [{
		key: 'openConnection',
		value: function openConnection() {
			this.connection.onopen = function () {
				console.log('connection open');
			};

			this.connection.onerror = function (err) {
				console.log('WebSocket Error ');
				console.log(err);
			};
		}

		/**
   *
   * @param {string} channel channel to subscribe
   * @param {WebSocketCallback} callback called when a new unconfirmed transaction is announced into the network
   */

	}, {
		key: 'subscribeToChannel',
		value: function subscribeToChannel(channel, callback) {
			var _this = this;

			this.openConnection();
			var duplicateObj = void 0;
			this.connection.onmessage = function (e) {
				var obj = JSON.parse(e.data);
				if ('uid' in obj) {
					_this.connection.send('{"uid": "' + obj.uid + '", "subscribe":"' + channel + '"}');
				} else {
					if (!_.isEqual(obj, duplicateObj)) callback(obj);

					duplicateObj = obj;
				}
			};
		}
	}]);

	return Listener;
}();

exports.default = Listener;
//# sourceMappingURL=Listener.js.map