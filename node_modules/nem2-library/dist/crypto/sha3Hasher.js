'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsSha = require('js-sha3');

var _array = require('../coders/array');

var _array2 = _interopRequireDefault(_array);

var _convert = require('../coders/convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getHasher() {
	var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 64;

	return { 32: _jsSha.sha3_256, 64: _jsSha.sha3_512 }[length];
} /*
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

/** @module crypto/sha3Hasher */
exports.default = {
	/**
  * Calculates the hash of data.
  * @param {Uint8Array} dest The computed hash destination.
  * @param {Uint8Array} data The data to hash.
  * @param {numeric} length The hash length in bytes.
  */
	func: function func(dest, data, length) {
		var hasher = getHasher(length);
		var hash = hasher.arrayBuffer(data);
		_array2.default.copy(dest, _array2.default.uint8View(hash));
	},

	/**
  * Creates a hasher object.
  * @param {numeric} length The hash length in bytes.
  * @returns {object} The hasher.
  */
	createHasher: function createHasher(length) {
		var hash = void 0;
		return {
			reset: function reset() {
				hash = getHasher(length).create();
			},
			update: function update(data) {
				if (data instanceof Uint8Array) hash.update(data);else if ('string' === typeof data) hash.update(_convert2.default.hexToUint8(data));else throw Error('unsupported data type');
			},
			finalize: function finalize(result) {
				_array2.default.copy(result, _array2.default.uint8View(hash.arrayBuffer()));
			}
		};
	}
};
//# sourceMappingURL=sha3Hasher.js.map