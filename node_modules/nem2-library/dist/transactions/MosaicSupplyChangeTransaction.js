'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VerifiableTransaction = require('./VerifiableTransaction');

var _VerifiableTransaction2 = _interopRequireDefault(_VerifiableTransaction);

var _MosaicSupplyChangeTransactionSchema = require('../schema/MosaicSupplyChangeTransactionSchema');

var _MosaicSupplyChangeTransactionSchema2 = _interopRequireDefault(_MosaicSupplyChangeTransactionSchema);

var _MosaicSupplyChangeTransactionBuffer = require('../buffers/MosaicSupplyChangeTransactionBuffer');

var _MosaicSupplyChangeTransactionBuffer2 = _interopRequireDefault(_MosaicSupplyChangeTransactionBuffer);

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

var MosaicSupplyChangeTransactionBuffer = _MosaicSupplyChangeTransactionBuffer2.default.Buffers.MosaicSupplyChangeTransactionBuffer;

var _require = require('flatbuffers'),
    flatbuffers = _require.flatbuffers;

/**
 * @module transactions/MosaicSupplyChangeTransaction
 */


var MosaicSupplyChangeTransaction = function (_VerifiableTransactio) {
	_inherits(MosaicSupplyChangeTransaction, _VerifiableTransactio);

	function MosaicSupplyChangeTransaction() {
		_classCallCheck(this, MosaicSupplyChangeTransaction);

		return _possibleConstructorReturn(this, (MosaicSupplyChangeTransaction.__proto__ || Object.getPrototypeOf(MosaicSupplyChangeTransaction)).apply(this, arguments));
	}

	_createClass(MosaicSupplyChangeTransaction, null, [{
		key: 'Builder',
		get: function get() {
			var Builder = function () {
				function Builder() {
					_classCallCheck(this, Builder);

					this.fee = [0, 0];
					this.version = 36867;
					this.type = 0x424d;
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
					key: 'addDirection',
					value: function addDirection(direction) {
						this.direction = direction;
						return this;
					}
				}, {
					key: 'addDelta',
					value: function addDelta(delta) {
						this.delta = delta;
						return this;
					}
				}, {
					key: 'build',
					value: function build() {
						var builder = new flatbuffers.Builder(1);

						// Create vectors
						var signatureVector = MosaicSupplyChangeTransactionBuffer.createSignatureVector(builder, Array.apply(undefined, _toConsumableArray(Array(64))).map(Number.prototype.valueOf, 0));
						var signerVector = MosaicSupplyChangeTransactionBuffer.createSignerVector(builder, Array.apply(undefined, _toConsumableArray(Array(32))).map(Number.prototype.valueOf, 0));
						var deadlineVector = MosaicSupplyChangeTransactionBuffer.createDeadlineVector(builder, this.deadline);
						var feeVector = MosaicSupplyChangeTransactionBuffer.createFeeVector(builder, this.fee);
						var mosaicIdVector = MosaicSupplyChangeTransactionBuffer.createFeeVector(builder, this.mosaicId);
						var deltaVector = MosaicSupplyChangeTransactionBuffer.createFeeVector(builder, this.delta);

						MosaicSupplyChangeTransactionBuffer.startMosaicSupplyChangeTransactionBuffer(builder);
						MosaicSupplyChangeTransactionBuffer.addSize(builder, 137);
						MosaicSupplyChangeTransactionBuffer.addSignature(builder, signatureVector);
						MosaicSupplyChangeTransactionBuffer.addSigner(builder, signerVector);
						MosaicSupplyChangeTransactionBuffer.addVersion(builder, this.version);
						MosaicSupplyChangeTransactionBuffer.addType(builder, this.type);
						MosaicSupplyChangeTransactionBuffer.addFee(builder, feeVector);
						MosaicSupplyChangeTransactionBuffer.addDeadline(builder, deadlineVector);
						MosaicSupplyChangeTransactionBuffer.addMosaicId(builder, mosaicIdVector);
						MosaicSupplyChangeTransactionBuffer.addDirection(builder, this.direction);
						MosaicSupplyChangeTransactionBuffer.addDelta(builder, deltaVector);

						// Calculate size
						var codedMosaicChangeSupply = MosaicSupplyChangeTransactionBuffer.endMosaicSupplyChangeTransactionBuffer(builder);
						builder.finish(codedMosaicChangeSupply);

						var bytes = builder.asUint8Array();
						return new MosaicSupplyChangeTransaction(bytes, _MosaicSupplyChangeTransactionSchema2.default);
					}
				}]);

				return Builder;
			}();

			return Builder;
		}
	}]);

	return MosaicSupplyChangeTransaction;
}(_VerifiableTransaction2.default);

exports.default = MosaicSupplyChangeTransaction;
//# sourceMappingURL=MosaicSupplyChangeTransaction.js.map