'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _AddressAliasTransactionSchema = require('../schema/AddressAliasTransactionSchema');

var _AddressAliasTransactionSchema2 = _interopRequireDefault(_AddressAliasTransactionSchema);

var _AddressAliasTransactionBuffer = require('../buffers/AddressAliasTransactionBuffer');

var _AddressAliasTransactionBuffer2 = _interopRequireDefault(_AddressAliasTransactionBuffer);

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

var AddressAliasTransactionBuffer = _AddressAliasTransactionBuffer2.default.Buffers.AddressAliasTransactionBuffer;

var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

var addressEncoder = require('../coders/address').default;

/**
 * @module transactions/AddressAliasTransaction
 */

var AddressAliasTransaction = function (_VerifiableTransactio) {
	_inherits(AddressAliasTransaction, _VerifiableTransactio);

	function AddressAliasTransaction() {
		_classCallCheck(this, AddressAliasTransaction);

		return _possibleConstructorReturn(this, (AddressAliasTransaction.__proto__ || Object.getPrototypeOf(AddressAliasTransaction)).apply(this, arguments));
	}

	_createClass(AddressAliasTransaction, null, [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.fee = [0, 0];
					this.version = 36865;
					this.type = 0x424E;
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
					key: 'addActionType',
					value: function addActionType(actionType) {
						this.actionType = actionType;
						return this;
					}
				}, {
					key: 'addNamespaceId',
					value: function addNamespaceId(namespaceId) {
						this.namespaceId = namespaceId;
						return this;
					}
				}, {
					key: 'addAddress',
					value: function addAddress(address) {
						this.address = addressEncoder.stringToAddress(address);
						return this;
					}
				}, {
					key: 'build',
					value: function build() {
						var builder = new flatbuffers.Builder(1);

						// Create vectors
						var signatureVector = AddressAliasTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = AddressAliasTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = AddressAliasTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = AddressAliasTransactionBuffer.createFeeVector(builder, this.fee);
						var namespaceIdVector = AddressAliasTransactionBuffer.createNamespaceIdVector(builder, this.namespaceId);
						var addressVector = AddressAliasTransactionBuffer.createAddressVector(builder, this.address);

						AddressAliasTransactionBuffer.startAddressAliasTransactionBuffer(builder);
						AddressAliasTransactionBuffer.addSize(builder, 154);
						AddressAliasTransactionBuffer.addSignature(builder, signatureVector);
						AddressAliasTransactionBuffer.addSigner(builder, signerVector);
						AddressAliasTransactionBuffer.addVersion(builder, this.version);
						AddressAliasTransactionBuffer.addType(builder, this.type);
						AddressAliasTransactionBuffer.addFee(builder, feeVector);
						AddressAliasTransactionBuffer.addDeadline(builder, deadlineVector);
						AddressAliasTransactionBuffer.addActionType(builder, this.actionType);
						AddressAliasTransactionBuffer.addNamespaceId(builder, namespaceIdVector);
						AddressAliasTransactionBuffer.addAddress(builder, addressVector);

						// Calculate size
						var codedMosaicChangeSupply = AddressAliasTransactionBuffer.endAddressAliasTransactionBuffer(builder);
						builder.finish(codedMosaicChangeSupply);

						var bytes = builder.asUint8Array();

						return new AddressAliasTransaction(bytes, _AddressAliasTransactionSchema2.default);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return AddressAliasTransaction;
}(_VerifiableTransaction2.default);

exports.default = AddressAliasTransaction;
//# sourceMappingURL=AddressAliasTransaction.js.map