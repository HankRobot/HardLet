"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const nem2_library_1 = require("nem2-library");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const NetworkType_1 = require("../model/blockchain/NetworkType");
const Http_1 = require("./Http");
/**
 * Network http repository.
 *
 * @since 1.0
 */
class NetworkHttp extends Http_1.Http {
    /**
     * Constructor
     * @param url
     */
    constructor(url) {
        super(url);
        this.networkRoutesApi = new nem2_library_1.NetworkRoutesApi(this.apiClient);
    }
    /**
     * Get current network type.
     *
     * @return network type enum.
     */
    getNetworkType() {
        return rxjs_1.from(this.networkRoutesApi.getNetworkType()).pipe(operators_1.map((networkTypeDTO) => {
            if (networkTypeDTO.name === 'mijinTest') {
                return NetworkType_1.NetworkType.MIJIN_TEST;
            }
            else {
                throw new Error('network ' + networkTypeDTO.name + ' is not supported yet by the sdk');
            }
        }));
    }
}
exports.NetworkHttp = NetworkHttp;
//# sourceMappingURL=NetworkHttp.js.map