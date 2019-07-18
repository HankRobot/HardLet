'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _MosaicCreationTransactionSchema = require('../schema/MosaicCreationTransactionSchema');

var _MosaicCreationTransactionBuffer = require('../buffers/MosaicCreationTransactionBuffer');

var _MosaicCreationTransactionBuffer2 = _interopRequireDefault(_MosaicCreationTransactionBuffer);

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
 * @module transactions/MosaicCreationTransaction
 */


var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

var MosaicCreationTransactionBuffer = _MosaicCreationTransactionBuffer2.default.Buffers.MosaicCreationTransactionBuffer;

var MosaicCreationTransaction = function (_VerifiableTransactio) {
	_inherits(MosaicCreationTransaction, _VerifiableTransactio);

	function MosaicCreationTransaction() {
		_classCallCheck(this, MosaicCreationTransaction);

		return _possibleConstructorReturn(this, (MosaicCreationTransaction.__proto__ || Object.getPrototypeOf(MosaicCreationTransaction)).apply(this, arguments));
	}

	_createClass(MosaicCreationTransaction, null, [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.flags = 0;
					this.fee = [0, 0];
					this.version = 36867;
					this.type = 0x414d;
					this.nonce = 0;
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
					key: 'addNonce',
					value: function addNonce(nonce) {
						this.nonce = nonce;
						return this;
					}
				}, {
					key: 'addDeadline',
					value: function addDeadline(deadline) {
						this.deadline = deadline;
						return this;
					}
				}, {
					key: 'addDuration',
					value: function addDuration(duration) {
						this.duration = duration;
						return this;
					}
				}, {
					key: 'addDivisibility',
					value: function addDivisibility(divisibility) {
						this.divisibility = divisibility;
						return this;
					}
				}, {
					key: 'addSupplyMutable',
					value: function addSupplyMutable() {
						this.flags += 1;
						return this;
					}
				}, {
					key: 'addTransferability',
					value: function addTransferability() {
						this.flags += 2;
						return this;
					}
				}, {
					key: 'addLevyMutable',
					value: function addLevyMutable() {
						this.flags += 4;
						return this;
					}
				}, {
					key: 'addMosaicId',
					value: function addMosaicId(mosaicId) {
						this.mosaicId = mosaicId;
						return this;
					}
				}, {
					key: 'build',
					value: function build() {
						var builder = new flatbuffers.Builder(1);

						// Create vectors
						var signatureVector = MosaicCreationTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = MosaicCreationTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = MosaicCreationTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = MosaicCreationTransactionBuffer.createFeeVector(builder, this.fee);
						var nonceVector = MosaicCreationTransactionBuffer.createNonceVector(builder, this.nonce);
						var mosaicIdVector = MosaicCreationTransactionBuffer.createMosaicIdVector(builder, this.mosaicId);

						var durationVector = MosaicCreationTransactionBuffer.createDurationVector(builder, this.duration);

						var durationProvided = 0 < this.duration.length;

						MosaicCreationTransactionBuffer.startMosaicCreationTransactionBuffer(builder);
						MosaicCreationTransactionBuffer.addSize(builder, durationProvided ? 144 : 135);
						MosaicCreationTransactionBuffer.addSignature(builder, signatureVector);
						MosaicCreationTransactionBuffer.addSigner(builder, signerVector);
						MosaicCreationTransactionBuffer.addVersion(builder, this.version);
						MosaicCreationTransactionBuffer.addType(builder, this.type);
						MosaicCreationTransactionBuffer.addFee(builder, feeVector);
						MosaicCreationTransactionBuffer.addDeadline(builder, deadlineVector);
						MosaicCreationTransactionBuffer.addNonce(builder, nonceVector);
						MosaicCreationTransactionBuffer.addMosaicId(builder, mosaicIdVector);
						MosaicCreationTransactionBuffer.addNumOptionalProperties(builder, durationProvided ? 1 : 0);
						MosaicCreationTransactionBuffer.addFlags(builder, this.flags);

						MosaicCreationTransactionBuffer.addDivisibility(builder, this.divisibility);

						if (durationProvided) {
							MosaicCreationTransactionBuffer.addIndicateDuration(builder, 2);
							MosaicCreationTransactionBuffer.addDuration(builder, durationVector);
						}

						// Calculate size

						var codedMosaicCreation = MosaicCreationTransactionBuffer.endMosaicCreationTransactionBuffer(builder);
						builder.finish(codedMosaicCreation);

						var bytes = builder.asUint8Array();

						var schema = durationProvided ? _MosaicCreationTransactionSchema.schema : _MosaicCreationTransactionSchema.schemaNoDuration;
						return new MosaicCreationTransaction(bytes, schema);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return MosaicCreationTransaction;
}(_VerifiableTransaction2.default);

exports.default = MosaicCreationTransaction;
//# sourceMappingURL=MosaicCreationTransaction.js.map