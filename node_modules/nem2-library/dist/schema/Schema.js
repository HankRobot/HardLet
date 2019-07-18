'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.ubyte = ubyte;
exports.byte = byte;
exports.ushort = ushort;
exports.short = short;
exports.uint = uint;
exports.int = int;
exports.array = array;
exports.string = string;
exports.table = table;
exports.tableArray = tableArray;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/* eslint-disable no-use-before-define */

/**
 * In bytes
 * @type {{BYTE: number, SHORT: number, INT: number}}
 */
var TypeSize = exports.TypeSize = {
	BYTE: 1,
	SHORT: 2,
	INT: 4
};

/**
 * @param {string} name Attribute name
 * @returns {ScalarAttribute} return ScalarAttribute Instance
 */
function ubyte(name) {
	return new ScalarAttribute(name, TypeSize.BYTE);
}

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
function byte(name) {
	return new ScalarAttribute(name, TypeSize.BYTE);
}

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
function ushort(name) {
	return new ScalarAttribute(name, TypeSize.SHORT);
}

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
function short(name) {
	return new ScalarAttribute(name, TypeSize.SHORT);
}

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
function uint(name) {
	return new ScalarAttribute(name, TypeSize.INT);
}

/**
 *
 * @param {string} name Attribute Name
 * @returns {ScalarAttribute} ScalarAttribute Instance
 */
function int(name) {
	return new ScalarAttribute(name, TypeSize.INT);
}

/**
 *
 * @param {string} name Attribute Name
 * @param {number} typeSize Attribute Byte Size
 * @returns {ArrayAttribute} ArrayAttribute Instance
 */
function array(name) {
	var typeSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeSize.BYTE;

	return new ArrayAttribute(name, typeSize);
}

/**
 *
 * @param {string} name Attribute Name
 * @returns {ArrayAttribute} ArrayAttribute Instance
 */
function string(name) {
	return array(name);
}

/**
 *
 * @param {string} name Attribute Name
 * @param {module:schema/Schema} schema Table Specific Schema definition
 * @returns {TableAttribute} TableAttribute Instance
 */
function table(name, schema) {
	return new TableAttribute(name, schema);
}

/**
 *
 * @param {string} name Attribute Name
 * @param {module:schema/Schema} schema Schema Definition
 * @returns {TableArrayAttribute} TableAttribute Instance
 */
function tableArray(name, schema) {
	return new TableArrayAttribute(name, schema);
}

/* eslint-disable */
var readInt32 = function readInt32(offset, bytes) {
	return bytes[offset] | bytes[offset + 1] << 8 | bytes[offset + 2] << 16 | bytes[offset + 3] << 24;
};

var readInt16 = function readInt16(offset, bytes) {
	return bytes[offset] | bytes[offset + 1] << 8;
};

// region flatbuffers region
var __offset = function __offset(val0, fieldPos, bytes) {
	var vtable = val0 - readInt32(val0, bytes);
	return fieldPos < readInt16(vtable, bytes) ? readInt16(vtable + fieldPos, bytes) : 0;
};

var __vector_length = function __vector_length(offset, bytes) {
	return readInt32(offset + readInt32(offset, bytes), bytes);
};

var __indirect = function __indirect(offset, bytes) {
	return offset + readInt32(offset, bytes);
};

var __vector = function __vector(offset, bytes) {
	return offset + readInt32(offset, bytes) + 4;
};

var findVector = function findVector(val0, fieldPos, bytes, size) {
	var offset = __offset(val0, fieldPos, bytes);
	var offsetLong = offset + val0;
	var vecStart = __vector(offsetLong, bytes);
	var vecLength = __vector_length(offsetLong, bytes) * (size ? size : 1);
	return offset ? bytes.slice(vecStart, vecStart + vecLength) : 0;
};

var findParam = function findParam(val0, fieldPos, bytes, numBytes) {
	var offset = __offset(val0, fieldPos, bytes);
	return offset ? bytes.slice(offset + val0, offset + val0 + numBytes) : 0;
};

var findObjectStartPosition = function findObjectStartPosition(val0, fieldPos, bytes) {
	var offset = __offset(val0, fieldPos, bytes);
	return __indirect(offset + val0, bytes);
};

var findArrayLength = function findArrayLength(val0, fieldPos, bytes) {
	var offset = __offset(val0, fieldPos, bytes);
	return offset ? __vector_length(val0 + offset, bytes) : 0;
};

var findObjectArrayElementStartPosition = function findObjectArrayElementStartPosition(val0, fieldPos, bytes, index) {
	var offset = __offset(val0, fieldPos, bytes);
	var vector = __vector(val0 + offset, bytes);
	return __indirect(vector + index * 4, bytes);
};
// endregion

/**
 * Schema
 * @module schema/Schema
 */

var Schema = exports.Schema = function () {
	/**
  * @constructor
  * @param {Array.<Attribute>} schemaDefinition Schema Definition
  */
	function Schema(schemaDefinition) {
		_classCallCheck(this, Schema);

		this.schemaDefinition = schemaDefinition;
	}

	/**
  *
  * @param {Uint8Array} bytes flatbuffers bytes
  * @returns {Uint8Array} catapult buffer
  */


	_createClass(Schema, [{
		key: 'serialize',
		value: function serialize(bytes) {
			var i = 0;
			var resultBytes = [];
			while (i < this.schemaDefinition.length) {
				resultBytes = resultBytes.concat(this.schemaDefinition[i].serialize(bytes, 4 + i * 2));
				i++;
			}
			return resultBytes;
		}

		/**
   * @param {Uint8Array} bytes flatbuffer bytes
   * @returns {Array} Array with field name + payload
   */

	}, {
		key: 'debugSerialize',
		value: function debugSerialize(bytes) {
			var i = 0;
			var result = [];
			while (i < this.schemaDefinition.length) {
				result = result.concat({
					name: this.schemaDefinition[i].name,
					bytes: this.schemaDefinition[i].debugSerialize(bytes, 4 + i * 2)
				});
				i++;
			}
			return result;
		}
	}]);

	return Schema;
}();

var Attribute = function () {
	/**
  * @constructor
  * @param {string} name schema attribute name
  */
	function Attribute(name) {
		_classCallCheck(this, Attribute);

		this.name = name;
	}

	/**
  *
  * @param {Uint8Array} buffer flatbuffer bytes
  * @param {number} position attribute possition in flatbuffer bytes
  * @param {number} val0 position in case that it is an inner object
  */


	_createClass(Attribute, [{
		key: 'serialize',
		value: function serialize(buffer, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			throw new Error('Unimplemented method');
		}

		/**
   * @suppress warnings
   * @param {Uint8Array} buffer buffer flatbuffer bytes
   * @param {number} position attribute possition in flatbuffer bytes
   * @param {number} val0 position in case that it is an inner object
   */

	}, {
		key: 'debugSerialize',
		value: function debugSerialize(buffer, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			throw new Error('Unimplemented method');
		}
	}]);

	return Attribute;
}();

var ScalarAttribute = function (_Attribute) {
	_inherits(ScalarAttribute, _Attribute);

	/**
  * @constructor
  * @param {string} name schema attribute name
  * @param {number} typeSize
  */
	function ScalarAttribute(name, typeSize) {
		_classCallCheck(this, ScalarAttribute);

		var _this = _possibleConstructorReturn(this, (ScalarAttribute.__proto__ || Object.getPrototypeOf(ScalarAttribute)).call(this, name));

		_this.typeSize = typeSize;
		return _this;
	}

	_createClass(ScalarAttribute, [{
		key: 'serialize',
		value: function serialize(buffer, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			return findParam(val0 ? val0 : buffer[0], position, buffer, this.typeSize);
		}
	}, {
		key: 'debugSerialize',
		value: function debugSerialize(buffer, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			return {
				name: this.name,
				bytes: this.serialize(buffer, position, val0)
			};
		}
	}]);

	return ScalarAttribute;
}(Attribute);

var ArrayAttribute = function (_Attribute2) {
	_inherits(ArrayAttribute, _Attribute2);

	/**
  * @constructor
  * @param name - {string}
  * @param typeSize - {TypeSize}
  */
	function ArrayAttribute(name, typeSize) {
		_classCallCheck(this, ArrayAttribute);

		var _this2 = _possibleConstructorReturn(this, (ArrayAttribute.__proto__ || Object.getPrototypeOf(ArrayAttribute)).call(this, name));

		_this2.typeSize = typeSize;
		return _this2;
	}

	_createClass(ArrayAttribute, [{
		key: 'serialize',
		value: function serialize(buffer, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			return findVector(val0 ? val0 : buffer[0], position, buffer, this.typeSize);
		}
	}, {
		key: 'debugSerialize',
		value: function debugSerialize(buffer, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			return {
				name: this.name,
				bytes: this.serialize(buffer, position, val0)
			};
		}
	}]);

	return ArrayAttribute;
}(Attribute);

var TableAttribute = function (_Attribute3) {
	_inherits(TableAttribute, _Attribute3);

	/**
  *
  * @param {string} name
  * @param {module:schema/Schema} schema
  */
	function TableAttribute(name, schema) {
		_classCallCheck(this, TableAttribute);

		var _this3 = _possibleConstructorReturn(this, (TableAttribute.__proto__ || Object.getPrototypeOf(TableAttribute)).call(this, name));

		_this3.schema = schema;
		return _this3;
	}

	_createClass(TableAttribute, [{
		key: 'serialize',
		value: function serialize(bytes, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			var result = [];
			var messageStartPosition = findObjectStartPosition(val0 ? val0 : bytes[0], position, bytes);
			var i = 0;
			while (i < this.schema.length) {
				result = result.concat(this.schema[i].serialize(bytes, 4 + i * 2, messageStartPosition));
				i++;
			}
			return result;
		}
	}, {
		key: 'debugSerialize',
		value: function debugSerialize(buffer, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			return {
				name: this.name,
				bytes: this.serialize(buffer, position, val0)
			};
		}
	}]);

	return TableAttribute;
}(Attribute);

var TableArrayAttribute = function (_Attribute4) {
	_inherits(TableArrayAttribute, _Attribute4);

	/**
  * @constructor
  * @param {string} name
  * @param {module:schema/Schema} schema
  */
	function TableArrayAttribute(name, schema) {
		_classCallCheck(this, TableArrayAttribute);

		var _this4 = _possibleConstructorReturn(this, (TableArrayAttribute.__proto__ || Object.getPrototypeOf(TableArrayAttribute)).call(this, name));

		_this4.schema = schema;
		return _this4;
	}

	_createClass(TableArrayAttribute, [{
		key: 'serialize',
		value: function serialize(bytes, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			var result = [];
			var arrayLength = findArrayLength(val0 ? val0 : bytes[0], position, bytes);
			var i = 0;
			while (i < arrayLength) {
				var startArrayPosition = findObjectArrayElementStartPosition(val0 ? val0 : bytes[0], position, bytes, i);
				for (var j = 0; j < this.schema.length; ++j) {
					result = result.concat(this.schema[j].serialize(bytes, 4 + j * 2, startArrayPosition));
				}
				i++;
			}
			return result;
		}
	}, {
		key: 'debugSerialize',
		value: function debugSerialize(buffer, position) {
			var val0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

			return {
				name: this.name,
				bytes: this.serialize(buffer, position, val0)
			};
		}
	}]);

	return TableArrayAttribute;
}(Attribute);
//# sourceMappingURL=Schema.js.map