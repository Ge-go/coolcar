import * as $protobuf from "protobufjs";
// Common aliases
const $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rental = $root.rental = (() => {

    /**
     * Namespace rental.
     * @exports rental
     * @namespace
     */
    const rental = {};

    rental.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof rental
         * @namespace
         */
        const v1 = {};

        v1.CreateTripReq = (function() {

            /**
             * Properties of a CreateTripReq.
             * @memberof rental.v1
             * @interface ICreateTripReq
             * @property {string|null} [start] CreateTripReq start
             */

            /**
             * Constructs a new CreateTripReq.
             * @memberof rental.v1
             * @classdesc Represents a CreateTripReq.
             * @implements ICreateTripReq
             * @constructor
             * @param {rental.v1.ICreateTripReq=} [properties] Properties to set
             */
            function CreateTripReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateTripReq start.
             * @member {string} start
             * @memberof rental.v1.CreateTripReq
             * @instance
             */
            CreateTripReq.prototype.start = "";

            /**
             * Decodes a CreateTripReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.CreateTripReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.CreateTripReq} CreateTripReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateTripReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.CreateTripReq();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.start = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a CreateTripReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CreateTripReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CreateTripReq} CreateTripReq
             */
            CreateTripReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CreateTripReq)
                    return object;
                let message = new $root.rental.v1.CreateTripReq();
                if (object.start != null)
                    message.start = String(object.start);
                return message;
            };

            /**
             * Creates a plain object from a CreateTripReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CreateTripReq
             * @static
             * @param {rental.v1.CreateTripReq} message CreateTripReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateTripReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.start = "";
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = message.start;
                return object;
            };

            /**
             * Converts this CreateTripReq to JSON.
             * @function toJSON
             * @memberof rental.v1.CreateTripReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateTripReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateTripReq;
        })();

        v1.TripServiceRsp = (function() {

            /**
             * Properties of a TripServiceRsp.
             * @memberof rental.v1
             * @interface ITripServiceRsp
             */

            /**
             * Constructs a new TripServiceRsp.
             * @memberof rental.v1
             * @classdesc Represents a TripServiceRsp.
             * @implements ITripServiceRsp
             * @constructor
             * @param {rental.v1.ITripServiceRsp=} [properties] Properties to set
             */
            function TripServiceRsp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a TripServiceRsp message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.TripServiceRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.TripServiceRsp} TripServiceRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TripServiceRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.TripServiceRsp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a TripServiceRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.TripServiceRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.TripServiceRsp} TripServiceRsp
             */
            TripServiceRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.TripServiceRsp)
                    return object;
                return new $root.rental.v1.TripServiceRsp();
            };

            /**
             * Creates a plain object from a TripServiceRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.TripServiceRsp
             * @static
             * @param {rental.v1.TripServiceRsp} message TripServiceRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TripServiceRsp.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this TripServiceRsp to JSON.
             * @function toJSON
             * @memberof rental.v1.TripServiceRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TripServiceRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TripServiceRsp;
        })();

        v1.TripService = (function() {

            /**
             * Constructs a new TripService service.
             * @memberof rental.v1
             * @classdesc Represents a TripService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function TripService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (TripService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TripService;

            /**
             * Callback as used by {@link rental.v1.TripService#createTrip}.
             * @memberof rental.v1.TripService
             * @typedef CreateTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.TripServiceRsp} [response] TripServiceRsp
             */

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripReq} request CreateTripReq message or plain object
             * @param {rental.v1.TripService.CreateTripCallback} callback Node-style callback called with the error, if any, and TripServiceRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.createTrip = function createTrip(request, callback) {
                return this.rpcCall(createTrip, $root.rental.v1.CreateTripReq, $root.rental.v1.TripServiceRsp, request, callback);
            }, "name", { value: "CreateTrip" });

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripReq} request CreateTripReq message or plain object
             * @returns {Promise<rental.v1.TripServiceRsp>} Promise
             * @variation 2
             */

            return TripService;
        })();

        return v1;
    })();

    return rental;
})();