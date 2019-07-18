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

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

/**
 * @module transactions/VerifiableTransactionBuilder
 */

/**
 * @callback LambdaBuilder
 * @param {flatbuffers.Builder} builder
 * @return {void}
 */

var VerifiableTransactionBuilder = function () {
	function VerifiableTransactionBuilder() {
		_classCallCheck(this, VerifiableTransactionBuilder);
	}

	_createClass(VerifiableTransactionBuilder, [{
		key: 'addTransaction',

		/**
   * @param {LambdaBuilder} lambda Callback
   * @returns {VerifiableTransactionBuilder} Returns self instance
   */
		value: function addTransaction(lambda) {
			var builder = new flatbuffers.Builder(1);

			lambda(builder);

			this.bytes = builder.asUint8Array();
			return this;
		}

		/**
   * @param {module:schema/Schema} schema Schema corresponding with flatbuffers Schema used on addTransaction
   * @returns {VerifiableTransactionBuilder} Returns self instance
   */

	}, {
		key: 'addSchema',
		value: function addSchema(schema) {
			this.schema = schema;
			return this;
		}

		/**
   * @returns {VerifiableTransaction} Returns VerifiableTransaction instance
   */

	}, {
		key: 'build',
		value: function build() {
			return new _VerifiableTransaction2.default(this.bytes, this.schema);
		}
	}]);

	return VerifiableTransactionBuilder;
}();

exports.default = VerifiableTransactionBuilder;
//# sourceMappingURL=VerificableTransactionBuilder.js.map