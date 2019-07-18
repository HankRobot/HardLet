'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _HashLockTransactionBuffer = require('../buffers/HashLockTransactionBuffer');

var HashLockTransactionBufferPackage = _interopRequireWildcard(_HashLockTransactionBuffer);

var _HashLockTransactionSchema = require('../schema/HashLockTransactionSchema');

var _HashLockTransactionSchema2 = _interopRequireDefault(_HashLockTransactionSchema);

var _convert = require('../coders/convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

/**
 * @module transactions/HashLockTransaction
 */


var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

var HashLockTransactionBuffer = HashLockTransactionBufferPackage.default.Buffers.HashLockTransactionBuffer;

var HashLockTransaction = function (_VerifiableTransactio) {
	_inherits(HashLockTransaction, _VerifiableTransactio);

	function HashLockTransaction() {
		_classCallCheck(this, HashLockTransaction);

		return _possibleConstructorReturn(this, (HashLockTransaction.__proto__ || Object.getPrototypeOf(HashLockTransaction)).apply(this, arguments));
	}

	_createClass(HashLockTransaction, null, [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.fee = [0, 0];
					this.version = 36867;
					this.type = 0x414C;
				}

				_createClass(Builder, [{
					key: 'addFee',
					value: function addFee(fee) {
						this.fee = fee;
						return this;
					}
				}, {
					key: 'addVersion',
					value: function addVersion(version) {
						this.version = version;
						return this;
					}
				}, {
					key: 'addType',
					value: function addType(type) {
						this.type = type;
						return this;
					}
				}, {
					key: 'addDeadline',
					value: function addDeadline(deadline) {
						this.deadline = deadline;
						return this;
					}
				}, {
					key: 'addMosaicId',
					value: function addMosaicId(mosaicId) {
						this.mosaicId = mosaicId;
						return this;
					}
				}, {
					key: 'addMosaicAmount',
					value: function addMosaicAmount(mosaicAmount) {
						this.mosaicAmount = mosaicAmount;
						return this;
					}
				}, {
					key: 'addDuration',
					value: function addDuration(duration) {
						this.duration = duration;
						return this;
					}
				}, {
					key: 'addHash',
					value: function addHash(hash) {
						this.hash = hash;
						return this;
					}
				}, {
					key: 'build',
					value: function build() {
						var builder = new flatbuffers.Builder(1);

						// Create vectors
						var signatureVector = HashLockTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = HashLockTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = HashLockTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = HashLockTransactionBuffer.createFeeVector(builder, this.fee);
						var mosaicIdVector = HashLockTransactionBuffer.createMosaicIdVector(builder, this.mosaicId);
						var mosaicAmountVector = HashLockTransactionBuffer.createMosaicAmountVector(builder, this.mosaicAmount);
						var durationVector = HashLockTransactionBuffer.createDurationVector(builder, this.duration);
						var byteHash = _convert2.default.hexToUint8(this.hash);
						var hashVector = HashLockTransactionBuffer.createHashVector(builder, byteHash);

						HashLockTransactionBuffer.startHashLockTransactionBuffer(builder);
						HashLockTransactionBuffer.addSize(builder, 176);
						HashLockTransactionBuffer.addSignature(builder, signatureVector);
						HashLockTransactionBuffer.addSigner(builder, signerVector);
						HashLockTransactionBuffer.addVersion(builder, this.version);
						HashLockTransactionBuffer.addType(builder, this.type);
						HashLockTransactionBuffer.addFee(builder, feeVector);
						HashLockTransactionBuffer.addDeadline(builder, deadlineVector);
						HashLockTransactionBuffer.addMosaicId(builder, mosaicIdVector);
						HashLockTransactionBuffer.addMosaicAmount(builder, mosaicAmountVector);
						HashLockTransactionBuffer.addDuration(builder, durationVector);
						HashLockTransactionBuffer.addHash(builder, hashVector);

						var codedHashLock = HashLockTransactionBuffer.endHashLockTransactionBuffer(builder);
						builder.finish(codedHashLock);

						var bytes = builder.asUint8Array();
						return new HashLockTransaction(bytes, _HashLockTransactionSchema2.default);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return HashLockTransaction;
}(_VerifiableTransaction2.default);

exports.default = HashLockTransaction;
//# sourceMappingURL=HashLockTransaction.js.map