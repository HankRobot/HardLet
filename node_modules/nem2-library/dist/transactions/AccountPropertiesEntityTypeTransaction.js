'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _AccountPropertiesEntityTypeModificationTransactionSchema = require('../schema/AccountPropertiesEntityTypeModificationTransactionSchema');

var _AccountPropertiesEntityTypeModificationTransactionSchema2 = _interopRequireDefault(_AccountPropertiesEntityTypeModificationTransactionSchema);

var _AccountPropertiesEntityTypeTransactionBuffer = require('../buffers/AccountPropertiesEntityTypeTransactionBuffer');

var _AccountPropertiesEntityTypeTransactionBuffer2 = _interopRequireDefault(_AccountPropertiesEntityTypeTransactionBuffer);

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
 * @module transactions/AccountPropertiesEntityTypeTransaction
 */


var _AccountPropertiesEnt = _AccountPropertiesEntityTypeTransactionBuffer2.default.Buffers,
    AccountPropertiesEntityTypeTransactionBuffer = _AccountPropertiesEnt.AccountPropertiesEntityTypeTransactionBuffer,
    PropertyEntityTypeModificationBuffer = _AccountPropertiesEnt.PropertyEntityTypeModificationBuffer;

var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

var AccountPropertiesEntityTypeTransaction = function (_VerifiableTransactio) {
	_inherits(AccountPropertiesEntityTypeTransaction, _VerifiableTransactio);

	function AccountPropertiesEntityTypeTransaction() {
		_classCallCheck(this, AccountPropertiesEntityTypeTransaction);

		return _possibleConstructorReturn(this, (AccountPropertiesEntityTypeTransaction.__proto__ || Object.getPrototypeOf(AccountPropertiesEntityTypeTransaction)).apply(this, arguments));
	}

	_createClass(AccountPropertiesEntityTypeTransaction, null, [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.fee = [0, 0];
					this.version = 36865;
					this.type = 0x4350;
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
							PropertyEntityTypeModificationBuffer.startPropertyEntityTypeModificationBuffer(builder);
							PropertyEntityTypeModificationBuffer.addModificationType(builder, modification.modificationType);
							PropertyEntityTypeModificationBuffer.addValue(builder, modification.value);
							modificationsArray.push(PropertyEntityTypeModificationBuffer.endPropertyEntityTypeModificationBuffer(builder));
						});

						// Create vectors
						var signatureVector = AccountPropertiesEntityTypeTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = AccountPropertiesEntityTypeTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = AccountPropertiesEntityTypeTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = AccountPropertiesEntityTypeTransactionBuffer.createFeeVector(builder, this.fee);
						var modificationVector = AccountPropertiesEntityTypeTransactionBuffer.createModificationsVector(builder, modificationsArray);

						AccountPropertiesEntityTypeTransactionBuffer.startAccountPropertiesEntityTypeTransactionBuffer(builder);
						AccountPropertiesEntityTypeTransactionBuffer.addSize(builder, 122 + 3 * this.modifications.length);
						AccountPropertiesEntityTypeTransactionBuffer.addSignature(builder, signatureVector);
						AccountPropertiesEntityTypeTransactionBuffer.addSigner(builder, signerVector);
						AccountPropertiesEntityTypeTransactionBuffer.addVersion(builder, this.version);
						AccountPropertiesEntityTypeTransactionBuffer.addType(builder, this.type);
						AccountPropertiesEntityTypeTransactionBuffer.addFee(builder, feeVector);
						AccountPropertiesEntityTypeTransactionBuffer.addDeadline(builder, deadlineVector);
						AccountPropertiesEntityTypeTransactionBuffer.addPropertyType(builder, this.propertyType);
						AccountPropertiesEntityTypeTransactionBuffer.addModificationCount(builder, this.modifications.length);
						AccountPropertiesEntityTypeTransactionBuffer.addModifications(builder, modificationVector);

						// Calculate size
						var codedAccountPropertiesAddress = AccountPropertiesEntityTypeTransactionBuffer.endAccountPropertiesEntityTypeTransactionBuffer(builder);
						builder.finish(codedAccountPropertiesAddress);

						var bytes = builder.asUint8Array();

						return new AccountPropertiesEntityTypeTransaction(bytes, _AccountPropertiesEntityTypeModificationTransactionSchema2.default);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return AccountPropertiesEntityTypeTransaction;
}(_VerifiableTransaction2.default);

exports.default = AccountPropertiesEntityTypeTransaction;
//# sourceMappingURL=AccountPropertiesEntityTypeTransaction.js.map