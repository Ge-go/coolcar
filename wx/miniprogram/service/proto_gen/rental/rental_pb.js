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

        v1.Location = (function() {

            /**
             * Properties of a Location.
             * @memberof rental.v1
             * @interface ILocation
             * @property {number|null} [latitude] Location latitude
             * @property {number|null} [longitude] Location longitude
             */

            /**
             * Constructs a new Location.
             * @memberof rental.v1
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {rental.v1.ILocation=} [properties] Properties to set
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
             * @memberof rental.v1.Location
             * @instance
             */
            Location.prototype.latitude = 0;

            /**
             * Location longitude.
             * @member {number} longitude
             * @memberof rental.v1.Location
             * @instance
             */
            Location.prototype.longitude = 0;

            /**
             * Decodes a Location message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.Location
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.Location} Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Location.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.Location();
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
             * @memberof rental.v1.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Location)
                    return object;
                let message = new $root.rental.v1.Location();
                if (object.latitude != null)
                    message.latitude = Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = Number(object.longitude);
                return message;
            };

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Location
             * @static
             * @param {rental.v1.Location} message Location
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
             * @memberof rental.v1.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Location;
        })();

        v1.LocationStatus = (function() {

            /**
             * Properties of a LocationStatus.
             * @memberof rental.v1
             * @interface ILocationStatus
             * @property {rental.v1.ILocation|null} [location] LocationStatus location
             * @property {number|null} [feeCent] LocationStatus feeCent
             * @property {number|null} [kmDriven] LocationStatus kmDriven
             * @property {string|null} [poiName] LocationStatus poiName
             * @property {number|null} [timestampSec] LocationStatus timestampSec
             */

            /**
             * Constructs a new LocationStatus.
             * @memberof rental.v1
             * @classdesc Represents a LocationStatus.
             * @implements ILocationStatus
             * @constructor
             * @param {rental.v1.ILocationStatus=} [properties] Properties to set
             */
            function LocationStatus(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LocationStatus location.
             * @member {rental.v1.ILocation|null|undefined} location
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.location = null;

            /**
             * LocationStatus feeCent.
             * @member {number} feeCent
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.feeCent = 0;

            /**
             * LocationStatus kmDriven.
             * @member {number} kmDriven
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.kmDriven = 0;

            /**
             * LocationStatus poiName.
             * @member {string} poiName
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.poiName = "";

            /**
             * LocationStatus timestampSec.
             * @member {number} timestampSec
             * @memberof rental.v1.LocationStatus
             * @instance
             */
            LocationStatus.prototype.timestampSec = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Decodes a LocationStatus message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.LocationStatus} LocationStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LocationStatus.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.LocationStatus();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.location = $root.rental.v1.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.feeCent = reader.int32();
                        break;
                    case 3:
                        message.kmDriven = reader.double();
                        break;
                    case 4:
                        message.poiName = reader.string();
                        break;
                    case 5:
                        message.timestampSec = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a LocationStatus message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.LocationStatus} LocationStatus
             */
            LocationStatus.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.LocationStatus)
                    return object;
                let message = new $root.rental.v1.LocationStatus();
                if (object.location != null) {
                    if (typeof object.location !== "object")
                        throw TypeError(".rental.v1.LocationStatus.location: object expected");
                    message.location = $root.rental.v1.Location.fromObject(object.location);
                }
                if (object.feeCent != null)
                    message.feeCent = object.feeCent | 0;
                if (object.kmDriven != null)
                    message.kmDriven = Number(object.kmDriven);
                if (object.poiName != null)
                    message.poiName = String(object.poiName);
                if (object.timestampSec != null)
                    if ($util.Long)
                        (message.timestampSec = $util.Long.fromValue(object.timestampSec)).unsigned = false;
                    else if (typeof object.timestampSec === "string")
                        message.timestampSec = parseInt(object.timestampSec, 10);
                    else if (typeof object.timestampSec === "number")
                        message.timestampSec = object.timestampSec;
                    else if (typeof object.timestampSec === "object")
                        message.timestampSec = new $util.LongBits(object.timestampSec.low >>> 0, object.timestampSec.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a LocationStatus message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.LocationStatus
             * @static
             * @param {rental.v1.LocationStatus} message LocationStatus
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LocationStatus.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.location = null;
                    object.feeCent = 0;
                    object.kmDriven = 0;
                    object.poiName = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestampSec = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestampSec = options.longs === String ? "0" : 0;
                }
                if (message.location != null && message.hasOwnProperty("location"))
                    object.location = $root.rental.v1.Location.toObject(message.location, options);
                if (message.feeCent != null && message.hasOwnProperty("feeCent"))
                    object.feeCent = message.feeCent;
                if (message.kmDriven != null && message.hasOwnProperty("kmDriven"))
                    object.kmDriven = options.json && !isFinite(message.kmDriven) ? String(message.kmDriven) : message.kmDriven;
                if (message.poiName != null && message.hasOwnProperty("poiName"))
                    object.poiName = message.poiName;
                if (message.timestampSec != null && message.hasOwnProperty("timestampSec"))
                    if (typeof message.timestampSec === "number")
                        object.timestampSec = options.longs === String ? String(message.timestampSec) : message.timestampSec;
                    else
                        object.timestampSec = options.longs === String ? $util.Long.prototype.toString.call(message.timestampSec) : options.longs === Number ? new $util.LongBits(message.timestampSec.low >>> 0, message.timestampSec.high >>> 0).toNumber() : message.timestampSec;
                return object;
            };

            /**
             * Converts this LocationStatus to JSON.
             * @function toJSON
             * @memberof rental.v1.LocationStatus
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LocationStatus.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LocationStatus;
        })();

        /**
         * TripStatus enum.
         * @name rental.v1.TripStatus
         * @enum {number}
         * @property {number} TS_NOT_SPECIFIED=0 TS_NOT_SPECIFIED value
         * @property {number} IN_PROGRESS=1 IN_PROGRESS value
         * @property {number} FINISHED=2 FINISHED value
         */
        v1.TripStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TS_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "IN_PROGRESS"] = 1;
            values[valuesById[2] = "FINISHED"] = 2;
            return values;
        })();

        v1.TripEntity = (function() {

            /**
             * Properties of a TripEntity.
             * @memberof rental.v1
             * @interface ITripEntity
             * @property {string|null} [id] TripEntity id
             * @property {rental.v1.ITrip|null} [trip] TripEntity trip
             */

            /**
             * Constructs a new TripEntity.
             * @memberof rental.v1
             * @classdesc Represents a TripEntity.
             * @implements ITripEntity
             * @constructor
             * @param {rental.v1.ITripEntity=} [properties] Properties to set
             */
            function TripEntity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TripEntity id.
             * @member {string} id
             * @memberof rental.v1.TripEntity
             * @instance
             */
            TripEntity.prototype.id = "";

            /**
             * TripEntity trip.
             * @member {rental.v1.ITrip|null|undefined} trip
             * @memberof rental.v1.TripEntity
             * @instance
             */
            TripEntity.prototype.trip = null;

            /**
             * Decodes a TripEntity message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.TripEntity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.TripEntity} TripEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TripEntity.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.TripEntity();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.trip = $root.rental.v1.Trip.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a TripEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.TripEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.TripEntity} TripEntity
             */
            TripEntity.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.TripEntity)
                    return object;
                let message = new $root.rental.v1.TripEntity();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.trip != null) {
                    if (typeof object.trip !== "object")
                        throw TypeError(".rental.v1.TripEntity.trip: object expected");
                    message.trip = $root.rental.v1.Trip.fromObject(object.trip);
                }
                return message;
            };

            /**
             * Creates a plain object from a TripEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.TripEntity
             * @static
             * @param {rental.v1.TripEntity} message TripEntity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TripEntity.toObject = function toObject(message, options) {
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
                    object.trip = $root.rental.v1.Trip.toObject(message.trip, options);
                return object;
            };

            /**
             * Converts this TripEntity to JSON.
             * @function toJSON
             * @memberof rental.v1.TripEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TripEntity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TripEntity;
        })();

        v1.Trip = (function() {

            /**
             * Properties of a Trip.
             * @memberof rental.v1
             * @interface ITrip
             * @property {string|null} [accountId] Trip accountId
             * @property {string|null} [carId] Trip carId
             * @property {rental.v1.ILocationStatus|null} [start] Trip start
             * @property {rental.v1.ILocationStatus|null} [current] Trip current
             * @property {rental.v1.ILocationStatus|null} [end] Trip end
             * @property {rental.v1.TripStatus|null} [status] Trip status
             * @property {string|null} [identityId] Trip identityId
             */

            /**
             * Constructs a new Trip.
             * @memberof rental.v1
             * @classdesc Represents a Trip.
             * @implements ITrip
             * @constructor
             * @param {rental.v1.ITrip=} [properties] Properties to set
             */
            function Trip(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Trip accountId.
             * @member {string} accountId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.accountId = "";

            /**
             * Trip carId.
             * @member {string} carId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.carId = "";

            /**
             * Trip start.
             * @member {rental.v1.ILocationStatus|null|undefined} start
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.start = null;

            /**
             * Trip current.
             * @member {rental.v1.ILocationStatus|null|undefined} current
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.current = null;

            /**
             * Trip end.
             * @member {rental.v1.ILocationStatus|null|undefined} end
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.end = null;

            /**
             * Trip status.
             * @member {rental.v1.TripStatus} status
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.status = 0;

            /**
             * Trip identityId.
             * @member {string} identityId
             * @memberof rental.v1.Trip
             * @instance
             */
            Trip.prototype.identityId = "";

            /**
             * Decodes a Trip message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.Trip
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.Trip} Trip
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Trip.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.Trip();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.accountId = reader.string();
                        break;
                    case 2:
                        message.carId = reader.string();
                        break;
                    case 3:
                        message.start = $root.rental.v1.LocationStatus.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.current = $root.rental.v1.LocationStatus.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.end = $root.rental.v1.LocationStatus.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.status = reader.int32();
                        break;
                    case 7:
                        message.identityId = reader.string();
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
             * @memberof rental.v1.Trip
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Trip} Trip
             */
            Trip.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Trip)
                    return object;
                let message = new $root.rental.v1.Trip();
                if (object.accountId != null)
                    message.accountId = String(object.accountId);
                if (object.carId != null)
                    message.carId = String(object.carId);
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".rental.v1.Trip.start: object expected");
                    message.start = $root.rental.v1.LocationStatus.fromObject(object.start);
                }
                if (object.current != null) {
                    if (typeof object.current !== "object")
                        throw TypeError(".rental.v1.Trip.current: object expected");
                    message.current = $root.rental.v1.LocationStatus.fromObject(object.current);
                }
                if (object.end != null) {
                    if (typeof object.end !== "object")
                        throw TypeError(".rental.v1.Trip.end: object expected");
                    message.end = $root.rental.v1.LocationStatus.fromObject(object.end);
                }
                switch (object.status) {
                case "TS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "IN_PROGRESS":
                case 1:
                    message.status = 1;
                    break;
                case "FINISHED":
                case 2:
                    message.status = 2;
                    break;
                }
                if (object.identityId != null)
                    message.identityId = String(object.identityId);
                return message;
            };

            /**
             * Creates a plain object from a Trip message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Trip
             * @static
             * @param {rental.v1.Trip} message Trip
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Trip.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.accountId = "";
                    object.carId = "";
                    object.start = null;
                    object.current = null;
                    object.end = null;
                    object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                    object.identityId = "";
                }
                if (message.accountId != null && message.hasOwnProperty("accountId"))
                    object.accountId = message.accountId;
                if (message.carId != null && message.hasOwnProperty("carId"))
                    object.carId = message.carId;
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = $root.rental.v1.LocationStatus.toObject(message.start, options);
                if (message.current != null && message.hasOwnProperty("current"))
                    object.current = $root.rental.v1.LocationStatus.toObject(message.current, options);
                if (message.end != null && message.hasOwnProperty("end"))
                    object.end = $root.rental.v1.LocationStatus.toObject(message.end, options);
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.rental.v1.TripStatus[message.status] : message.status;
                if (message.identityId != null && message.hasOwnProperty("identityId"))
                    object.identityId = message.identityId;
                return object;
            };

            /**
             * Converts this Trip to JSON.
             * @function toJSON
             * @memberof rental.v1.Trip
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Trip.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Trip;
        })();

        v1.CreateTripReq = (function() {

            /**
             * Properties of a CreateTripReq.
             * @memberof rental.v1
             * @interface ICreateTripReq
             * @property {rental.v1.ILocation|null} [start] CreateTripReq start
             * @property {string|null} [carId] CreateTripReq carId
             * @property {string|null} [avatarUrl] CreateTripReq avatarUrl
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
             * @member {rental.v1.ILocation|null|undefined} start
             * @memberof rental.v1.CreateTripReq
             * @instance
             */
            CreateTripReq.prototype.start = null;

            /**
             * CreateTripReq carId.
             * @member {string} carId
             * @memberof rental.v1.CreateTripReq
             * @instance
             */
            CreateTripReq.prototype.carId = "";

            /**
             * CreateTripReq avatarUrl.
             * @member {string} avatarUrl
             * @memberof rental.v1.CreateTripReq
             * @instance
             */
            CreateTripReq.prototype.avatarUrl = "";

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
                        message.start = $root.rental.v1.Location.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.carId = reader.string();
                        break;
                    case 3:
                        message.avatarUrl = reader.string();
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
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".rental.v1.CreateTripReq.start: object expected");
                    message.start = $root.rental.v1.Location.fromObject(object.start);
                }
                if (object.carId != null)
                    message.carId = String(object.carId);
                if (object.avatarUrl != null)
                    message.avatarUrl = String(object.avatarUrl);
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
                if (options.defaults) {
                    object.start = null;
                    object.carId = "";
                    object.avatarUrl = "";
                }
                if (message.start != null && message.hasOwnProperty("start"))
                    object.start = $root.rental.v1.Location.toObject(message.start, options);
                if (message.carId != null && message.hasOwnProperty("carId"))
                    object.carId = message.carId;
                if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                    object.avatarUrl = message.avatarUrl;
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

        v1.GetTripReq = (function() {

            /**
             * Properties of a GetTripReq.
             * @memberof rental.v1
             * @interface IGetTripReq
             * @property {string|null} [id] GetTripReq id
             */

            /**
             * Constructs a new GetTripReq.
             * @memberof rental.v1
             * @classdesc Represents a GetTripReq.
             * @implements IGetTripReq
             * @constructor
             * @param {rental.v1.IGetTripReq=} [properties] Properties to set
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
             * @memberof rental.v1.GetTripReq
             * @instance
             */
            GetTripReq.prototype.id = "";

            /**
             * Decodes a GetTripReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetTripReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetTripReq} GetTripReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTripReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetTripReq();
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
             * @memberof rental.v1.GetTripReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripReq} GetTripReq
             */
            GetTripReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripReq)
                    return object;
                let message = new $root.rental.v1.GetTripReq();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a GetTripReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripReq
             * @static
             * @param {rental.v1.GetTripReq} message GetTripReq
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
             * @memberof rental.v1.GetTripReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripReq;
        })();

        v1.GetTripsReq = (function() {

            /**
             * Properties of a GetTripsReq.
             * @memberof rental.v1
             * @interface IGetTripsReq
             * @property {rental.v1.TripStatus|null} [status] GetTripsReq status
             */

            /**
             * Constructs a new GetTripsReq.
             * @memberof rental.v1
             * @classdesc Represents a GetTripsReq.
             * @implements IGetTripsReq
             * @constructor
             * @param {rental.v1.IGetTripsReq=} [properties] Properties to set
             */
            function GetTripsReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripsReq status.
             * @member {rental.v1.TripStatus} status
             * @memberof rental.v1.GetTripsReq
             * @instance
             */
            GetTripsReq.prototype.status = 0;

            /**
             * Decodes a GetTripsReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetTripsReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetTripsReq} GetTripsReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTripsReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetTripsReq();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
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
             * Creates a GetTripsReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripsReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripsReq} GetTripsReq
             */
            GetTripsReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripsReq)
                    return object;
                let message = new $root.rental.v1.GetTripsReq();
                switch (object.status) {
                case "TS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "IN_PROGRESS":
                case 1:
                    message.status = 1;
                    break;
                case "FINISHED":
                case 2:
                    message.status = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTripsReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripsReq
             * @static
             * @param {rental.v1.GetTripsReq} message GetTripsReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripsReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.status = options.enums === String ? "TS_NOT_SPECIFIED" : 0;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.rental.v1.TripStatus[message.status] : message.status;
                return object;
            };

            /**
             * Converts this GetTripsReq to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripsReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripsReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripsReq;
        })();

        v1.GetTripsRsp = (function() {

            /**
             * Properties of a GetTripsRsp.
             * @memberof rental.v1
             * @interface IGetTripsRsp
             * @property {Array.<rental.v1.ITripEntity>|null} [trips] GetTripsRsp trips
             */

            /**
             * Constructs a new GetTripsRsp.
             * @memberof rental.v1
             * @classdesc Represents a GetTripsRsp.
             * @implements IGetTripsRsp
             * @constructor
             * @param {rental.v1.IGetTripsRsp=} [properties] Properties to set
             */
            function GetTripsRsp(properties) {
                this.trips = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTripsRsp trips.
             * @member {Array.<rental.v1.ITripEntity>} trips
             * @memberof rental.v1.GetTripsRsp
             * @instance
             */
            GetTripsRsp.prototype.trips = $util.emptyArray;

            /**
             * Decodes a GetTripsRsp message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetTripsRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetTripsRsp} GetTripsRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTripsRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetTripsRsp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.trips && message.trips.length))
                            message.trips = [];
                        message.trips.push($root.rental.v1.TripEntity.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a GetTripsRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetTripsRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetTripsRsp} GetTripsRsp
             */
            GetTripsRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetTripsRsp)
                    return object;
                let message = new $root.rental.v1.GetTripsRsp();
                if (object.trips) {
                    if (!Array.isArray(object.trips))
                        throw TypeError(".rental.v1.GetTripsRsp.trips: array expected");
                    message.trips = [];
                    for (let i = 0; i < object.trips.length; ++i) {
                        if (typeof object.trips[i] !== "object")
                            throw TypeError(".rental.v1.GetTripsRsp.trips: object expected");
                        message.trips[i] = $root.rental.v1.TripEntity.fromObject(object.trips[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTripsRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetTripsRsp
             * @static
             * @param {rental.v1.GetTripsRsp} message GetTripsRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTripsRsp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.trips = [];
                if (message.trips && message.trips.length) {
                    object.trips = [];
                    for (let j = 0; j < message.trips.length; ++j)
                        object.trips[j] = $root.rental.v1.TripEntity.toObject(message.trips[j], options);
                }
                return object;
            };

            /**
             * Converts this GetTripsRsp to JSON.
             * @function toJSON
             * @memberof rental.v1.GetTripsRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTripsRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTripsRsp;
        })();

        v1.UpdateTripReq = (function() {

            /**
             * Properties of an UpdateTripReq.
             * @memberof rental.v1
             * @interface IUpdateTripReq
             * @property {string|null} [id] UpdateTripReq id
             * @property {rental.v1.ILocation|null} [current] UpdateTripReq current
             * @property {boolean|null} [endTrip] UpdateTripReq endTrip
             */

            /**
             * Constructs a new UpdateTripReq.
             * @memberof rental.v1
             * @classdesc Represents an UpdateTripReq.
             * @implements IUpdateTripReq
             * @constructor
             * @param {rental.v1.IUpdateTripReq=} [properties] Properties to set
             */
            function UpdateTripReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateTripReq id.
             * @member {string} id
             * @memberof rental.v1.UpdateTripReq
             * @instance
             */
            UpdateTripReq.prototype.id = "";

            /**
             * UpdateTripReq current.
             * @member {rental.v1.ILocation|null|undefined} current
             * @memberof rental.v1.UpdateTripReq
             * @instance
             */
            UpdateTripReq.prototype.current = null;

            /**
             * UpdateTripReq endTrip.
             * @member {boolean} endTrip
             * @memberof rental.v1.UpdateTripReq
             * @instance
             */
            UpdateTripReq.prototype.endTrip = false;

            /**
             * Decodes an UpdateTripReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.UpdateTripReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.UpdateTripReq} UpdateTripReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpdateTripReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.UpdateTripReq();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.current = $root.rental.v1.Location.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.endTrip = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an UpdateTripReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.UpdateTripReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.UpdateTripReq} UpdateTripReq
             */
            UpdateTripReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.UpdateTripReq)
                    return object;
                let message = new $root.rental.v1.UpdateTripReq();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.current != null) {
                    if (typeof object.current !== "object")
                        throw TypeError(".rental.v1.UpdateTripReq.current: object expected");
                    message.current = $root.rental.v1.Location.fromObject(object.current);
                }
                if (object.endTrip != null)
                    message.endTrip = Boolean(object.endTrip);
                return message;
            };

            /**
             * Creates a plain object from an UpdateTripReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.UpdateTripReq
             * @static
             * @param {rental.v1.UpdateTripReq} message UpdateTripReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateTripReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.current = null;
                    object.endTrip = false;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.current != null && message.hasOwnProperty("current"))
                    object.current = $root.rental.v1.Location.toObject(message.current, options);
                if (message.endTrip != null && message.hasOwnProperty("endTrip"))
                    object.endTrip = message.endTrip;
                return object;
            };

            /**
             * Converts this UpdateTripReq to JSON.
             * @function toJSON
             * @memberof rental.v1.UpdateTripReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateTripReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateTripReq;
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
             * @param {rental.v1.TripEntity} [response] TripEntity
             */

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripReq} request CreateTripReq message or plain object
             * @param {rental.v1.TripService.CreateTripCallback} callback Node-style callback called with the error, if any, and TripEntity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.createTrip = function createTrip(request, callback) {
                return this.rpcCall(createTrip, $root.rental.v1.CreateTripReq, $root.rental.v1.TripEntity, request, callback);
            }, "name", { value: "CreateTrip" });

            /**
             * Calls CreateTrip.
             * @function createTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.ICreateTripReq} request CreateTripReq message or plain object
             * @returns {Promise<rental.v1.TripEntity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#getTrip}.
             * @memberof rental.v1.TripService
             * @typedef GetTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Trip} [response] Trip
             */

            /**
             * Calls GetTrip.
             * @function getTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripReq} request GetTripReq message or plain object
             * @param {rental.v1.TripService.GetTripCallback} callback Node-style callback called with the error, if any, and Trip
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.getTrip = function getTrip(request, callback) {
                return this.rpcCall(getTrip, $root.rental.v1.GetTripReq, $root.rental.v1.Trip, request, callback);
            }, "name", { value: "GetTrip" });

            /**
             * Calls GetTrip.
             * @function getTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripReq} request GetTripReq message or plain object
             * @returns {Promise<rental.v1.Trip>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#getTrips}.
             * @memberof rental.v1.TripService
             * @typedef GetTripsCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.GetTripsRsp} [response] GetTripsRsp
             */

            /**
             * Calls GetTrips.
             * @function getTrips
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripsReq} request GetTripsReq message or plain object
             * @param {rental.v1.TripService.GetTripsCallback} callback Node-style callback called with the error, if any, and GetTripsRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.getTrips = function getTrips(request, callback) {
                return this.rpcCall(getTrips, $root.rental.v1.GetTripsReq, $root.rental.v1.GetTripsRsp, request, callback);
            }, "name", { value: "GetTrips" });

            /**
             * Calls GetTrips.
             * @function getTrips
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IGetTripsReq} request GetTripsReq message or plain object
             * @returns {Promise<rental.v1.GetTripsRsp>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.TripService#updateTrip}.
             * @memberof rental.v1.TripService
             * @typedef UpdateTripCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Trip} [response] Trip
             */

            /**
             * Calls UpdateTrip.
             * @function updateTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IUpdateTripReq} request UpdateTripReq message or plain object
             * @param {rental.v1.TripService.UpdateTripCallback} callback Node-style callback called with the error, if any, and Trip
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(TripService.prototype.updateTrip = function updateTrip(request, callback) {
                return this.rpcCall(updateTrip, $root.rental.v1.UpdateTripReq, $root.rental.v1.Trip, request, callback);
            }, "name", { value: "UpdateTrip" });

            /**
             * Calls UpdateTrip.
             * @function updateTrip
             * @memberof rental.v1.TripService
             * @instance
             * @param {rental.v1.IUpdateTripReq} request UpdateTripReq message or plain object
             * @returns {Promise<rental.v1.Trip>} Promise
             * @variation 2
             */

            return TripService;
        })();

        /**
         * Gender enum.
         * @name rental.v1.Gender
         * @enum {number}
         * @property {number} G_NOT_SPECIFIED=0 G_NOT_SPECIFIED value
         * @property {number} MALE=1 MALE value
         * @property {number} FEMALE=2 FEMALE value
         */
        v1.Gender = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "G_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "MALE"] = 1;
            values[valuesById[2] = "FEMALE"] = 2;
            return values;
        })();

        v1.Identity = (function() {

            /**
             * Properties of an Identity.
             * @memberof rental.v1
             * @interface IIdentity
             * @property {string|null} [licNumber] Identity licNumber
             * @property {string|null} [name] Identity name
             * @property {rental.v1.Gender|null} [gender] Identity gender
             * @property {number|null} [birthDateMillis] Identity birthDateMillis
             */

            /**
             * Constructs a new Identity.
             * @memberof rental.v1
             * @classdesc Represents an Identity.
             * @implements IIdentity
             * @constructor
             * @param {rental.v1.IIdentity=} [properties] Properties to set
             */
            function Identity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Identity licNumber.
             * @member {string} licNumber
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.licNumber = "";

            /**
             * Identity name.
             * @member {string} name
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.name = "";

            /**
             * Identity gender.
             * @member {rental.v1.Gender} gender
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.gender = 0;

            /**
             * Identity birthDateMillis.
             * @member {number} birthDateMillis
             * @memberof rental.v1.Identity
             * @instance
             */
            Identity.prototype.birthDateMillis = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Decodes an Identity message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.Identity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.Identity} Identity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Identity.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.Identity();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.licNumber = reader.string();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.gender = reader.int32();
                        break;
                    case 4:
                        message.birthDateMillis = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an Identity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Identity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Identity} Identity
             */
            Identity.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Identity)
                    return object;
                let message = new $root.rental.v1.Identity();
                if (object.licNumber != null)
                    message.licNumber = String(object.licNumber);
                if (object.name != null)
                    message.name = String(object.name);
                switch (object.gender) {
                case "G_NOT_SPECIFIED":
                case 0:
                    message.gender = 0;
                    break;
                case "MALE":
                case 1:
                    message.gender = 1;
                    break;
                case "FEMALE":
                case 2:
                    message.gender = 2;
                    break;
                }
                if (object.birthDateMillis != null)
                    if ($util.Long)
                        (message.birthDateMillis = $util.Long.fromValue(object.birthDateMillis)).unsigned = false;
                    else if (typeof object.birthDateMillis === "string")
                        message.birthDateMillis = parseInt(object.birthDateMillis, 10);
                    else if (typeof object.birthDateMillis === "number")
                        message.birthDateMillis = object.birthDateMillis;
                    else if (typeof object.birthDateMillis === "object")
                        message.birthDateMillis = new $util.LongBits(object.birthDateMillis.low >>> 0, object.birthDateMillis.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an Identity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Identity
             * @static
             * @param {rental.v1.Identity} message Identity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Identity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.licNumber = "";
                    object.name = "";
                    object.gender = options.enums === String ? "G_NOT_SPECIFIED" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.birthDateMillis = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.birthDateMillis = options.longs === String ? "0" : 0;
                }
                if (message.licNumber != null && message.hasOwnProperty("licNumber"))
                    object.licNumber = message.licNumber;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.gender != null && message.hasOwnProperty("gender"))
                    object.gender = options.enums === String ? $root.rental.v1.Gender[message.gender] : message.gender;
                if (message.birthDateMillis != null && message.hasOwnProperty("birthDateMillis"))
                    if (typeof message.birthDateMillis === "number")
                        object.birthDateMillis = options.longs === String ? String(message.birthDateMillis) : message.birthDateMillis;
                    else
                        object.birthDateMillis = options.longs === String ? $util.Long.prototype.toString.call(message.birthDateMillis) : options.longs === Number ? new $util.LongBits(message.birthDateMillis.low >>> 0, message.birthDateMillis.high >>> 0).toNumber() : message.birthDateMillis;
                return object;
            };

            /**
             * Converts this Identity to JSON.
             * @function toJSON
             * @memberof rental.v1.Identity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Identity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Identity;
        })();

        /**
         * IdentityStatus enum.
         * @name rental.v1.IdentityStatus
         * @enum {number}
         * @property {number} UNSUBMITTED=0 UNSUBMITTED value
         * @property {number} PENDING=1 PENDING value
         * @property {number} VERIFIED=2 VERIFIED value
         */
        v1.IdentityStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNSUBMITTED"] = 0;
            values[valuesById[1] = "PENDING"] = 1;
            values[valuesById[2] = "VERIFIED"] = 2;
            return values;
        })();

        v1.Profile = (function() {

            /**
             * Properties of a Profile.
             * @memberof rental.v1
             * @interface IProfile
             * @property {rental.v1.IIdentity|null} [identity] Profile identity
             * @property {rental.v1.IdentityStatus|null} [identityStatus] Profile identityStatus
             */

            /**
             * Constructs a new Profile.
             * @memberof rental.v1
             * @classdesc Represents a Profile.
             * @implements IProfile
             * @constructor
             * @param {rental.v1.IProfile=} [properties] Properties to set
             */
            function Profile(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Profile identity.
             * @member {rental.v1.IIdentity|null|undefined} identity
             * @memberof rental.v1.Profile
             * @instance
             */
            Profile.prototype.identity = null;

            /**
             * Profile identityStatus.
             * @member {rental.v1.IdentityStatus} identityStatus
             * @memberof rental.v1.Profile
             * @instance
             */
            Profile.prototype.identityStatus = 0;

            /**
             * Decodes a Profile message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.Profile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.Profile} Profile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Profile.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.Profile();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.identity = $root.rental.v1.Identity.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.identityStatus = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a Profile message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.Profile
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.Profile} Profile
             */
            Profile.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.Profile)
                    return object;
                let message = new $root.rental.v1.Profile();
                if (object.identity != null) {
                    if (typeof object.identity !== "object")
                        throw TypeError(".rental.v1.Profile.identity: object expected");
                    message.identity = $root.rental.v1.Identity.fromObject(object.identity);
                }
                switch (object.identityStatus) {
                case "UNSUBMITTED":
                case 0:
                    message.identityStatus = 0;
                    break;
                case "PENDING":
                case 1:
                    message.identityStatus = 1;
                    break;
                case "VERIFIED":
                case 2:
                    message.identityStatus = 2;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a Profile message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.Profile
             * @static
             * @param {rental.v1.Profile} message Profile
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Profile.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.identity = null;
                    object.identityStatus = options.enums === String ? "UNSUBMITTED" : 0;
                }
                if (message.identity != null && message.hasOwnProperty("identity"))
                    object.identity = $root.rental.v1.Identity.toObject(message.identity, options);
                if (message.identityStatus != null && message.hasOwnProperty("identityStatus"))
                    object.identityStatus = options.enums === String ? $root.rental.v1.IdentityStatus[message.identityStatus] : message.identityStatus;
                return object;
            };

            /**
             * Converts this Profile to JSON.
             * @function toJSON
             * @memberof rental.v1.Profile
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Profile.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Profile;
        })();

        v1.GetProfileReq = (function() {

            /**
             * Properties of a GetProfileReq.
             * @memberof rental.v1
             * @interface IGetProfileReq
             */

            /**
             * Constructs a new GetProfileReq.
             * @memberof rental.v1
             * @classdesc Represents a GetProfileReq.
             * @implements IGetProfileReq
             * @constructor
             * @param {rental.v1.IGetProfileReq=} [properties] Properties to set
             */
            function GetProfileReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a GetProfileReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetProfileReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetProfileReq} GetProfileReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetProfileReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetProfileReq();
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
             * Creates a GetProfileReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetProfileReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetProfileReq} GetProfileReq
             */
            GetProfileReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetProfileReq)
                    return object;
                return new $root.rental.v1.GetProfileReq();
            };

            /**
             * Creates a plain object from a GetProfileReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetProfileReq
             * @static
             * @param {rental.v1.GetProfileReq} message GetProfileReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetProfileReq.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetProfileReq to JSON.
             * @function toJSON
             * @memberof rental.v1.GetProfileReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetProfileReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetProfileReq;
        })();

        v1.ClearProfileReq = (function() {

            /**
             * Properties of a ClearProfileReq.
             * @memberof rental.v1
             * @interface IClearProfileReq
             */

            /**
             * Constructs a new ClearProfileReq.
             * @memberof rental.v1
             * @classdesc Represents a ClearProfileReq.
             * @implements IClearProfileReq
             * @constructor
             * @param {rental.v1.IClearProfileReq=} [properties] Properties to set
             */
            function ClearProfileReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a ClearProfileReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.ClearProfileReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.ClearProfileReq} ClearProfileReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClearProfileReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.ClearProfileReq();
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
             * Creates a ClearProfileReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.ClearProfileReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.ClearProfileReq} ClearProfileReq
             */
            ClearProfileReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.ClearProfileReq)
                    return object;
                return new $root.rental.v1.ClearProfileReq();
            };

            /**
             * Creates a plain object from a ClearProfileReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.ClearProfileReq
             * @static
             * @param {rental.v1.ClearProfileReq} message ClearProfileReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClearProfileReq.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ClearProfileReq to JSON.
             * @function toJSON
             * @memberof rental.v1.ClearProfileReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClearProfileReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClearProfileReq;
        })();

        v1.ProfileService = (function() {

            /**
             * Constructs a new ProfileService service.
             * @memberof rental.v1
             * @classdesc Represents a ProfileService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function ProfileService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (ProfileService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = ProfileService;

            /**
             * Callback as used by {@link rental.v1.ProfileService#getProfile}.
             * @memberof rental.v1.ProfileService
             * @typedef GetProfileCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Profile} [response] Profile
             */

            /**
             * Calls GetProfile.
             * @function getProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfileReq} request GetProfileReq message or plain object
             * @param {rental.v1.ProfileService.GetProfileCallback} callback Node-style callback called with the error, if any, and Profile
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.getProfile = function getProfile(request, callback) {
                return this.rpcCall(getProfile, $root.rental.v1.GetProfileReq, $root.rental.v1.Profile, request, callback);
            }, "name", { value: "GetProfile" });

            /**
             * Calls GetProfile.
             * @function getProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfileReq} request GetProfileReq message or plain object
             * @returns {Promise<rental.v1.Profile>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#submitProfile}.
             * @memberof rental.v1.ProfileService
             * @typedef SubmitProfileCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Profile} [response] Profile
             */

            /**
             * Calls SubmitProfile.
             * @function submitProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IIdentity} request Identity message or plain object
             * @param {rental.v1.ProfileService.SubmitProfileCallback} callback Node-style callback called with the error, if any, and Profile
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.submitProfile = function submitProfile(request, callback) {
                return this.rpcCall(submitProfile, $root.rental.v1.Identity, $root.rental.v1.Profile, request, callback);
            }, "name", { value: "SubmitProfile" });

            /**
             * Calls SubmitProfile.
             * @function submitProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IIdentity} request Identity message or plain object
             * @returns {Promise<rental.v1.Profile>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#clearProfile}.
             * @memberof rental.v1.ProfileService
             * @typedef ClearProfileCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Profile} [response] Profile
             */

            /**
             * Calls ClearProfile.
             * @function clearProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IClearProfileReq} request ClearProfileReq message or plain object
             * @param {rental.v1.ProfileService.ClearProfileCallback} callback Node-style callback called with the error, if any, and Profile
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.clearProfile = function clearProfile(request, callback) {
                return this.rpcCall(clearProfile, $root.rental.v1.ClearProfileReq, $root.rental.v1.Profile, request, callback);
            }, "name", { value: "ClearProfile" });

            /**
             * Calls ClearProfile.
             * @function clearProfile
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IClearProfileReq} request ClearProfileReq message or plain object
             * @returns {Promise<rental.v1.Profile>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#getProfilePhoto}.
             * @memberof rental.v1.ProfileService
             * @typedef GetProfilePhotoCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.GetProfilePhotoRsp} [response] GetProfilePhotoRsp
             */

            /**
             * Calls GetProfilePhoto.
             * @function getProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfilePhotoReq} request GetProfilePhotoReq message or plain object
             * @param {rental.v1.ProfileService.GetProfilePhotoCallback} callback Node-style callback called with the error, if any, and GetProfilePhotoRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.getProfilePhoto = function getProfilePhoto(request, callback) {
                return this.rpcCall(getProfilePhoto, $root.rental.v1.GetProfilePhotoReq, $root.rental.v1.GetProfilePhotoRsp, request, callback);
            }, "name", { value: "GetProfilePhoto" });

            /**
             * Calls GetProfilePhoto.
             * @function getProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IGetProfilePhotoReq} request GetProfilePhotoReq message or plain object
             * @returns {Promise<rental.v1.GetProfilePhotoRsp>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#createProfilePhoto}.
             * @memberof rental.v1.ProfileService
             * @typedef CreateProfilePhotoCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.CreateProfilePhotoRsp} [response] CreateProfilePhotoRsp
             */

            /**
             * Calls CreateProfilePhoto.
             * @function createProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.ICreateProfilePhotoReq} request CreateProfilePhotoReq message or plain object
             * @param {rental.v1.ProfileService.CreateProfilePhotoCallback} callback Node-style callback called with the error, if any, and CreateProfilePhotoRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.createProfilePhoto = function createProfilePhoto(request, callback) {
                return this.rpcCall(createProfilePhoto, $root.rental.v1.CreateProfilePhotoReq, $root.rental.v1.CreateProfilePhotoRsp, request, callback);
            }, "name", { value: "CreateProfilePhoto" });

            /**
             * Calls CreateProfilePhoto.
             * @function createProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.ICreateProfilePhotoReq} request CreateProfilePhotoReq message or plain object
             * @returns {Promise<rental.v1.CreateProfilePhotoRsp>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#completeProfilePhoto}.
             * @memberof rental.v1.ProfileService
             * @typedef CompleteProfilePhotoCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.Identity} [response] Identity
             */

            /**
             * Calls CompleteProfilePhoto.
             * @function completeProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.ICompleteProfilePhotoReq} request CompleteProfilePhotoReq message or plain object
             * @param {rental.v1.ProfileService.CompleteProfilePhotoCallback} callback Node-style callback called with the error, if any, and Identity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.completeProfilePhoto = function completeProfilePhoto(request, callback) {
                return this.rpcCall(completeProfilePhoto, $root.rental.v1.CompleteProfilePhotoReq, $root.rental.v1.Identity, request, callback);
            }, "name", { value: "CompleteProfilePhoto" });

            /**
             * Calls CompleteProfilePhoto.
             * @function completeProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.ICompleteProfilePhotoReq} request CompleteProfilePhotoReq message or plain object
             * @returns {Promise<rental.v1.Identity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link rental.v1.ProfileService#clearProfilePhoto}.
             * @memberof rental.v1.ProfileService
             * @typedef ClearProfilePhotoCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {rental.v1.ClearProfilePhotoRsp} [response] ClearProfilePhotoRsp
             */

            /**
             * Calls ClearProfilePhoto.
             * @function clearProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IClearProfilePhotoReq} request ClearProfilePhotoReq message or plain object
             * @param {rental.v1.ProfileService.ClearProfilePhotoCallback} callback Node-style callback called with the error, if any, and ClearProfilePhotoRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ProfileService.prototype.clearProfilePhoto = function clearProfilePhoto(request, callback) {
                return this.rpcCall(clearProfilePhoto, $root.rental.v1.ClearProfilePhotoReq, $root.rental.v1.ClearProfilePhotoRsp, request, callback);
            }, "name", { value: "ClearProfilePhoto" });

            /**
             * Calls ClearProfilePhoto.
             * @function clearProfilePhoto
             * @memberof rental.v1.ProfileService
             * @instance
             * @param {rental.v1.IClearProfilePhotoReq} request ClearProfilePhotoReq message or plain object
             * @returns {Promise<rental.v1.ClearProfilePhotoRsp>} Promise
             * @variation 2
             */

            return ProfileService;
        })();

        v1.GetProfilePhotoReq = (function() {

            /**
             * Properties of a GetProfilePhotoReq.
             * @memberof rental.v1
             * @interface IGetProfilePhotoReq
             */

            /**
             * Constructs a new GetProfilePhotoReq.
             * @memberof rental.v1
             * @classdesc Represents a GetProfilePhotoReq.
             * @implements IGetProfilePhotoReq
             * @constructor
             * @param {rental.v1.IGetProfilePhotoReq=} [properties] Properties to set
             */
            function GetProfilePhotoReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a GetProfilePhotoReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetProfilePhotoReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetProfilePhotoReq} GetProfilePhotoReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetProfilePhotoReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetProfilePhotoReq();
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
             * Creates a GetProfilePhotoReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetProfilePhotoReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetProfilePhotoReq} GetProfilePhotoReq
             */
            GetProfilePhotoReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetProfilePhotoReq)
                    return object;
                return new $root.rental.v1.GetProfilePhotoReq();
            };

            /**
             * Creates a plain object from a GetProfilePhotoReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetProfilePhotoReq
             * @static
             * @param {rental.v1.GetProfilePhotoReq} message GetProfilePhotoReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetProfilePhotoReq.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetProfilePhotoReq to JSON.
             * @function toJSON
             * @memberof rental.v1.GetProfilePhotoReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetProfilePhotoReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetProfilePhotoReq;
        })();

        v1.GetProfilePhotoRsp = (function() {

            /**
             * Properties of a GetProfilePhotoRsp.
             * @memberof rental.v1
             * @interface IGetProfilePhotoRsp
             * @property {string|null} [url] GetProfilePhotoRsp url
             */

            /**
             * Constructs a new GetProfilePhotoRsp.
             * @memberof rental.v1
             * @classdesc Represents a GetProfilePhotoRsp.
             * @implements IGetProfilePhotoRsp
             * @constructor
             * @param {rental.v1.IGetProfilePhotoRsp=} [properties] Properties to set
             */
            function GetProfilePhotoRsp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetProfilePhotoRsp url.
             * @member {string} url
             * @memberof rental.v1.GetProfilePhotoRsp
             * @instance
             */
            GetProfilePhotoRsp.prototype.url = "";

            /**
             * Decodes a GetProfilePhotoRsp message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.GetProfilePhotoRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.GetProfilePhotoRsp} GetProfilePhotoRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetProfilePhotoRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.GetProfilePhotoRsp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.url = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a GetProfilePhotoRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.GetProfilePhotoRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.GetProfilePhotoRsp} GetProfilePhotoRsp
             */
            GetProfilePhotoRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.GetProfilePhotoRsp)
                    return object;
                let message = new $root.rental.v1.GetProfilePhotoRsp();
                if (object.url != null)
                    message.url = String(object.url);
                return message;
            };

            /**
             * Creates a plain object from a GetProfilePhotoRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.GetProfilePhotoRsp
             * @static
             * @param {rental.v1.GetProfilePhotoRsp} message GetProfilePhotoRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetProfilePhotoRsp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.url = "";
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                return object;
            };

            /**
             * Converts this GetProfilePhotoRsp to JSON.
             * @function toJSON
             * @memberof rental.v1.GetProfilePhotoRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetProfilePhotoRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetProfilePhotoRsp;
        })();

        v1.CreateProfilePhotoReq = (function() {

            /**
             * Properties of a CreateProfilePhotoReq.
             * @memberof rental.v1
             * @interface ICreateProfilePhotoReq
             */

            /**
             * Constructs a new CreateProfilePhotoReq.
             * @memberof rental.v1
             * @classdesc Represents a CreateProfilePhotoReq.
             * @implements ICreateProfilePhotoReq
             * @constructor
             * @param {rental.v1.ICreateProfilePhotoReq=} [properties] Properties to set
             */
            function CreateProfilePhotoReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a CreateProfilePhotoReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.CreateProfilePhotoReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.CreateProfilePhotoReq} CreateProfilePhotoReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateProfilePhotoReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.CreateProfilePhotoReq();
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
             * Creates a CreateProfilePhotoReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CreateProfilePhotoReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CreateProfilePhotoReq} CreateProfilePhotoReq
             */
            CreateProfilePhotoReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CreateProfilePhotoReq)
                    return object;
                return new $root.rental.v1.CreateProfilePhotoReq();
            };

            /**
             * Creates a plain object from a CreateProfilePhotoReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CreateProfilePhotoReq
             * @static
             * @param {rental.v1.CreateProfilePhotoReq} message CreateProfilePhotoReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateProfilePhotoReq.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this CreateProfilePhotoReq to JSON.
             * @function toJSON
             * @memberof rental.v1.CreateProfilePhotoReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateProfilePhotoReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateProfilePhotoReq;
        })();

        v1.CreateProfilePhotoRsp = (function() {

            /**
             * Properties of a CreateProfilePhotoRsp.
             * @memberof rental.v1
             * @interface ICreateProfilePhotoRsp
             * @property {string|null} [uploadUrl] CreateProfilePhotoRsp uploadUrl
             */

            /**
             * Constructs a new CreateProfilePhotoRsp.
             * @memberof rental.v1
             * @classdesc Represents a CreateProfilePhotoRsp.
             * @implements ICreateProfilePhotoRsp
             * @constructor
             * @param {rental.v1.ICreateProfilePhotoRsp=} [properties] Properties to set
             */
            function CreateProfilePhotoRsp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateProfilePhotoRsp uploadUrl.
             * @member {string} uploadUrl
             * @memberof rental.v1.CreateProfilePhotoRsp
             * @instance
             */
            CreateProfilePhotoRsp.prototype.uploadUrl = "";

            /**
             * Decodes a CreateProfilePhotoRsp message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.CreateProfilePhotoRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.CreateProfilePhotoRsp} CreateProfilePhotoRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateProfilePhotoRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.CreateProfilePhotoRsp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uploadUrl = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a CreateProfilePhotoRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CreateProfilePhotoRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CreateProfilePhotoRsp} CreateProfilePhotoRsp
             */
            CreateProfilePhotoRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CreateProfilePhotoRsp)
                    return object;
                let message = new $root.rental.v1.CreateProfilePhotoRsp();
                if (object.uploadUrl != null)
                    message.uploadUrl = String(object.uploadUrl);
                return message;
            };

            /**
             * Creates a plain object from a CreateProfilePhotoRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CreateProfilePhotoRsp
             * @static
             * @param {rental.v1.CreateProfilePhotoRsp} message CreateProfilePhotoRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateProfilePhotoRsp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.uploadUrl = "";
                if (message.uploadUrl != null && message.hasOwnProperty("uploadUrl"))
                    object.uploadUrl = message.uploadUrl;
                return object;
            };

            /**
             * Converts this CreateProfilePhotoRsp to JSON.
             * @function toJSON
             * @memberof rental.v1.CreateProfilePhotoRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateProfilePhotoRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateProfilePhotoRsp;
        })();

        v1.CompleteProfilePhotoReq = (function() {

            /**
             * Properties of a CompleteProfilePhotoReq.
             * @memberof rental.v1
             * @interface ICompleteProfilePhotoReq
             */

            /**
             * Constructs a new CompleteProfilePhotoReq.
             * @memberof rental.v1
             * @classdesc Represents a CompleteProfilePhotoReq.
             * @implements ICompleteProfilePhotoReq
             * @constructor
             * @param {rental.v1.ICompleteProfilePhotoReq=} [properties] Properties to set
             */
            function CompleteProfilePhotoReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a CompleteProfilePhotoReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.CompleteProfilePhotoReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.CompleteProfilePhotoReq} CompleteProfilePhotoReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CompleteProfilePhotoReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.CompleteProfilePhotoReq();
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
             * Creates a CompleteProfilePhotoReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.CompleteProfilePhotoReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.CompleteProfilePhotoReq} CompleteProfilePhotoReq
             */
            CompleteProfilePhotoReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.CompleteProfilePhotoReq)
                    return object;
                return new $root.rental.v1.CompleteProfilePhotoReq();
            };

            /**
             * Creates a plain object from a CompleteProfilePhotoReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.CompleteProfilePhotoReq
             * @static
             * @param {rental.v1.CompleteProfilePhotoReq} message CompleteProfilePhotoReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CompleteProfilePhotoReq.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this CompleteProfilePhotoReq to JSON.
             * @function toJSON
             * @memberof rental.v1.CompleteProfilePhotoReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CompleteProfilePhotoReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CompleteProfilePhotoReq;
        })();

        v1.ClearProfilePhotoReq = (function() {

            /**
             * Properties of a ClearProfilePhotoReq.
             * @memberof rental.v1
             * @interface IClearProfilePhotoReq
             */

            /**
             * Constructs a new ClearProfilePhotoReq.
             * @memberof rental.v1
             * @classdesc Represents a ClearProfilePhotoReq.
             * @implements IClearProfilePhotoReq
             * @constructor
             * @param {rental.v1.IClearProfilePhotoReq=} [properties] Properties to set
             */
            function ClearProfilePhotoReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a ClearProfilePhotoReq message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.ClearProfilePhotoReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.ClearProfilePhotoReq} ClearProfilePhotoReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClearProfilePhotoReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.ClearProfilePhotoReq();
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
             * Creates a ClearProfilePhotoReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.ClearProfilePhotoReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.ClearProfilePhotoReq} ClearProfilePhotoReq
             */
            ClearProfilePhotoReq.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.ClearProfilePhotoReq)
                    return object;
                return new $root.rental.v1.ClearProfilePhotoReq();
            };

            /**
             * Creates a plain object from a ClearProfilePhotoReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.ClearProfilePhotoReq
             * @static
             * @param {rental.v1.ClearProfilePhotoReq} message ClearProfilePhotoReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClearProfilePhotoReq.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ClearProfilePhotoReq to JSON.
             * @function toJSON
             * @memberof rental.v1.ClearProfilePhotoReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClearProfilePhotoReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClearProfilePhotoReq;
        })();

        v1.ClearProfilePhotoRsp = (function() {

            /**
             * Properties of a ClearProfilePhotoRsp.
             * @memberof rental.v1
             * @interface IClearProfilePhotoRsp
             */

            /**
             * Constructs a new ClearProfilePhotoRsp.
             * @memberof rental.v1
             * @classdesc Represents a ClearProfilePhotoRsp.
             * @implements IClearProfilePhotoRsp
             * @constructor
             * @param {rental.v1.IClearProfilePhotoRsp=} [properties] Properties to set
             */
            function ClearProfilePhotoRsp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a ClearProfilePhotoRsp message from the specified reader or buffer.
             * @function decode
             * @memberof rental.v1.ClearProfilePhotoRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rental.v1.ClearProfilePhotoRsp} ClearProfilePhotoRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClearProfilePhotoRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.rental.v1.ClearProfilePhotoRsp();
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
             * Creates a ClearProfilePhotoRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rental.v1.ClearProfilePhotoRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rental.v1.ClearProfilePhotoRsp} ClearProfilePhotoRsp
             */
            ClearProfilePhotoRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.rental.v1.ClearProfilePhotoRsp)
                    return object;
                return new $root.rental.v1.ClearProfilePhotoRsp();
            };

            /**
             * Creates a plain object from a ClearProfilePhotoRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rental.v1.ClearProfilePhotoRsp
             * @static
             * @param {rental.v1.ClearProfilePhotoRsp} message ClearProfilePhotoRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClearProfilePhotoRsp.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ClearProfilePhotoRsp to JSON.
             * @function toJSON
             * @memberof rental.v1.ClearProfilePhotoRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClearProfilePhotoRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ClearProfilePhotoRsp;
        })();

        return v1;
    })();

    return rental;
})();