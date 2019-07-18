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

var _convert = require('../coders/convert');

var _convert2 = _interopRequireDefault(_convert);

var _sha3Hasher = require('../crypto/sha3Hasher');

var _sha3Hasher2 = _interopRequireDefault(_sha3Hasher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyPair = require('../crypto/keyPair');

/**
 * VerifiableTransaction
 * @module transactions/VerifiableTransaction
 * @version 1.0.0
 */

var VerifiableTransaction = function () {
	/**
  * @constructor
  * @param {Uint8Array} bytes Uint8Array after flatbuffers.build.asUint8Array()
  * @param {module:schema/Schema} schema Schema definition corresponding to flatbuffer Schema
  */
	function VerifiableTransaction(bytes, schema) {
		_classCallCheck(this, VerifiableTransaction);

		this.bytes = bytes;
		this.schema = schema;
	}

	/**
  * @param {string} transactionPayload HexString Payload
  * @returns {*|string} Returns Transaction Payload hash
  */


	_createClass(VerifiableTransaction, [{
		key: 'signTransaction',


		/**
   * @param {KeyPair } keyPair KeyPair instance
   * @returns {module:model/TransactionPayload} - Signed Transaction Payload
   */
		value: function signTransaction(keyPair) {
			var byteBuffer = this.serialize();
			var signingBytes = byteBuffer.slice(4 + 64 + 32);
			var keyPairEncoded = KeyPair.createKeyPairFromPrivateKeyString(keyPair.privateKey);
			var signature = Array.from(KeyPair.sign(keyPair, new Uint8Array(signingBytes)));
			var signedTransactionBuffer = byteBuffer.splice(0, 4).concat(signature).concat(Array.from(keyPairEncoded.publicKey)).concat(byteBuffer.splice(64 + 32, byteBuffer.length));
			var payload = _convert2.default.uint8ToHex(signedTransactionBuffer);
			return {
				payload: payload,
				hash: VerifiableTransaction.createTransactionHash(payload)
			};
		}
	}, {
		key: 'serialize',
		value: function serialize() {
			return this.schema.serialize(Array.from(this.bytes));
		}

		/**
   * @returns {string} - Serialized Transaction Payload
   */

	}, {
		key: 'serializeUnsignedTransaction',
		value: function serializeUnsignedTransaction() {
			return _convert2.default.uint8ToHex(this.serialize());
		}

		/**
   * @param {KeyPair} keyPair KeyPair instance
   * @returns {module:model/TransactionPayload} Returns TransactionPayload instance
   */

	}, {
		key: 'signCosignatoriesTransaction',
		value: function signCosignatoriesTransaction(keyPair) {
			var signature = KeyPair.sign(keyPair, new Uint8Array(this.bytes));
			return {
				parentHash: _convert2.default.uint8ToHex(this.bytes),
				signature: _convert2.default.uint8ToHex(signature),
				signer: keyPair.publicKey
			};
		}

		/**
   * Converts the transaction into AggregateTransaction compatible
   * @param {string} [_signer] Signer public key
   * @returns {Array.<*>} AggregateTransaction bytes
   */

	}, {
		key: 'toAggregateTransaction',
		value: function toAggregateTransaction(_signer) {
			var signer = _convert2.default.hexToUint8(_signer);
			var resultBytes = this.schema.serialize(Array.from(this.bytes));
			resultBytes.splice(0, 4 + 64 + 32);
			resultBytes = Array.from(signer).concat(resultBytes);
			resultBytes.splice(32 + 2 + 2, 16);
			return Array.from(new Uint8Array([resultBytes.length + 4 & 0x000000ff, (resultBytes.length + 4 & 0x0000ff00) >> 8, (resultBytes.length + 4 & 0x00ff0000) >> 16, (resultBytes.length + 4 & 0xff000000) >> 24])).concat(resultBytes);
		}
	}], [{
		key: 'createTransactionHash',
		value: function createTransactionHash(transactionPayload) {
			var byteBuffer = Array.from(_convert2.default.hexToUint8(transactionPayload));
			var signingBytes = byteBuffer.slice(4, 36).concat(byteBuffer.slice(4 + 64, 4 + 64 + 32)).concat(byteBuffer.splice(4 + 64 + 32, byteBuffer.length));

			var hash = new Uint8Array(32);

			_sha3Hasher2.default.func(hash, signingBytes, 32);

			return _convert2.default.uint8ToHex(hash);
		}
	}]);

	return VerifiableTransaction;
}();

exports.default = VerifiableTransaction;
//# sourceMappingURL=VerifiableTransaction.js.map