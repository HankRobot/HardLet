'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsSha = require('js-sha3');

var _uint = require('../coders/uint64');

var _uint2 = _interopRequireDefault(_uint);

var _convert = require('../coders/convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constants = {
	namespace_base_id: [0, 0],
	namespace_max_depth: 3,
	name_pattern: /^[a-z0-9][a-z0-9-_]*$/
}; /*
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

var generateNamespaceId = function generateNamespaceId(parentId, name) {
	var hash = _jsSha.sha3_256.create();
	hash.update(Uint32Array.from(parentId).buffer);
	hash.update(name);
	var result = new Uint32Array(hash.arrayBuffer());
	// right zero-filling required to keep unsigned number representation
	return [result[0], (result[1] | 0x80000000) >>> 0];
};

function throwInvalidFqn(reason, name) {
	throw Error('fully qualified id is invalid due to ' + reason + ' (' + name + ')');
}

function extractPartName(name, start, size) {
	if (0 === size) throwInvalidFqn('empty part', name);

	var partName = name.substr(start, size);
	if (!constants.name_pattern.test(partName)) throwInvalidFqn('invalid part name [' + partName + ']', name);

	return partName;
}

function append(path, id, name) {
	if (constants.namespace_max_depth === path.length) throwInvalidFqn('too many parts', name);

	path.push(id);
}

function split(name, processor) {
	var start = 0;
	for (var index = 0; index < name.length; ++index) {
		if ('.' === name[index]) {
			processor(start, index - start);
			start = index + 1;
		}
	}

	return start;
}

/** @exports coders/idGenerator */
var idGenerator = {
	/**
  * Generates a mosaic id given a nonce and a public id.
  * @param {object} nonce The mosaic nonce.
  * @param {object} name The public id.
  * @returns {module:coders/uint64~uint64} The mosaic id.
  */
	generateMosaicId: function generateMosaicId(nonce, ownerPublicId) {
		var hash = _jsSha.sha3_256.create();
		hash.update(nonce);
		hash.update(ownerPublicId);
		var result = new Uint32Array(hash.arrayBuffer());
		return [result[0], result[1] & 0x7FFFFFFF];
	},

	/**
  * Parses a unified namespace name into a path.
  * @param {string} name The unified namespace name.
  * @returns {array<module:coders/uint64~uint64>} The namespace path.
  */
	generateNamespacePath: function generateNamespacePath(name) {
		if (0 >= name.length) throwInvalidFqn('having zero length', name);

		var namespaceId = constants.namespace_base_id;
		var path = [];
		var start = split(name, function (substringStart, size) {
			namespaceId = generateNamespaceId(namespaceId, extractPartName(name, substringStart, size));
			append(path, namespaceId, name);
		});

		namespaceId = generateNamespaceId(namespaceId, extractPartName(name, start, name.length - start));
		append(path, namespaceId, name);
		return path;
	}
};

exports.default = idGenerator;
//# sourceMappingURL=idGenerator.js.map