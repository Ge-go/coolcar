import * as $protobuf from "protobufjs";
// Common aliases
const $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const coolcar = $root.coolcar = (() => {

    /**
     * Namespace coolcar.
     * @exports coolcar
     * @namespace
     */
    const coolcar = {};

    coolcar.Location = (function() {

        /**
         * Properties of a Location.
         * @memberof coolcar
         * @interface ILocation
         * @property {number|null} [latitude] Location latitude
         * @property {number|null} [longitude] Location longitude
         */

        /**
         * Constructs a new Location.
         * @memberof coolcar
         * @classdesc Represents a Location.
         * @implements ILocation
         * @constructor
         * @param {coolcar.ILocation=} [properties] Properties to set
         */
        function Location(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Location latitude.
         * @member {number} latitude
         * @memberof coolcar.Location
         * @instance
         */
        Location.prototype.latitude = 0;

        /**
         * Location longitude.
         * @member {number} longitude
         * @memberof coolcar.Location
         * @instance
         */
        Location.prototype.longitude = 0;

        /**
         * Decodes a Location message from the specified reader or buffer.
         * @function decode
         * @memberof coolcar.Location
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {coolcar.Location} Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Location.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.coolcar.Location();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.latitude = reader.double();
                    break;
                case 2:
                    message.longitude = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof coolcar.Location
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {coolcar.Location} Location
         */
        Location.fromObject = function fromObject(object) {
            if (object instanceof $root.coolcar.Location)
                return object;
            let message = new $root.coolcar.Location();
            if (object.latitude != null)
                message.latitude = Number(object.latitude);
            if (object.longitude != null)
                message.longitude = Number(object.longitude);
            return message;
        };

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @function toObject
         * @memberof coolcar.Location
         * @static
         * @param {coolcar.Location} message Location
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Location.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.latitude = 0;
                object.longitude = 0;
            }
            if (message.latitude != null && message.hasOwnProperty("latitude"))
                object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
            if (message.longitude != null && message.hasOwnProperty("longitude"))
                object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
            return object;
        };

        /**
         * Converts this Location to JSON.
         * @function toJSON
         * @memberof coolcar.Location
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Location.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Location;
    })();

    /**
     * TripStatus enum.
     * @name coolcar.TripStatus
     * @enum {number}
     * @property {number} TS_NOT_SPECIFIED=0 TS_NOT_SPECIFIED value
     * @property {number} NOT_STARTED=1 NOT_STARTED value
     * @property {number} IN_PROGRESS=2 IN_PROGRESS value
     * @property {number} FINISHED=3 FINISHED value
     * @property {number} PAID=4 PAID value
     */
    coolcar.TripStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "TS_NOT_SPECIFIED"] = 0;
        values[valuesById[1] = "NOT_STARTED"] = 1;
        values[valuesById[2] = "IN_PROGRESS"] = 2;
        values[valuesById[3] = "FINISHED"] = 3;
        values[valuesById[4] = "PAID"] = 4;
        return values;
    })();

    coolcar.Trip = (function() {

        /**
         * Properties of a Trip.
         * @memberof coolcar
         * @interface ITrip
         * @property {string|null} [start] Trip start
         * @property {coolcar.ILocation|null} [startPos] Trip startPos
         * @property {Array.<coolcar.ILocation>|null} [pathPos] Trip pathPos
         * @property {string|null} [end] Trip end
         * @property {number|null} [durationSec] Trip durationSec
         * @property {number|null} [feeCent] Trip feeCent
         * @property {coolcar.TripStatus|null} [status] Trip status
         */

        /**
         * Constructs a new Trip.
         * @memberof coolcar
         * @classdesc Represents a Trip.
         * @implements ITrip
         * @constructor
         * @param {coolcar.ITrip=} [properties] Properties to set
         */
        function Trip(properties) {
            this.pathPos = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Trip start.
         * @member {string} start
         * @memberof coolcar.Trip
         * @instance
         */
        Trip.prototype.start = "";

        /**
         * Trip startPos.
         * @member {coolcar.ILocation|null|undefined} startPos
         * @memberof coolcar.Trip
         * @instance
         */
        Trip.prototype.startPos = null;

        /**
         * Trip pathPos.
         * @member {Array.<coolcar.ILocation>} pathPos
         * @memberof coolcar.Trip
         * @instance
         */
        Trip.prototype.pathPos = $util.emptyArray;

        /**
         * Trip end.
         * @member {string} end
         * @memberof coolcar.Trip
         * @instance
         */
        Trip.prototype.end = "";

        /**
         * Trip durationSec.
         * @member {number} durationSec
         * @memberof coolcar.Trip
         * @instance
         */
        Trip.prototype.durationSec = 0;

        /**
         * Trip feeCent.
         * @member {number} feeCent
         * @memberof coolcar.Trip
         * @instance
         */
        Trip.prototype.feeCent = 0;

        /**
         * Trip status.
         * @member {coolcar.TripStatus} status
         * @memberof coolcar.Trip
         * @instance
         */
        Trip.prototype.status = 0;

        /**
         * Decodes a Trip message from the specified reader or buffer.
         * @function decode
         * @memberof coolcar.Trip
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {coolcar.Trip} Trip
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Trip.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.coolcar.Trip();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.start = reader.string();
                    break;
                case 5:
                    message.startPos = $root.coolcar.Location.decode(reader, reader.uint32());
                    break;
                case 6:
                    if (!(message.pathPos && message.pathPos.length))
                        message.pathPos = [];
                    message.pathPos.push($root.coolcar.Location.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.end = reader.string();
                    break;
                case 3:
                    message.durationSec = reader.int32();
                    break;
                case 4:
                    message.feeCent = reader.int32();
                    break;
                case 7:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof coolcar.Trip
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {coolcar.Trip} Trip
         */
        Trip.fromObject = function fromObject(object) {
            if (object instanceof $root.coolcar.Trip)
                return object;
            let message = new $root.coolcar.Trip();
            if (object.start != null)
                message.start = String(object.start);
            if (object.startPos != null) {
                if (typeof object.startPos !== "object")
                    throw TypeError(".coolcar.Trip.startPos: object expected");
                message.startPos = $root.coolcar.Location.fromObject(object.startPos);
            }
            if (object.pathPos) {
                if (!Array.isArray(object.pathPos))
                    throw TypeError(".coolcar.Trip.pathPos: array expected");
                message.pathPos = [];
                for (let i = 0; i < object.pathPos.length; ++i) {
                    if (typeof object.pathPos[i] !== "object")
                        throw TypeError(".coolcar.Trip.pathPos: object expected");
                    message.pathPos[i] = $root.coolcar.Location.fromObject(object.pathPos[i]);
                }
            }
            if (object.end != null)
                message.end = String(object.end);
            if (object.durationSec != null)
                message.durationSec = object.durationSec | 0;
            if (object.feeCent != null)
                message.feeCent = object.feeCent | 0;
            switch (object.status) {
            case "TS_NOT_SPECIFIED":
            case 0:
                message.status = 0;
                break;
            case "NOT_STARTED":
            case 1:
                message.status = 1;
                break;
            case "IN_PROGRESS":
            case 2:
                message.status = 2;
                break;
            case "FINISHED":
            case 3:
                message.status = 3;
                break;
            case "PAID":
            case 4:
                message.status = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @function toObject
         * @memberof coolcar.Trip
         * @static
         * @param {coolcar.Trip} message Trip
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Trip.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.pathPos = [];
            if (options.defaults) {
                object.start = "";
                object.end = "";
                object.durationSec = 0;
                object.feeCent = 0;
                object.startPos = null;
                object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
            }
            if (message.start != null && message.hasOwnProperty("start"))
                object.start = message.start;
            if (message.end != null && message.hasOwnProperty("end"))
                object.end = message.end;
            if (message.durationSec != null && message.hasOwnProperty("durationSec"))
                object.durationSec = message.durationSec;
            if (message.feeCent != null && message.hasOwnProperty("feeCent"))
                object.feeCent = message.feeCent;
            if (message.startPos != null && message.hasOwnProperty("startPos"))
                object.startPos = $root.coolcar.Location.toObject(message.startPos, options);
            if (message.pathPos && message.pathPos.length) {
                object.pathPos = [];
                for (let j = 0; j < message.pathPos.length; ++j)
                    object.pathPos[j] = $root.coolcar.Location.toObject(message.pathPos[j], options);
            }
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.coolcar.TripStatus[message.status] : message.status;
            return object;
        };

        /**
         * Converts this Trip to JSON.
         * @function toJSON
         * @memberof coolcar.Trip
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Trip.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Trip;
    })();

    coolcar.TripService = (function() {

        /**
         * Constructs a new TripService service.
         * @memberof coolcar
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
         * Callback as used by {@link coolcar.TripService#getTrip}.
         * @memberof coolcar.TripService
         * @typedef GetTripCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {coolcar.GetTripRsp} [response] GetTripRsp
         */

        /**
         * Calls GetTrip.
         * @function getTrip
         * @memberof coolcar.TripService
         * @instance
         * @param {coolcar.IGetTripReq} request GetTripReq message or plain object
         * @param {coolcar.TripService.GetTripCallback} callback Node-style callback called with the error, if any, and GetTripRsp
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(TripService.prototype.getTrip = function getTrip(request, callback) {
            return this.rpcCall(getTrip, $root.coolcar.GetTripReq, $root.coolcar.GetTripRsp, request, callback);
        }, "name", { value: "GetTrip" });

        /**
         * Calls GetTrip.
         * @function getTrip
         * @memberof coolcar.TripService
         * @instance
         * @param {coolcar.IGetTripReq} request GetTripReq message or plain object
         * @returns {Promise<coolcar.GetTripRsp>} Promise
         * @variation 2
         */

        return TripService;
    })();

    coolcar.GetTripReq = (function() {

        /**
         * Properties of a GetTripReq.
         * @memberof coolcar
         * @interface IGetTripReq
         * @property {string|null} [id] GetTripReq id
         */

        /**
         * Constructs a new GetTripReq.
         * @memberof coolcar
         * @classdesc Represents a GetTripReq.
         * @implements IGetTripReq
         * @constructor
         * @param {coolcar.IGetTripReq=} [properties] Properties to set
         */
        function GetTripReq(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetTripReq id.
         * @member {string} id
         * @memberof coolcar.GetTripReq
         * @instance
         */
        GetTripReq.prototype.id = "";

        /**
         * Decodes a GetTripReq message from the specified reader or buffer.
         * @function decode
         * @memberof coolcar.GetTripReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {coolcar.GetTripReq} GetTripReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetTripReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.coolcar.GetTripReq();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a GetTripReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof coolcar.GetTripReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {coolcar.GetTripReq} GetTripReq
         */
        GetTripReq.fromObject = function fromObject(object) {
            if (object instanceof $root.coolcar.GetTripReq)
                return object;
            let message = new $root.coolcar.GetTripReq();
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a GetTripReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof coolcar.GetTripReq
         * @static
         * @param {coolcar.GetTripReq} message GetTripReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetTripReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.id = "";
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this GetTripReq to JSON.
         * @function toJSON
         * @memberof coolcar.GetTripReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetTripReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetTripReq;
    })();

    coolcar.GetTripRsp = (function() {

        /**
         * Properties of a GetTripRsp.
         * @memberof coolcar
         * @interface IGetTripRsp
         * @property {string|null} [id] GetTripRsp id
         * @property {coolcar.ITrip|null} [trip] GetTripRsp trip
         */

        /**
         * Constructs a new GetTripRsp.
         * @memberof coolcar
         * @classdesc Represents a GetTripRsp.
         * @implements IGetTripRsp
         * @constructor
         * @param {coolcar.IGetTripRsp=} [properties] Properties to set
         */
        function GetTripRsp(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetTripRsp id.
         * @member {string} id
         * @memberof coolcar.GetTripRsp
         * @instance
         */
        GetTripRsp.prototype.id = "";

        /**
         * GetTripRsp trip.
         * @member {coolcar.ITrip|null|undefined} trip
         * @memberof coolcar.GetTripRsp
         * @instance
         */
        GetTripRsp.prototype.trip = null;

        /**
         * Decodes a GetTripRsp message from the specified reader or buffer.
         * @function decode
         * @memberof coolcar.GetTripRsp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {coolcar.GetTripRsp} GetTripRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetTripRsp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.coolcar.GetTripRsp();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.trip = $root.coolcar.Trip.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a GetTripRsp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof coolcar.GetTripRsp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {coolcar.GetTripRsp} GetTripRsp
         */
        GetTripRsp.fromObject = function fromObject(object) {
            if (object instanceof $root.coolcar.GetTripRsp)
                return object;
            let message = new $root.coolcar.GetTripRsp();
            if (object.id != null)
                message.id = String(object.id);
            if (object.trip != null) {
                if (typeof object.trip !== "object")
                    throw TypeError(".coolcar.GetTripRsp.trip: object expected");
                message.trip = $root.coolcar.Trip.fromObject(object.trip);
            }
            return message;
        };

        /**
         * Creates a plain object from a GetTripRsp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof coolcar.GetTripRsp
         * @static
         * @param {coolcar.GetTripRsp} message GetTripRsp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetTripRsp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.trip = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.trip != null && message.hasOwnProperty("trip"))
                object.trip = $root.coolcar.Trip.toObject(message.trip, options);
            return object;
        };

        /**
         * Converts this GetTripRsp to JSON.
         * @function toJSON
         * @memberof coolcar.GetTripRsp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetTripRsp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GetTripRsp;
    })();

    return coolcar;
})();