'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _MultisigModificationTransactionSchema = require('../schema/MultisigModificationTransactionSchema');

var _MultisigModificationTransactionSchema2 = _interopRequireDefault(_MultisigModificationTransactionSchema);

var _convert = require('../coders/convert');

var _convert2 = _interopRequireDefault(_convert);

var _MultisigModificationTransactionBuffer = require('../buffers/MultisigModificationTransactionBuffer');

var _MultisigModificationTransactionBuffer2 = _interopRequireDefault(_MultisigModificationTransactionBuffer);

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

var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

var _MultisigModification = _MultisigModificationTransactionBuffer2.default.Buffers,
    MultisigModificationTransactionBuffer = _MultisigModification.MultisigModificationTransactionBuffer,
    CosignatoryModificationBuffer = _MultisigModification.CosignatoryModificationBuffer;

/**
 * @module transactions/MultisigModificationTransaction
 */

var MultisigModificationTransaction = function (_VerifiableTransactio) {
	_inherits(MultisigModificationTransaction, _VerifiableTransactio);

	function MultisigModificationTransaction() {
		_classCallCheck(this, MultisigModificationTransaction);

		return _possibleConstructorReturn(this, (MultisigModificationTransaction.__proto__ || Object.getPrototypeOf(MultisigModificationTransaction)).apply(this, arguments));
	}

	_createClass(MultisigModificationTransaction, null, [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.fee = [0, 0];
					this.version = 36867;
					this.type = 0x4155;
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
					key: 'addMinRemovalDelta',
					value: function addMinRemovalDelta(minRemovalDelta) {
						this.minRemovalDelta = minRemovalDelta;
						return this;
					}
				}, {
					key: 'addMinApprovalDelta',
					value: function addMinApprovalDelta(minApprovalDelta) {
						this.minApprovalDelta = minApprovalDelta;
						return this;
					}
				}, {
					key: 'addModifications',
					value: function addModifications(modifications) {
						this.modifications = modifications;
						return this;
					}
				}, {
					key: 'build',
					value: function build() {
						var builder = new flatbuffers.Builder(1);

						// Create modifications
						var modificationsArray = [];
						this.modifications.forEach(function (modification) {
							var cosignatoryPublicKeyVector = CosignatoryModificationBuffer.createCosignatoryPublicKeyVector(builder, _convert2.default.hexToUint8(modification.cosignatoryPublicKey));
							CosignatoryModificationBuffer.startCosignatoryModificationBuffer(builder);
							CosignatoryModificationBuffer.addType(builder, modification.type);
							CosignatoryModificationBuffer.addCosignatoryPublicKey(builder, cosignatoryPublicKeyVector);
							modificationsArray.push(CosignatoryModificationBuffer.endCosignatoryModificationBuffer(builder));
						});

						// Create vectors
						var signatureVector = MultisigModificationTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = MultisigModificationTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = MultisigModificationTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = MultisigModificationTransactionBuffer.createFeeVector(builder, this.fee);
						var modificationsVector = MultisigModificationTransactionBuffer.createModificationsVector(builder, modificationsArray);

						MultisigModificationTransactionBuffer.startMultisigModificationTransactionBuffer(builder);
						MultisigModificationTransactionBuffer.addSize(builder, 123 + 33 * this.modifications.length);
						MultisigModificationTransactionBuffer.addSignature(builder, signatureVector);
						MultisigModificationTransactionBuffer.addSigner(builder, signerVector);
						MultisigModificationTransactionBuffer.addVersion(builder, this.version);
						MultisigModificationTransactionBuffer.addType(builder, this.type);
						MultisigModificationTransactionBuffer.addFee(builder, feeVector);
						MultisigModificationTransactionBuffer.addDeadline(builder, deadlineVector);
						MultisigModificationTransactionBuffer.addMinRemovalDelta(builder, this.minRemovalDelta);
						MultisigModificationTransactionBuffer.addMinApprovalDelta(builder, this.minApprovalDelta);
						MultisigModificationTransactionBuffer.addNumModifications(builder, this.modifications.length);
						MultisigModificationTransactionBuffer.addModifications(builder, modificationsVector);

						// Calculate size
						var codedMultisigAggregate = MultisigModificationTransactionBuffer.endMultisigModificationTransactionBuffer(builder);
						builder.finish(codedMultisigAggregate);

						var bytes = builder.asUint8Array();
						return new MultisigModificationTransaction(bytes, _MultisigModificationTransactionSchema2.default);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return MultisigModificationTransaction;
}(_VerifiableTransaction2.default);

exports.default = MultisigModificationTransaction;
//# sourceMappingURL=MultisigModificationTransaction.js.map