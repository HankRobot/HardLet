'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _AccountPropertiesMosaicModificationTransactionSchema = require('../schema/AccountPropertiesMosaicModificationTransactionSchema');

var _AccountPropertiesMosaicModificationTransactionSchema2 = _interopRequireDefault(_AccountPropertiesMosaicModificationTransactionSchema);

var _AccountPropertiesMosaicTransactionBuffer = require('../buffers/AccountPropertiesMosaicTransactionBuffer');

var _AccountPropertiesMosaicTransactionBuffer2 = _interopRequireDefault(_AccountPropertiesMosaicTransactionBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2019 NEM
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
 * @module transactions/AccountPropertiesMosaicTransaction
 */


var _AccountPropertiesMos = _AccountPropertiesMosaicTransactionBuffer2.default.Buffers,
    AccountPropertiesMosaicTransactionBuffer = _AccountPropertiesMos.AccountPropertiesMosaicTransactionBuffer,
    PropertyMosaicModificationBuffer = _AccountPropertiesMos.PropertyMosaicModificationBuffer;

var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

var AccountPropertiesMosaicTransaction = function (_VerifiableTransactio) {
	_inherits(AccountPropertiesMosaicTransaction, _VerifiableTransactio);

	function AccountPropertiesMosaicTransaction() {
		_classCallCheck(this, AccountPropertiesMosaicTransaction);

		return _possibleConstructorReturn(this, (AccountPropertiesMosaicTransaction.__proto__ || Object.getPrototypeOf(AccountPropertiesMosaicTransaction)).apply(this, arguments));
	}

	_createClass(AccountPropertiesMosaicTransaction, null, [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.fee = [0, 0];
					this.version = 36865;
					this.type = 0x4250;
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
					key: 'addPropertyType',
					value: function addPropertyType(propertyType) {
						this.propertyType = propertyType;
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
							var addressModificationVector = PropertyMosaicModificationBuffer.createValueVector(builder, modification.value);
							PropertyMosaicModificationBuffer.startPropertyMosaicModificationBuffer(builder);
							PropertyMosaicModificationBuffer.addModificationType(builder, modification.modificationType);
							PropertyMosaicModificationBuffer.addValue(builder, addressModificationVector);
							modificationsArray.push(PropertyMosaicModificationBuffer.endPropertyMosaicModificationBuffer(builder));
						});

						// Create vectors
						var signatureVector = AccountPropertiesMosaicTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = AccountPropertiesMosaicTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = AccountPropertiesMosaicTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = AccountPropertiesMosaicTransactionBuffer.createFeeVector(builder, this.fee);
						var modificationVector = AccountPropertiesMosaicTransactionBuffer.createModificationsVector(builder, modificationsArray);

						AccountPropertiesMosaicTransactionBuffer.startAccountPropertiesMosaicTransactionBuffer(builder);
						AccountPropertiesMosaicTransactionBuffer.addSize(builder, 122 + 9 * this.modifications.length);
						AccountPropertiesMosaicTransactionBuffer.addSignature(builder, signatureVector);
						AccountPropertiesMosaicTransactionBuffer.addSigner(builder, signerVector);
						AccountPropertiesMosaicTransactionBuffer.addVersion(builder, this.version);
						AccountPropertiesMosaicTransactionBuffer.addType(builder, this.type);
						AccountPropertiesMosaicTransactionBuffer.addFee(builder, feeVector);
						AccountPropertiesMosaicTransactionBuffer.addDeadline(builder, deadlineVector);
						AccountPropertiesMosaicTransactionBuffer.addPropertyType(builder, this.propertyType);
						AccountPropertiesMosaicTransactionBuffer.addModificationCount(builder, this.modifications.length);
						AccountPropertiesMosaicTransactionBuffer.addModifications(builder, modificationVector);

						// Calculate size
						var codedAccountPropertiesMosaic = AccountPropertiesMosaicTransactionBuffer.endAccountPropertiesMosaicTransactionBuffer(builder);
						builder.finish(codedAccountPropertiesMosaic);

						var bytes = builder.asUint8Array();

						return new AccountPropertiesMosaicTransaction(bytes, _AccountPropertiesMosaicModificationTransactionSchema2.default);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return AccountPropertiesMosaicTransaction;
}(_VerifiableTransaction2.default);

exports.default = AccountPropertiesMosaicTransaction;
//# sourceMappingURL=AccountPropertiesMosaicTransaction.js.map