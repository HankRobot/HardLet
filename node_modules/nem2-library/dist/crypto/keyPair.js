'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.hash = undefined;
exports.createKeyPairFromPrivateKeyString = createKeyPairFromPrivateKeyString;
exports.sign = sign;
exports.verify = verify;
exports.deriveSharedKey = deriveSharedKey;

var _sha3Hasher = require('./sha3Hasher');

var _sha3Hasher2 = _interopRequireDefault(_sha3Hasher);

var _nacl_catapult = require('./nacl_catapult');

var _nacl_catapult2 = _interopRequireDefault(_nacl_catapult);

var _array = require('../coders/array');

var _array2 = _interopRequireDefault(_array);

var _convert = require('../coders/convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/** @module crypto/keyPair */
var Key_Size = 32;
var Signature_Size = 64;
var Half_Signature_Size = Signature_Size / 2;
var Hash_Size = 64;
var Half_Hash_Size = Hash_Size / 2;

// custom catapult hash functions
var catapult = {};
catapult.hash = {
	func: _sha3Hasher2.default.func,
	createHasher: _sha3Hasher2.default.createHasher
};

// custom catapult crypto functions
catapult.crypto = function () {
	function clamp(d) {
		d[0] &= 248;
		d[31] &= 127;
		d[31] |= 64;
	}

	function prepareForScalarMult(sk, hashfunc) {
		var d = new Uint8Array(Hash_Size);
		hashfunc(d, sk);
		clamp(d);
		return d;
	}

	var encodedSChecker = function () {
		var Is_Reduced = 1;
		var Is_Zero = 2;

		function validateEncodedSPart(s) {
			if (_array2.default.isZero(s)) return Is_Zero | Is_Reduced;

			var copy = new Uint8Array(Signature_Size);
			_array2.default.copy(copy, s, Half_Signature_Size);

			_nacl_catapult2.default.catapult.reduce(copy);
			return _array2.default.deepEqual(s, copy, Half_Signature_Size) ? Is_Reduced : 0;
		}

		return {
			isCanonical: function isCanonical(s) {
				return Is_Reduced === validateEncodedSPart(s);
			},

			requireValid: function requireValid(s) {
				if (0 === (validateEncodedSPart(s) & Is_Reduced)) throw Error('S part of signature invalid');
			}
		};
	}();

	return {
		extractPublicKey: function extractPublicKey(sk, hashfunc) {
			var c = _nacl_catapult2.default.catapult;
			var d = prepareForScalarMult(sk, hashfunc);

			var p = [c.gf(), c.gf(), c.gf(), c.gf()];
			var pk = new Uint8Array(Key_Size);
			c.scalarbase(p, d);
			c.pack(pk, p);
			return pk;
		},

		sign: function sign(m, pk, sk, hasher) {
			var c = _nacl_catapult2.default.catapult;

			var d = new Uint8Array(Hash_Size);
			hasher.reset();
			hasher.update(sk);
			hasher.finalize(d);
			clamp(d);

			var r = new Uint8Array(Hash_Size);
			hasher.reset();
			hasher.update(d.subarray(Half_Hash_Size));
			hasher.update(m);
			hasher.finalize(r);

			var p = [c.gf(), c.gf(), c.gf(), c.gf()];
			var signature = new Uint8Array(Signature_Size);
			c.reduce(r);
			c.scalarbase(p, r);
			c.pack(signature, p);

			var h = new Uint8Array(Hash_Size);
			hasher.reset();
			hasher.update(signature.subarray(0, Half_Signature_Size));
			hasher.update(pk);
			hasher.update(m);
			hasher.finalize(h);

			c.reduce(h);

			// muladd
			var x = new Float64Array(Hash_Size);
			_array2.default.copy(x, r, Half_Hash_Size);

			for (var i = 0; i < Half_Hash_Size; ++i) {
				for (var j = 0; j < Half_Hash_Size; ++j) {
					x[i + j] += h[i] * d[j];
				}
			}

			c.modL(signature.subarray(Half_Signature_Size), x);
			encodedSChecker.requireValid(signature.subarray(Half_Signature_Size));
			return signature;
		},

		verify: function verify(pk, m, signature, hasher) {
			// reject non canonical signature
			if (!encodedSChecker.isCanonical(signature.subarray(Half_Signature_Size))) return false;

			// reject weak (zero) public key
			if (_array2.default.isZero(pk)) return false;

			var c = _nacl_catapult2.default.catapult;
			var p = [c.gf(), c.gf(), c.gf(), c.gf()];
			var q = [c.gf(), c.gf(), c.gf(), c.gf()];

			if (c.unpackneg(q, pk)) return false;

			var h = new Uint8Array(Hash_Size);
			hasher.reset();
			hasher.update(signature.subarray(0, Half_Signature_Size));
			hasher.update(pk);
			hasher.update(m);
			hasher.finalize(h);

			c.reduce(h);
			c.scalarmult(p, q, h);

			var t = new Uint8Array(Signature_Size);
			c.scalarbase(q, signature.subarray(Half_Signature_Size));
			c.add(p, q);
			c.pack(t, p);

			return 0 === c.crypto_verify_32(signature, 0, t, 0);
		},

		deriveSharedKey: function deriveSharedKey(salt, sk, pk, hashfunc) {
			var c = _nacl_catapult2.default.catapult;
			var d = prepareForScalarMult(sk, hashfunc);

			// sharedKey = pack(p = d (derived from sk) * q (derived from pk))
			var q = [c.gf(), c.gf(), c.gf(), c.gf()];
			var p = [c.gf(), c.gf(), c.gf(), c.gf()];
			var sharedKey = new Uint8Array(Key_Size);
			c.unpackneg(q, pk);
			c.scalarmult(p, q, d);
			c.pack(sharedKey, p);

			// salt the shared key
			for (var i = 0; i < Key_Size; ++i) {
				sharedKey[i] ^= salt[i];
			} // return the hash of the result
			var sharedKeyHash = new Uint8Array(Key_Size);
			hashfunc(sharedKeyHash, sharedKey, Key_Size);
			return sharedKeyHash;
		}
	};
}();

// region exported functions

/**
 * A catapult public key.
 * @typedef {Uint8Array} PublicKey
 */

/**
 * A catapult key pair composed of a public and private key.
 * @typedef {object} KeyPair
 * @property {module:crypto/keyPair~PublicKey} publicKey The public key.
 * @property {Uint8Array} privateKey The private key.
 */

/**
 * Creates a key pair from a private key string.
 * @param {string} privateKeyString A hex encoded private key string.
 * @returns {module:crypto/keyPair~KeyPair} The key pair.
 */
function createKeyPairFromPrivateKeyString(privateKeyString) {
	var privateKey = _convert2.default.hexToUint8(privateKeyString);
	if (Key_Size !== privateKey.length) throw Error('private key has unexpected size: ' + privateKey.length);

	var publicKey = catapult.crypto.extractPublicKey(privateKey, catapult.hash.func);
	return { privateKey: privateKey, publicKey: publicKey };
}

/**
 * Signs a data buffer with a key pair.
 * @param {module:crypto/keyPair~KeyPair} keyPair The key pair to use for signing.
 * @param {Uint8Array} data The data to sign.
 * @returns {Uint8Array} The signature.
 */
function sign(keyPair, data) {
	return catapult.crypto.sign(data, keyPair.publicKey, keyPair.privateKey, catapult.hash.createHasher());
}

/**
 * Verifies a signature.
 * @param {module:crypto/keyPair~PublicKey} publicKey The public key to use for verification.
 * @param {Uint8Array} data The data to verify.
 * @param {Uint8Array} signature The signature to verify.
 * @returns {boolean} true if the signature is verifiable, false otherwise.
 */
function verify(publicKey, data, signature) {
	return catapult.crypto.verify(publicKey, data, signature, catapult.hash.createHasher());
}

/**
 * Creates a shared key given a key pair and an arbitrary public key.
 * The shared key can be used for encrypted message passing between the two.
 * @param {module:crypto/keyPair~KeyPair} keyPair The key pair for which to create the shared key.
 * @param {module:crypto/keyPair~PublicKey} publicKey The public key for which to create the shared key.
 * @param {Uint8Array} salt A salt that should be applied to the shared key.
 * @returns {Uint8Array} The shared key.
 */
function deriveSharedKey(keyPair, publicKey, salt) {
	if (Key_Size !== salt.length) throw Error('salt has unexpected size: ' + salt.length);

	return catapult.crypto.deriveSharedKey(salt, keyPair.privateKey, publicKey, catapult.hash.func);
}

var hash = exports.hash = catapult.hash;

// endregion
//# sourceMappingURL=keyPair.js.map