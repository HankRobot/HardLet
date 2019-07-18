'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsSha = require('js-sha3');

var _ripemd = require('ripemd160');

var _ripemd2 = _interopRequireDefault(_ripemd);

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _base = require('./base32');

var _base2 = _interopRequireDefault(_base);

var _convert = require('./convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constants = {
	sizes: {
		ripemd160: 20,
		addressDecoded: 25,
		addressEncoded: 40,
		key: 32,
		checksum: 4
	}
};

/** @exports coders/address */
/*
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

var address = {
	/**
  * Converts an encoded address string to a decoded address.
  * @param {string} encoded The encoded address string.
  * @returns {Uint8Array} The decoded address corresponding to the input.
  */
	stringToAddress: function stringToAddress(encoded) {
		if (constants.sizes.addressEncoded !== encoded.length) throw Error(encoded + ' does not represent a valid encoded address');

		return _base2.default.decode(encoded);
	},

	/**
  * Format a namespaceId *alias* into a valid recipient field value.
  * @param {string} namespaceId The hexadecimal namespaceId
  * @returns {Uint8Array} The padded hexadecimal notation of the alias
  */
	aliasToRecipient: function aliasToRecipient(namespaceId) {
		// 0x91 | namespaceId on 8 bytes | 16 bytes 0-pad = 25 bytes
		var padded = new Uint8Array(1 + 8 + 16);
		padded.set([0x91], 0);
		padded.set(namespaceId.reverse(), 1);
		padded.set(_convert2.default.hexToUint8('00'.repeat(16)), 9);
		return padded;
	},

	/**
  * Converts a decoded address to an encoded address string.
  * @param {Uint8Array} decoded The decoded address.
  * @returns {string} The encoded address string corresponding to the input.
  */
	addressToString: function addressToString(decoded) {
		if (constants.sizes.addressDecoded !== decoded.length) throw Error(_convert2.default.uint8ToHex(decoded) + ' does not represent a valid decoded address');

		return _base2.default.encode(decoded);
	},

	/**
  * Converts a public key to a decoded address for a specific network.
  * @param {module:crypto/keyPair~PublicKey} publicKey The public key.
  * @param {number} networkIdentifier The network identifier.
  * @returns {Uint8Array} The decoded address corresponding to the inputs.
  */
	publicKeyToAddress: function publicKeyToAddress(publicKey, networkIdentifier) {
		// step 1: sha3 hash of the public key
		var publicKeyHash = _jsSha.sha3_256.arrayBuffer(publicKey);

		// step 2: ripemd160 hash of (1)
		var ripemdHash = new _ripemd2.default().update(new Buffer(publicKeyHash)).digest();

		// step 3: add network identifier byte in front of (2)
		var decodedAddress = new Uint8Array(constants.sizes.addressDecoded);
		decodedAddress[0] = networkIdentifier;
		_array2.default.copy(decodedAddress, ripemdHash, constants.sizes.ripemd160, 1);

		// step 4: concatenate (3) and the checksum of (3)
		var hash = _jsSha.sha3_256.arrayBuffer(decodedAddress.subarray(0, constants.sizes.ripemd160 + 1));
		_array2.default.copy(decodedAddress, _array2.default.uint8View(hash), constants.sizes.checksum, constants.sizes.ripemd160 + 1);

		return decodedAddress;
	},

	/**
  * Determines the validity of a decoded address.
  * @param {Uint8Array} decoded The decoded address.
  * @returns {boolean} true if the decoded address is valid, false otherwise.
  */
	isValidAddress: function isValidAddress(decoded) {
		var hash = _jsSha.sha3_256.create();
		var checksumBegin = constants.sizes.addressDecoded - constants.sizes.checksum;
		hash.update(decoded.subarray(0, checksumBegin));
		var checksum = new Uint8Array(constants.sizes.checksum);
		_array2.default.copy(checksum, _array2.default.uint8View(hash.arrayBuffer()), constants.sizes.checksum);
		return _array2.default.deepEqual(checksum, decoded.subarray(checksumBegin));
	},

	/**
  * Determines the validity of an encoded address string.
  * @param {string} encoded The encoded address string.
  * @returns {boolean} true if the encoded address string is valid, false otherwise.
  */
	isValidEncodedAddress: function isValidEncodedAddress(encoded) {
		if (constants.sizes.addressEncoded !== encoded.length) return false;

		try {
			var decoded = address.stringToAddress(encoded);
			return address.isValidAddress(decoded);
		} catch (err) {
			return false;
		}
	}
};

exports.default = address;
//# sourceMappingURL=address.js.map