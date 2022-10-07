import * as $protobuf from "protobufjs";
// Common aliases
const $Reader = $protobuf.Reader, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const car = $root.car = (() => {

    /**
     * Namespace car.
     * @exports car
     * @namespace
     */
    const car = {};

    car.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof car
         * @namespace
         */
        const v1 = {};

        v1.CarEntity = (function() {

            /**
             * Properties of a CarEntity.
             * @memberof car.v1
             * @interface ICarEntity
             * @property {string|null} [id] CarEntity id
             * @property {car.v1.ICar|null} [car] CarEntity car
             */

            /**
             * Constructs a new CarEntity.
             * @memberof car.v1
             * @classdesc Represents a CarEntity.
             * @implements ICarEntity
             * @constructor
             * @param {car.v1.ICarEntity=} [properties] Properties to set
             */
            function CarEntity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CarEntity id.
             * @member {string} id
             * @memberof car.v1.CarEntity
             * @instance
             */
            CarEntity.prototype.id = "";

            /**
             * CarEntity car.
             * @member {car.v1.ICar|null|undefined} car
             * @memberof car.v1.CarEntity
             * @instance
             */
            CarEntity.prototype.car = null;

            /**
             * Decodes a CarEntity message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.CarEntity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.CarEntity} CarEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CarEntity.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.CarEntity();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.car = $root.car.v1.Car.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a CarEntity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.CarEntity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.CarEntity} CarEntity
             */
            CarEntity.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.CarEntity)
                    return object;
                let message = new $root.car.v1.CarEntity();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.car != null) {
                    if (typeof object.car !== "object")
                        throw TypeError(".car.v1.CarEntity.car: object expected");
                    message.car = $root.car.v1.Car.fromObject(object.car);
                }
                return message;
            };

            /**
             * Creates a plain object from a CarEntity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.CarEntity
             * @static
             * @param {car.v1.CarEntity} message CarEntity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CarEntity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.car = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.car != null && message.hasOwnProperty("car"))
                    object.car = $root.car.v1.Car.toObject(message.car, options);
                return object;
            };

            /**
             * Converts this CarEntity to JSON.
             * @function toJSON
             * @memberof car.v1.CarEntity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CarEntity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CarEntity;
        })();

        /**
         * CarStatus enum.
         * @name car.v1.CarStatus
         * @enum {number}
         * @property {number} CS_NOT_SPECIFIED=0 CS_NOT_SPECIFIED value
         * @property {number} LOCKED=1 LOCKED value
         * @property {number} UNLOCKING=2 UNLOCKING value
         * @property {number} UNLOCKED=3 UNLOCKED value
         * @property {number} LOCKING=4 LOCKING value
         */
        v1.CarStatus = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "CS_NOT_SPECIFIED"] = 0;
            values[valuesById[1] = "LOCKED"] = 1;
            values[valuesById[2] = "UNLOCKING"] = 2;
            values[valuesById[3] = "UNLOCKED"] = 3;
            values[valuesById[4] = "LOCKING"] = 4;
            return values;
        })();

        v1.Driver = (function() {

            /**
             * Properties of a Driver.
             * @memberof car.v1
             * @interface IDriver
             * @property {string|null} [id] Driver id
             * @property {string|null} [avatarUrl] Driver avatarUrl
             */

            /**
             * Constructs a new Driver.
             * @memberof car.v1
             * @classdesc Represents a Driver.
             * @implements IDriver
             * @constructor
             * @param {car.v1.IDriver=} [properties] Properties to set
             */
            function Driver(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Driver id.
             * @member {string} id
             * @memberof car.v1.Driver
             * @instance
             */
            Driver.prototype.id = "";

            /**
             * Driver avatarUrl.
             * @member {string} avatarUrl
             * @memberof car.v1.Driver
             * @instance
             */
            Driver.prototype.avatarUrl = "";

            /**
             * Decodes a Driver message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.Driver
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.Driver} Driver
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Driver.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.Driver();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
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
             * Creates a Driver message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.Driver
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.Driver} Driver
             */
            Driver.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.Driver)
                    return object;
                let message = new $root.car.v1.Driver();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.avatarUrl != null)
                    message.avatarUrl = String(object.avatarUrl);
                return message;
            };

            /**
             * Creates a plain object from a Driver message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.Driver
             * @static
             * @param {car.v1.Driver} message Driver
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Driver.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.avatarUrl = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.avatarUrl != null && message.hasOwnProperty("avatarUrl"))
                    object.avatarUrl = message.avatarUrl;
                return object;
            };

            /**
             * Converts this Driver to JSON.
             * @function toJSON
             * @memberof car.v1.Driver
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Driver.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Driver;
        })();

        v1.Location = (function() {

            /**
             * Properties of a Location.
             * @memberof car.v1
             * @interface ILocation
             * @property {number|null} [latitude] Location latitude
             * @property {number|null} [longitude] Location longitude
             */

            /**
             * Constructs a new Location.
             * @memberof car.v1
             * @classdesc Represents a Location.
             * @implements ILocation
             * @constructor
             * @param {car.v1.ILocation=} [properties] Properties to set
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
             * @memberof car.v1.Location
             * @instance
             */
            Location.prototype.latitude = 0;

            /**
             * Location longitude.
             * @member {number} longitude
             * @memberof car.v1.Location
             * @instance
             */
            Location.prototype.longitude = 0;

            /**
             * Decodes a Location message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.Location
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.Location} Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Location.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.Location();
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
             * @memberof car.v1.Location
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.Location} Location
             */
            Location.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.Location)
                    return object;
                let message = new $root.car.v1.Location();
                if (object.latitude != null)
                    message.latitude = Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = Number(object.longitude);
                return message;
            };

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.Location
             * @static
             * @param {car.v1.Location} message Location
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
             * @memberof car.v1.Location
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Location.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Location;
        })();

        v1.Car = (function() {

            /**
             * Properties of a Car.
             * @memberof car.v1
             * @interface ICar
             * @property {car.v1.CarStatus|null} [status] Car status
             * @property {car.v1.IDriver|null} [driver] Car driver
             * @property {car.v1.ILocation|null} [position] Car position
             * @property {string|null} [tripId] Car tripId
             */

            /**
             * Constructs a new Car.
             * @memberof car.v1
             * @classdesc Represents a Car.
             * @implements ICar
             * @constructor
             * @param {car.v1.ICar=} [properties] Properties to set
             */
            function Car(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Car status.
             * @member {car.v1.CarStatus} status
             * @memberof car.v1.Car
             * @instance
             */
            Car.prototype.status = 0;

            /**
             * Car driver.
             * @member {car.v1.IDriver|null|undefined} driver
             * @memberof car.v1.Car
             * @instance
             */
            Car.prototype.driver = null;

            /**
             * Car position.
             * @member {car.v1.ILocation|null|undefined} position
             * @memberof car.v1.Car
             * @instance
             */
            Car.prototype.position = null;

            /**
             * Car tripId.
             * @member {string} tripId
             * @memberof car.v1.Car
             * @instance
             */
            Car.prototype.tripId = "";

            /**
             * Decodes a Car message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.Car
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.Car} Car
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Car.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.Car();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.status = reader.int32();
                        break;
                    case 2:
                        message.driver = $root.car.v1.Driver.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.position = $root.car.v1.Location.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.tripId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a Car message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.Car
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.Car} Car
             */
            Car.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.Car)
                    return object;
                let message = new $root.car.v1.Car();
                switch (object.status) {
                case "CS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "LOCKED":
                case 1:
                    message.status = 1;
                    break;
                case "UNLOCKING":
                case 2:
                    message.status = 2;
                    break;
                case "UNLOCKED":
                case 3:
                    message.status = 3;
                    break;
                case "LOCKING":
                case 4:
                    message.status = 4;
                    break;
                }
                if (object.driver != null) {
                    if (typeof object.driver !== "object")
                        throw TypeError(".car.v1.Car.driver: object expected");
                    message.driver = $root.car.v1.Driver.fromObject(object.driver);
                }
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".car.v1.Car.position: object expected");
                    message.position = $root.car.v1.Location.fromObject(object.position);
                }
                if (object.tripId != null)
                    message.tripId = String(object.tripId);
                return message;
            };

            /**
             * Creates a plain object from a Car message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.Car
             * @static
             * @param {car.v1.Car} message Car
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Car.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.status = options.enums === String ? "CS_NOT_SPECIFIED" : 0;
                    object.driver = null;
                    object.position = null;
                    object.tripId = "";
                }
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.car.v1.CarStatus[message.status] : message.status;
                if (message.driver != null && message.hasOwnProperty("driver"))
                    object.driver = $root.car.v1.Driver.toObject(message.driver, options);
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.car.v1.Location.toObject(message.position, options);
                if (message.tripId != null && message.hasOwnProperty("tripId"))
                    object.tripId = message.tripId;
                return object;
            };

            /**
             * Converts this Car to JSON.
             * @function toJSON
             * @memberof car.v1.Car
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Car.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Car;
        })();

        v1.CreateCarReq = (function() {

            /**
             * Properties of a CreateCarReq.
             * @memberof car.v1
             * @interface ICreateCarReq
             */

            /**
             * Constructs a new CreateCarReq.
             * @memberof car.v1
             * @classdesc Represents a CreateCarReq.
             * @implements ICreateCarReq
             * @constructor
             * @param {car.v1.ICreateCarReq=} [properties] Properties to set
             */
            function CreateCarReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a CreateCarReq message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.CreateCarReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.CreateCarReq} CreateCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateCarReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.CreateCarReq();
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
             * Creates a CreateCarReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.CreateCarReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.CreateCarReq} CreateCarReq
             */
            CreateCarReq.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.CreateCarReq)
                    return object;
                return new $root.car.v1.CreateCarReq();
            };

            /**
             * Creates a plain object from a CreateCarReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.CreateCarReq
             * @static
             * @param {car.v1.CreateCarReq} message CreateCarReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateCarReq.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this CreateCarReq to JSON.
             * @function toJSON
             * @memberof car.v1.CreateCarReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateCarReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateCarReq;
        })();

        v1.GetCarReq = (function() {

            /**
             * Properties of a GetCarReq.
             * @memberof car.v1
             * @interface IGetCarReq
             * @property {string|null} [id] GetCarReq id
             */

            /**
             * Constructs a new GetCarReq.
             * @memberof car.v1
             * @classdesc Represents a GetCarReq.
             * @implements IGetCarReq
             * @constructor
             * @param {car.v1.IGetCarReq=} [properties] Properties to set
             */
            function GetCarReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetCarReq id.
             * @member {string} id
             * @memberof car.v1.GetCarReq
             * @instance
             */
            GetCarReq.prototype.id = "";

            /**
             * Decodes a GetCarReq message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.GetCarReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.GetCarReq} GetCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetCarReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.GetCarReq();
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
             * Creates a GetCarReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.GetCarReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.GetCarReq} GetCarReq
             */
            GetCarReq.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.GetCarReq)
                    return object;
                let message = new $root.car.v1.GetCarReq();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a GetCarReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.GetCarReq
             * @static
             * @param {car.v1.GetCarReq} message GetCarReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetCarReq.toObject = function toObject(message, options) {
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
             * Converts this GetCarReq to JSON.
             * @function toJSON
             * @memberof car.v1.GetCarReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetCarReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetCarReq;
        })();

        v1.GetCarsReq = (function() {

            /**
             * Properties of a GetCarsReq.
             * @memberof car.v1
             * @interface IGetCarsReq
             */

            /**
             * Constructs a new GetCarsReq.
             * @memberof car.v1
             * @classdesc Represents a GetCarsReq.
             * @implements IGetCarsReq
             * @constructor
             * @param {car.v1.IGetCarsReq=} [properties] Properties to set
             */
            function GetCarsReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a GetCarsReq message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.GetCarsReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.GetCarsReq} GetCarsReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetCarsReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.GetCarsReq();
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
             * Creates a GetCarsReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.GetCarsReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.GetCarsReq} GetCarsReq
             */
            GetCarsReq.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.GetCarsReq)
                    return object;
                return new $root.car.v1.GetCarsReq();
            };

            /**
             * Creates a plain object from a GetCarsReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.GetCarsReq
             * @static
             * @param {car.v1.GetCarsReq} message GetCarsReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetCarsReq.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this GetCarsReq to JSON.
             * @function toJSON
             * @memberof car.v1.GetCarsReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetCarsReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetCarsReq;
        })();

        v1.GetCarsRsp = (function() {

            /**
             * Properties of a GetCarsRsp.
             * @memberof car.v1
             * @interface IGetCarsRsp
             * @property {Array.<car.v1.ICarEntity>|null} [cars] GetCarsRsp cars
             */

            /**
             * Constructs a new GetCarsRsp.
             * @memberof car.v1
             * @classdesc Represents a GetCarsRsp.
             * @implements IGetCarsRsp
             * @constructor
             * @param {car.v1.IGetCarsRsp=} [properties] Properties to set
             */
            function GetCarsRsp(properties) {
                this.cars = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetCarsRsp cars.
             * @member {Array.<car.v1.ICarEntity>} cars
             * @memberof car.v1.GetCarsRsp
             * @instance
             */
            GetCarsRsp.prototype.cars = $util.emptyArray;

            /**
             * Decodes a GetCarsRsp message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.GetCarsRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.GetCarsRsp} GetCarsRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetCarsRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.GetCarsRsp();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.cars && message.cars.length))
                            message.cars = [];
                        message.cars.push($root.car.v1.CarEntity.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a GetCarsRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.GetCarsRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.GetCarsRsp} GetCarsRsp
             */
            GetCarsRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.GetCarsRsp)
                    return object;
                let message = new $root.car.v1.GetCarsRsp();
                if (object.cars) {
                    if (!Array.isArray(object.cars))
                        throw TypeError(".car.v1.GetCarsRsp.cars: array expected");
                    message.cars = [];
                    for (let i = 0; i < object.cars.length; ++i) {
                        if (typeof object.cars[i] !== "object")
                            throw TypeError(".car.v1.GetCarsRsp.cars: object expected");
                        message.cars[i] = $root.car.v1.CarEntity.fromObject(object.cars[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetCarsRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.GetCarsRsp
             * @static
             * @param {car.v1.GetCarsRsp} message GetCarsRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetCarsRsp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.cars = [];
                if (message.cars && message.cars.length) {
                    object.cars = [];
                    for (let j = 0; j < message.cars.length; ++j)
                        object.cars[j] = $root.car.v1.CarEntity.toObject(message.cars[j], options);
                }
                return object;
            };

            /**
             * Converts this GetCarsRsp to JSON.
             * @function toJSON
             * @memberof car.v1.GetCarsRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetCarsRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetCarsRsp;
        })();

        v1.LockCarReq = (function() {

            /**
             * Properties of a LockCarReq.
             * @memberof car.v1
             * @interface ILockCarReq
             * @property {string|null} [id] LockCarReq id
             */

            /**
             * Constructs a new LockCarReq.
             * @memberof car.v1
             * @classdesc Represents a LockCarReq.
             * @implements ILockCarReq
             * @constructor
             * @param {car.v1.ILockCarReq=} [properties] Properties to set
             */
            function LockCarReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LockCarReq id.
             * @member {string} id
             * @memberof car.v1.LockCarReq
             * @instance
             */
            LockCarReq.prototype.id = "";

            /**
             * Decodes a LockCarReq message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.LockCarReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.LockCarReq} LockCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LockCarReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.LockCarReq();
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
             * Creates a LockCarReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.LockCarReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.LockCarReq} LockCarReq
             */
            LockCarReq.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.LockCarReq)
                    return object;
                let message = new $root.car.v1.LockCarReq();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a LockCarReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.LockCarReq
             * @static
             * @param {car.v1.LockCarReq} message LockCarReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LockCarReq.toObject = function toObject(message, options) {
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
             * Converts this LockCarReq to JSON.
             * @function toJSON
             * @memberof car.v1.LockCarReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LockCarReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LockCarReq;
        })();

        v1.LockCarRsp = (function() {

            /**
             * Properties of a LockCarRsp.
             * @memberof car.v1
             * @interface ILockCarRsp
             */

            /**
             * Constructs a new LockCarRsp.
             * @memberof car.v1
             * @classdesc Represents a LockCarRsp.
             * @implements ILockCarRsp
             * @constructor
             * @param {car.v1.ILockCarRsp=} [properties] Properties to set
             */
            function LockCarRsp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes a LockCarRsp message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.LockCarRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.LockCarRsp} LockCarRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LockCarRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.LockCarRsp();
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
             * Creates a LockCarRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.LockCarRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.LockCarRsp} LockCarRsp
             */
            LockCarRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.LockCarRsp)
                    return object;
                return new $root.car.v1.LockCarRsp();
            };

            /**
             * Creates a plain object from a LockCarRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.LockCarRsp
             * @static
             * @param {car.v1.LockCarRsp} message LockCarRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LockCarRsp.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this LockCarRsp to JSON.
             * @function toJSON
             * @memberof car.v1.LockCarRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LockCarRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LockCarRsp;
        })();

        v1.UnlockCarReq = (function() {

            /**
             * Properties of an UnlockCarReq.
             * @memberof car.v1
             * @interface IUnlockCarReq
             * @property {string|null} [id] UnlockCarReq id
             * @property {car.v1.IDriver|null} [driver] UnlockCarReq driver
             * @property {string|null} [tripId] UnlockCarReq tripId
             */

            /**
             * Constructs a new UnlockCarReq.
             * @memberof car.v1
             * @classdesc Represents an UnlockCarReq.
             * @implements IUnlockCarReq
             * @constructor
             * @param {car.v1.IUnlockCarReq=} [properties] Properties to set
             */
            function UnlockCarReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UnlockCarReq id.
             * @member {string} id
             * @memberof car.v1.UnlockCarReq
             * @instance
             */
            UnlockCarReq.prototype.id = "";

            /**
             * UnlockCarReq driver.
             * @member {car.v1.IDriver|null|undefined} driver
             * @memberof car.v1.UnlockCarReq
             * @instance
             */
            UnlockCarReq.prototype.driver = null;

            /**
             * UnlockCarReq tripId.
             * @member {string} tripId
             * @memberof car.v1.UnlockCarReq
             * @instance
             */
            UnlockCarReq.prototype.tripId = "";

            /**
             * Decodes an UnlockCarReq message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.UnlockCarReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.UnlockCarReq} UnlockCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnlockCarReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.UnlockCarReq();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.driver = $root.car.v1.Driver.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.tripId = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an UnlockCarReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.UnlockCarReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.UnlockCarReq} UnlockCarReq
             */
            UnlockCarReq.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.UnlockCarReq)
                    return object;
                let message = new $root.car.v1.UnlockCarReq();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.driver != null) {
                    if (typeof object.driver !== "object")
                        throw TypeError(".car.v1.UnlockCarReq.driver: object expected");
                    message.driver = $root.car.v1.Driver.fromObject(object.driver);
                }
                if (object.tripId != null)
                    message.tripId = String(object.tripId);
                return message;
            };

            /**
             * Creates a plain object from an UnlockCarReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.UnlockCarReq
             * @static
             * @param {car.v1.UnlockCarReq} message UnlockCarReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnlockCarReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.driver = null;
                    object.tripId = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.driver != null && message.hasOwnProperty("driver"))
                    object.driver = $root.car.v1.Driver.toObject(message.driver, options);
                if (message.tripId != null && message.hasOwnProperty("tripId"))
                    object.tripId = message.tripId;
                return object;
            };

            /**
             * Converts this UnlockCarReq to JSON.
             * @function toJSON
             * @memberof car.v1.UnlockCarReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnlockCarReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UnlockCarReq;
        })();

        v1.UnlockCarRsp = (function() {

            /**
             * Properties of an UnlockCarRsp.
             * @memberof car.v1
             * @interface IUnlockCarRsp
             */

            /**
             * Constructs a new UnlockCarRsp.
             * @memberof car.v1
             * @classdesc Represents an UnlockCarRsp.
             * @implements IUnlockCarRsp
             * @constructor
             * @param {car.v1.IUnlockCarRsp=} [properties] Properties to set
             */
            function UnlockCarRsp(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes an UnlockCarRsp message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.UnlockCarRsp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.UnlockCarRsp} UnlockCarRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UnlockCarRsp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.UnlockCarRsp();
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
             * Creates an UnlockCarRsp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.UnlockCarRsp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.UnlockCarRsp} UnlockCarRsp
             */
            UnlockCarRsp.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.UnlockCarRsp)
                    return object;
                return new $root.car.v1.UnlockCarRsp();
            };

            /**
             * Creates a plain object from an UnlockCarRsp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.UnlockCarRsp
             * @static
             * @param {car.v1.UnlockCarRsp} message UnlockCarRsp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UnlockCarRsp.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this UnlockCarRsp to JSON.
             * @function toJSON
             * @memberof car.v1.UnlockCarRsp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UnlockCarRsp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UnlockCarRsp;
        })();

        v1.UpdateCarReq = (function() {

            /**
             * Properties of an UpdateCarReq.
             * @memberof car.v1
             * @interface IUpdateCarReq
             * @property {string|null} [id] UpdateCarReq id
             * @property {car.v1.CarStatus|null} [status] UpdateCarReq status
             * @property {car.v1.ILocation|null} [position] UpdateCarReq position
             */

            /**
             * Constructs a new UpdateCarReq.
             * @memberof car.v1
             * @classdesc Represents an UpdateCarReq.
             * @implements IUpdateCarReq
             * @constructor
             * @param {car.v1.IUpdateCarReq=} [properties] Properties to set
             */
            function UpdateCarReq(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateCarReq id.
             * @member {string} id
             * @memberof car.v1.UpdateCarReq
             * @instance
             */
            UpdateCarReq.prototype.id = "";

            /**
             * UpdateCarReq status.
             * @member {car.v1.CarStatus} status
             * @memberof car.v1.UpdateCarReq
             * @instance
             */
            UpdateCarReq.prototype.status = 0;

            /**
             * UpdateCarReq position.
             * @member {car.v1.ILocation|null|undefined} position
             * @memberof car.v1.UpdateCarReq
             * @instance
             */
            UpdateCarReq.prototype.position = null;

            /**
             * Decodes an UpdateCarReq message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.UpdateCarReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.UpdateCarReq} UpdateCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpdateCarReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.UpdateCarReq();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.status = reader.int32();
                        break;
                    case 3:
                        message.position = $root.car.v1.Location.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates an UpdateCarReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.UpdateCarReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.UpdateCarReq} UpdateCarReq
             */
            UpdateCarReq.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.UpdateCarReq)
                    return object;
                let message = new $root.car.v1.UpdateCarReq();
                if (object.id != null)
                    message.id = String(object.id);
                switch (object.status) {
                case "CS_NOT_SPECIFIED":
                case 0:
                    message.status = 0;
                    break;
                case "LOCKED":
                case 1:
                    message.status = 1;
                    break;
                case "UNLOCKING":
                case 2:
                    message.status = 2;
                    break;
                case "UNLOCKED":
                case 3:
                    message.status = 3;
                    break;
                case "LOCKING":
                case 4:
                    message.status = 4;
                    break;
                }
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".car.v1.UpdateCarReq.position: object expected");
                    message.position = $root.car.v1.Location.fromObject(object.position);
                }
                return message;
            };

            /**
             * Creates a plain object from an UpdateCarReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.UpdateCarReq
             * @static
             * @param {car.v1.UpdateCarReq} message UpdateCarReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateCarReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.status = options.enums === String ? "CS_NOT_SPECIFIED" : 0;
                    object.position = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.status != null && message.hasOwnProperty("status"))
                    object.status = options.enums === String ? $root.car.v1.CarStatus[message.status] : message.status;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.car.v1.Location.toObject(message.position, options);
                return object;
            };

            /**
             * Converts this UpdateCarReq to JSON.
             * @function toJSON
             * @memberof car.v1.UpdateCarReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateCarReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateCarReq;
        })();

        v1.UpdateCarResponse = (function() {

            /**
             * Properties of an UpdateCarResponse.
             * @memberof car.v1
             * @interface IUpdateCarResponse
             */

            /**
             * Constructs a new UpdateCarResponse.
             * @memberof car.v1
             * @classdesc Represents an UpdateCarResponse.
             * @implements IUpdateCarResponse
             * @constructor
             * @param {car.v1.IUpdateCarResponse=} [properties] Properties to set
             */
            function UpdateCarResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Decodes an UpdateCarResponse message from the specified reader or buffer.
             * @function decode
             * @memberof car.v1.UpdateCarResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {car.v1.UpdateCarResponse} UpdateCarResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpdateCarResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.car.v1.UpdateCarResponse();
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
             * Creates an UpdateCarResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof car.v1.UpdateCarResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {car.v1.UpdateCarResponse} UpdateCarResponse
             */
            UpdateCarResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.car.v1.UpdateCarResponse)
                    return object;
                return new $root.car.v1.UpdateCarResponse();
            };

            /**
             * Creates a plain object from an UpdateCarResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof car.v1.UpdateCarResponse
             * @static
             * @param {car.v1.UpdateCarResponse} message UpdateCarResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateCarResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this UpdateCarResponse to JSON.
             * @function toJSON
             * @memberof car.v1.UpdateCarResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateCarResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UpdateCarResponse;
        })();

        v1.CarService = (function() {

            /**
             * Constructs a new CarService service.
             * @memberof car.v1
             * @classdesc Represents a CarService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function CarService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (CarService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = CarService;

            /**
             * Callback as used by {@link car.v1.CarService#createCar}.
             * @memberof car.v1.CarService
             * @typedef CreateCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.CarEntity} [response] CarEntity
             */

            /**
             * Calls CreateCar.
             * @function createCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.ICreateCarReq} request CreateCarReq message or plain object
             * @param {car.v1.CarService.CreateCarCallback} callback Node-style callback called with the error, if any, and CarEntity
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.createCar = function createCar(request, callback) {
                return this.rpcCall(createCar, $root.car.v1.CreateCarReq, $root.car.v1.CarEntity, request, callback);
            }, "name", { value: "CreateCar" });

            /**
             * Calls CreateCar.
             * @function createCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.ICreateCarReq} request CreateCarReq message or plain object
             * @returns {Promise<car.v1.CarEntity>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#getCar}.
             * @memberof car.v1.CarService
             * @typedef GetCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.Car} [response] Car
             */

            /**
             * Calls GetCar.
             * @function getCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IGetCarReq} request GetCarReq message or plain object
             * @param {car.v1.CarService.GetCarCallback} callback Node-style callback called with the error, if any, and Car
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.getCar = function getCar(request, callback) {
                return this.rpcCall(getCar, $root.car.v1.GetCarReq, $root.car.v1.Car, request, callback);
            }, "name", { value: "GetCar" });

            /**
             * Calls GetCar.
             * @function getCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IGetCarReq} request GetCarReq message or plain object
             * @returns {Promise<car.v1.Car>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#getCars}.
             * @memberof car.v1.CarService
             * @typedef GetCarsCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.GetCarsRsp} [response] GetCarsRsp
             */

            /**
             * Calls GetCars.
             * @function getCars
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IGetCarsReq} request GetCarsReq message or plain object
             * @param {car.v1.CarService.GetCarsCallback} callback Node-style callback called with the error, if any, and GetCarsRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.getCars = function getCars(request, callback) {
                return this.rpcCall(getCars, $root.car.v1.GetCarsReq, $root.car.v1.GetCarsRsp, request, callback);
            }, "name", { value: "GetCars" });

            /**
             * Calls GetCars.
             * @function getCars
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IGetCarsReq} request GetCarsReq message or plain object
             * @returns {Promise<car.v1.GetCarsRsp>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#lockCar}.
             * @memberof car.v1.CarService
             * @typedef LockCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.LockCarRsp} [response] LockCarRsp
             */

            /**
             * Calls LockCar.
             * @function lockCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.ILockCarReq} request LockCarReq message or plain object
             * @param {car.v1.CarService.LockCarCallback} callback Node-style callback called with the error, if any, and LockCarRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.lockCar = function lockCar(request, callback) {
                return this.rpcCall(lockCar, $root.car.v1.LockCarReq, $root.car.v1.LockCarRsp, request, callback);
            }, "name", { value: "LockCar" });

            /**
             * Calls LockCar.
             * @function lockCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.ILockCarReq} request LockCarReq message or plain object
             * @returns {Promise<car.v1.LockCarRsp>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#unlockCar}.
             * @memberof car.v1.CarService
             * @typedef UnlockCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.UnlockCarRsp} [response] UnlockCarRsp
             */

            /**
             * Calls UnlockCar.
             * @function unlockCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IUnlockCarReq} request UnlockCarReq message or plain object
             * @param {car.v1.CarService.UnlockCarCallback} callback Node-style callback called with the error, if any, and UnlockCarRsp
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.unlockCar = function unlockCar(request, callback) {
                return this.rpcCall(unlockCar, $root.car.v1.UnlockCarReq, $root.car.v1.UnlockCarRsp, request, callback);
            }, "name", { value: "UnlockCar" });

            /**
             * Calls UnlockCar.
             * @function unlockCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IUnlockCarReq} request UnlockCarReq message or plain object
             * @returns {Promise<car.v1.UnlockCarRsp>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link car.v1.CarService#updateCar}.
             * @memberof car.v1.CarService
             * @typedef UpdateCarCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {car.v1.UpdateCarResponse} [response] UpdateCarResponse
             */

            /**
             * Calls UpdateCar.
             * @function updateCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IUpdateCarReq} request UpdateCarReq message or plain object
             * @param {car.v1.CarService.UpdateCarCallback} callback Node-style callback called with the error, if any, and UpdateCarResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(CarService.prototype.updateCar = function updateCar(request, callback) {
                return this.rpcCall(updateCar, $root.car.v1.UpdateCarReq, $root.car.v1.UpdateCarResponse, request, callback);
            }, "name", { value: "UpdateCar" });

            /**
             * Calls UpdateCar.
             * @function updateCar
             * @memberof car.v1.CarService
             * @instance
             * @param {car.v1.IUpdateCarReq} request UpdateCarReq message or plain object
             * @returns {Promise<car.v1.UpdateCarResponse>} Promise
             * @variation 2
             */

            return CarService;
        })();

        return v1;
    })();

    return car;
})();