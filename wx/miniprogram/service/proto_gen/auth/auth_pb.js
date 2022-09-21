import * as $protobuf from "protobufjs";
// Common aliases
const $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const auth = $root.auth = (() => {

    /**
     * Namespace auth.
     * @exports auth
     * @namespace
     */
    const auth = {};

    auth.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof auth
         * @namespace
         */
        const v1 = {};

        v1.LoginReq = (function() {

            /**
             * Properties of a LoginReq.
             * @memberof auth.v1
             * @interface ILoginReq
             * @property {string|null} [code] LoginReq code
             */

            /**
             * Constructs a new LoginReq.
             * @memberof auth.v1
             * @classdesc Represents a LoginReq.
             * @implements ILoginReq
             * @constructor
             * @param {auth.v1.ILoginReq=} [properties] Properties to set
             */
            function LoginReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginReq code.
             * @member {string} code
             * @memberof auth.v1.LoginReq
             * @instance
             */
            LoginReq.prototype.code = "";

            /**
             * Decodes a LoginReq message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.LoginReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.LoginReq} LoginReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.LoginReq();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.code = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.LoginReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.LoginReq} LoginReq
             */
            LoginReq.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.LoginReq)
                    return object;
                let message = new $root.auth.v1.LoginReq();
                if (object.code != null)
                    message.code = String(object.code);
                return message;
            };

            /**
             * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.LoginReq
             * @static
             * @param {auth.v1.LoginReq} message LoginReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.code = "";
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                return object;
            };

            /**
             * Converts this LoginReq to JSON.
             * @function toJSON
             * @memberof auth.v1.LoginReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginReq;
        })();

        v1.LoginRsp = (function() {

            /**
             * Properties of a LoginRsp.
             * @memberof auth.v1
             * @interface ILoginRsp
             * @property {string|null} [accessToken] LoginRsp accessToken
             * @property {number|null} [expiresIn] LoginRsp expiresIn
             */

            /**
             * Constructs a new LoginRsp.
             * @memberof auth.v1
             * @classdesc Represents a LoginRsp.
             * @implements ILoginRsp
             * @constructor
             * @param {auth.v1.ILoginRsp=} [properties] Properties to set
             */
            function LoginRsp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginRsp accessToken.
             * @member {string} accessToken
             * @memberof auth.v1.LoginRsp
             * @instance
             */
            LoginRsp.prototype.accessToken = "";

            /**
             * LoginRsp expiresIn.
             * @member {number} expiresIn
             * @memberof auth.v1.LoginRsp
             * @instance
             */
            LoginRsp.prototype.expiresIn = 0;

            /**
             * Decodes a LoginRsp message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.LoginRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.LoginRsp} LoginRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.LoginRsp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.accessToken = reader.string();
                        break;
                    case 2:
                        message.expiresIn = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a LoginRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.LoginRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.LoginRsp} LoginRsp
             */
            LoginRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.LoginRsp)
                    return object;
                let message = new $root.auth.v1.LoginRsp();
                if (object.accessToken != null)
                    message.accessToken = String(object.accessToken);
                if (object.expiresIn != null)
                    message.expiresIn = object.expiresIn | 0;
                return message;
            };

            /**
             * Creates a plain object from a LoginRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.LoginRsp
             * @static
             * @param {auth.v1.LoginRsp} message LoginRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginRsp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.accessToken = "";
                    object.expiresIn = 0;
                }
                if (message.accessToken != null && message.hasOwnProperty("accessToken"))
                    object.accessToken = message.accessToken;
                if (message.expiresIn != null && message.hasOwnProperty("expiresIn"))
                    object.expiresIn = message.expiresIn;
                return object;
            };

            /**
             * Converts this LoginRsp to JSON.
             * @function toJSON
             * @memberof auth.v1.LoginRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginRsp;
        })();

        v1.AuthService = (function() {

            /**
             * Constructs a new AuthService service.
             * @memberof auth.v1
             * @classdesc Represents an AuthService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function AuthService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (AuthService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = AuthService;

            /**
             * Callback as used by {@link auth.v1.AuthService#login}.
             * @memberof auth.v1.AuthService
             * @typedef LoginCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {auth.v1.LoginRsp} [response] LoginRsp
             */

            /**
             * Calls Login.
             * @function login
             * @memberof auth.v1.AuthService
             * @instance
             * @param {auth.v1.ILoginReq} request LoginReq message or plain object
             * @param {auth.v1.AuthService.LoginCallback} callback Node-style callback called with the error, if any, and LoginRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(AuthService.prototype.login = function login(request, callback) {
                return this.rpcCall(login, $root.auth.v1.LoginReq, $root.auth.v1.LoginRsp, request, callback);
            }, "name", { value: "Login" });

            /**
             * Calls Login.
             * @function login
             * @memberof auth.v1.AuthService
             * @instance
             * @param {auth.v1.ILoginReq} request LoginReq message or plain object
             * @returns {Promise<auth.v1.LoginRsp>} Promise
             * @variation 2
             */

            return AuthService;
        })();

        return v1;
    })();

    return auth;
})();