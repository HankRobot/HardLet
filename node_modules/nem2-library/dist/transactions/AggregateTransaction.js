'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _AggregateTransactionSchema = require('../schema/AggregateTransactionSchema');

var _AggregateTransactionSchema2 = _interopRequireDefault(_AggregateTransactionSchema);

var _CosignatureTransaction = require('./CosignatureTransaction');

var _CosignatureTransaction2 = _interopRequireDefault(_CosignatureTransaction);

var _AggregateTransactionBuffer = require('../buffers/AggregateTransactionBuffer');

var _AggregateTransactionBuffer2 = _interopRequireDefault(_AggregateTransactionBuffer);

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
 * @module transactions/AggregateTransaction
 */


var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

var AggregateTransactionBuffer = _AggregateTransactionBuffer2.default.Buffers.AggregateTransactionBuffer;

var AggregateTransaction = function (_VerifiableTransactio) {
	_inherits(AggregateTransaction, _VerifiableTransactio);

	function AggregateTransaction() {
		_classCallCheck(this, AggregateTransaction);

		return _possibleConstructorReturn(this, (AggregateTransaction.__proto__ || Object.getPrototypeOf(AggregateTransaction)).apply(this, arguments));
	}

	_createClass(AggregateTransaction, [{
		key: 'signTransactionWithCosigners',
		value: function signTransactionWithCosigners(initializer, cosigners) {
			var signedTransaction = this.signTransaction(initializer);
			cosigners.forEach(function (cosigner) {
				var signatureTransaction = new _CosignatureTransaction2.default(signedTransaction.hash);
				var signatureCosignTransaction = signatureTransaction.signCosignatoriesTransaction(cosigner);
				signedTransaction.payload = signedTransaction.payload + signatureCosignTransaction.signer + signatureCosignTransaction.signature;
			});

			// Calculate new size
			var size = '00000000' + (signedTransaction.payload.length / 2).toString(16);
			var formatedSize = size.substr(size.length - 8, size.length);
			var littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) + formatedSize.substr(2, 2) + formatedSize.substr(0, 2);

			signedTransaction.payload = littleEndianSize + signedTransaction.payload.substr(8, signedTransaction.payload.length - 8);

			return signedTransaction;
		}
	}, {
		key: 'signTransactionGivenSignatures',
		value: function signTransactionGivenSignatures(initializer, cosignedSignedTransactions) {
			var signedTransaction = this.signTransaction(initializer);
			cosignedSignedTransactions.forEach(function (cosignedTransaction) {
				signedTransaction.payload = signedTransaction.payload + cosignedTransaction.signer + cosignedTransaction.signature;
			});

			// Calculate new size
			var size = '00000000' + (signedTransaction.payload.length / 2).toString(16);
			var formatedSize = size.substr(size.length - 8, size.length);
			var littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) + formatedSize.substr(2, 2) + formatedSize.substr(0, 2);

			signedTransaction.payload = littleEndianSize + signedTransaction.payload.substr(8, signedTransaction.payload.length - 8);

			return signedTransaction;
		}
	}], [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.fee = [0, 0];
					this.version = 36867;
					this.type = 0x4141;
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
					key: 'addTransactions',
					value: function addTransactions(transactions) {
						var tmp = [];
						for (var i = 0; i < transactions.length; ++i) {
							tmp = tmp.concat(transactions[i]);
						}this.transactions = tmp;
						return this;
					}
				}, {
					key: 'build',
					value: function build() {
						var builder = new flatbuffers.Builder(1);

						// Create vectors
						var signatureVector = AggregateTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = AggregateTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = AggregateTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = AggregateTransactionBuffer.createFeeVector(builder, this.fee);
						var modificationsVector = AggregateTransactionBuffer.createTransactionsVector(builder, this.transactions);

						AggregateTransactionBuffer.startAggregateTransactionBuffer(builder);
						AggregateTransactionBuffer.addSize(builder, 120 + 4 + this.transactions.length);
						AggregateTransactionBuffer.addSignature(builder, signatureVector);
						AggregateTransactionBuffer.addSigner(builder, signerVector);
						AggregateTransactionBuffer.addVersion(builder, this.version);
						AggregateTransactionBuffer.addType(builder, this.type);
						AggregateTransactionBuffer.addFee(builder, feeVector);
						AggregateTransactionBuffer.addDeadline(builder, deadlineVector);
						AggregateTransactionBuffer.addTransactionsSize(builder, 0 !== this.transactions.length ? this.transactions.length : 4294967296);
						AggregateTransactionBuffer.addTransactions(builder, modificationsVector);

						// Calculate size
						var codedAggregate = AggregateTransactionBuffer.endAggregateTransactionBuffer(builder);
						builder.finish(codedAggregate);

						var bytes = builder.asUint8Array();
						return new AggregateTransaction(bytes, _AggregateTransactionSchema2.default);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return AggregateTransaction;
}(_VerifiableTransaction2.default);

exports.default = AggregateTransaction;
//# sourceMappingURL=AggregateTransaction.js.map