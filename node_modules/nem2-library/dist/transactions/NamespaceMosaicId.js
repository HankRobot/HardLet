'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mosaicId = mosaicId;
exports.generateRandomMosaicNonce = generateRandomMosaicNonce;
exports.namespaceId = namespaceId;
exports.subnamespaceParentId = subnamespaceParentId;
exports.subnamespaceNamespaceId = subnamespaceNamespaceId;

var _idGenerator = require('../coders/idGenerator');

var _idGenerator2 = _interopRequireDefault(_idGenerator);

var _nacl_catapult = require('../crypto/nacl_catapult');

var _nacl_catapult2 = _interopRequireDefault(_nacl_catapult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function mosaicId(nonce, ownerPublicId) {
  return _idGenerator2.default.generateMosaicId(nonce, ownerPublicId);
}

function generateRandomMosaicNonce() {
  return _nacl_catapult2.default.randomBytes(4);
}

function namespaceId(namespaceName) {
  var path = _idGenerator2.default.generateNamespacePath(namespaceName);
  return path.length ? _idGenerator2.default.generateNamespacePath(namespaceName)[path.length - 1] : [];
}

function subnamespaceParentId(parentNamespaceName, namespaceName) {
  var path = _idGenerator2.default.generateNamespacePath(parentNamespaceName + '.' + namespaceName);
  return _idGenerator2.default.generateNamespacePath(parentNamespaceName)[path.length - 2];
}

function subnamespaceNamespaceId(parentNamespaceName, namespaceName) {
  var path = _idGenerator2.default.generateNamespacePath(parentNamespaceName + '.' + namespaceName);
  return path[path.length - 1];
}
//# sourceMappingURL=NamespaceMosaicId.js.map