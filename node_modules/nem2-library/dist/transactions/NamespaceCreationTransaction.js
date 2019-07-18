'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _NamespaceCreationTransactionSchema = require('../schema/NamespaceCreationTransactionSchema');

var _NamespaceCreationTransactionSchema2 = _interopRequireDefault(_NamespaceCreationTransactionSchema);

var _convert = require('../coders/convert');

var _convert2 = _interopRequireDefault(_convert);

var _NamespaceCreationTransactionBuffer = require('../buffers/NamespaceCreationTransactionBuffer');

var NamespaceCreationTransactionBufferPackage = _interopRequireWildcard(_NamespaceCreationTransactionBuffer);

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
 * @module transactions/NamespaceCreationTransaction
 */


var NamespaceCreationTransactionBuffer = NamespaceCreationTransactionBufferPackage.default.Buffers.NamespaceCreationTransactionBuffer;

var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

var NamespaceCreationTransaction = function (_VerifiableTransactio) {
	_inherits(NamespaceCreationTransaction, _VerifiableTransactio);

	function NamespaceCreationTransaction() {
		_classCallCheck(this, NamespaceCreationTransaction);

		return _possibleConstructorReturn(this, (NamespaceCreationTransaction.__proto__ || Object.getPrototypeOf(NamespaceCreationTransaction)).apply(this, arguments));
	}

	_createClass(NamespaceCreationTransaction, null, [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.fee = [0, 0];
					this.version = 36867;
					this.type = 0x414e;
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
					key: 'addNamespaceType',
					value: function addNamespaceType(namespaceType) {
						this.namespaceType = namespaceType;
						return this;
					}
				}, {
					key: 'addDuration',
					value: function addDuration(duration) {
						this.duration = duration;
						return this;
					}
				}, {
					key: 'addParentId',
					value: function addParentId(parentId) {
						this.parentId = parentId;
						return this;
					}
				}, {
					key: 'addNamespaceId',
					value: function addNamespaceId(namespaceId) {
						this.namespaceId = namespaceId;
						return this;
					}
				}, {
					key: 'addNamespaceName',
					value: function addNamespaceName(namespaceName) {
						this.namespaceName = namespaceName;
						return this;
					}
				}, {
					key: 'build',
					value: function build() {
						var builder = new flatbuffers.Builder(1);

						var namespaceNameLength = _convert2.default.utf8ToHex(this.namespaceName).length / 2;

						// create vectors
						var signatureVector = NamespaceCreationTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = NamespaceCreationTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = NamespaceCreationTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = NamespaceCreationTransactionBuffer.createFeeVector(builder, this.fee);
						var parentIdVector = 1 === this.namespaceType ? this.parentId : this.duration;
						var durationParentIdVector = NamespaceCreationTransactionBuffer.createDurationParentIdVector(builder, parentIdVector);
						var namespaceIdVector = NamespaceCreationTransactionBuffer.createNamespaceIdVector(builder, this.namespaceId);

						var name = builder.createString(this.namespaceName);

						NamespaceCreationTransactionBuffer.startNamespaceCreationTransactionBuffer(builder);
						NamespaceCreationTransactionBuffer.addSize(builder, 138 + namespaceNameLength);
						NamespaceCreationTransactionBuffer.addSignature(builder, signatureVector);
						NamespaceCreationTransactionBuffer.addSigner(builder, signerVector);
						NamespaceCreationTransactionBuffer.addVersion(builder, this.version);
						NamespaceCreationTransactionBuffer.addType(builder, this.type);
						NamespaceCreationTransactionBuffer.addFee(builder, feeVector);
						NamespaceCreationTransactionBuffer.addDeadline(builder, deadlineVector);
						NamespaceCreationTransactionBuffer.addNamespaceType(builder, this.namespaceType);
						NamespaceCreationTransactionBuffer.addDurationParentId(builder, durationParentIdVector);
						NamespaceCreationTransactionBuffer.addNamespaceId(builder, namespaceIdVector);
						NamespaceCreationTransactionBuffer.addNamespaceNameSize(builder, namespaceNameLength);
						NamespaceCreationTransactionBuffer.addNamespaceName(builder, name);

						// Calculate size
						var codedNamespace = NamespaceCreationTransactionBuffer.endNamespaceCreationTransactionBuffer(builder);
						builder.finish(codedNamespace);

						var bytes = builder.asUint8Array();
						return new NamespaceCreationTransaction(bytes, _NamespaceCreationTransactionSchema2.default);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return NamespaceCreationTransaction;
}(_VerifiableTransaction2.default);

exports.default = NamespaceCreationTransaction;
//# sourceMappingURL=NamespaceCreationTransaction.js.map