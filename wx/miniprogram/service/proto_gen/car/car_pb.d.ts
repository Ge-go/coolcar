import * as $protobuf from "protobufjs";
/** Namespace car. */
export namespace car {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a CarEntity. */
        interface ICarEntity {

            /** CarEntity id */
            id?: (string|null);

            /** CarEntity car */
            car?: (car.v1.ICar|null);
        }

        /** Represents a CarEntity. */
        class CarEntity implements ICarEntity {

            /**
             * Constructs a new CarEntity.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ICarEntity);

            /** CarEntity id. */
            public id: string;

            /** CarEntity car. */
            public car?: (car.v1.ICar|null);

            /**
             * Decodes a CarEntity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CarEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.CarEntity;

            /**
             * Creates a CarEntity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CarEntity
             */
            public static fromObject(object: { [k: string]: any }): car.v1.CarEntity;

            /**
             * Creates a plain object from a CarEntity message. Also converts values to other types if specified.
             * @param message CarEntity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.CarEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CarEntity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** CarStatus enum. */
        enum CarStatus {
            CS_NOT_SPECIFIED = 0,
            LOCKED = 1,
            UNLOCKING = 2,
            UNLOCKED = 3,
            LOCKING = 4
        }

        /** Properties of a Driver. */
        interface IDriver {

            /** Driver id */
            id?: (string|null);

            /** Driver avatarUrl */
            avatarUrl?: (string|null);
        }

        /** Represents a Driver. */
        class Driver implements IDriver {

            /**
             * Constructs a new Driver.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IDriver);

            /** Driver id. */
            public id: string;

            /** Driver avatarUrl. */
            public avatarUrl: string;

            /**
             * Decodes a Driver message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Driver
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.Driver;

            /**
             * Creates a Driver message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Driver
             */
            public static fromObject(object: { [k: string]: any }): car.v1.Driver;

            /**
             * Creates a plain object from a Driver message. Also converts values to other types if specified.
             * @param message Driver
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.Driver, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Driver to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Location. */
        interface ILocation {

            /** Location latitude */
            latitude?: (number|null);

            /** Location longitude */
            longitude?: (number|null);
        }

        /** Represents a Location. */
        class Location implements ILocation {

            /**
             * Constructs a new Location.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ILocation);

            /** Location latitude. */
            public latitude: number;

            /** Location longitude. */
            public longitude: number;

            /**
             * Decodes a Location message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.Location;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Location
             */
            public static fromObject(object: { [k: string]: any }): car.v1.Location;

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @param message Location
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Location to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Car. */
        interface ICar {

            /** Car status */
            status?: (car.v1.CarStatus|null);

            /** Car driver */
            driver?: (car.v1.IDriver|null);

            /** Car position */
            position?: (car.v1.ILocation|null);

            /** Car tripId */
            tripId?: (string|null);
        }

        /** Represents a Car. */
        class Car implements ICar {

            /**
             * Constructs a new Car.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ICar);

            /** Car status. */
            public status: car.v1.CarStatus;

            /** Car driver. */
            public driver?: (car.v1.IDriver|null);

            /** Car position. */
            public position?: (car.v1.ILocation|null);

            /** Car tripId. */
            public tripId: string;

            /**
             * Decodes a Car message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Car
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.Car;

            /**
             * Creates a Car message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Car
             */
            public static fromObject(object: { [k: string]: any }): car.v1.Car;

            /**
             * Creates a plain object from a Car message. Also converts values to other types if specified.
             * @param message Car
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.Car, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Car to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateCarReq. */
        interface ICreateCarReq {
        }

        /** Represents a CreateCarReq. */
        class CreateCarReq implements ICreateCarReq {

            /**
             * Constructs a new CreateCarReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ICreateCarReq);

            /**
             * Decodes a CreateCarReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.CreateCarReq;

            /**
             * Creates a CreateCarReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateCarReq
             */
            public static fromObject(object: { [k: string]: any }): car.v1.CreateCarReq;

            /**
             * Creates a plain object from a CreateCarReq message. Also converts values to other types if specified.
             * @param message CreateCarReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.CreateCarReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateCarReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetCarReq. */
        interface IGetCarReq {

            /** GetCarReq id */
            id?: (string|null);
        }

        /** Represents a GetCarReq. */
        class GetCarReq implements IGetCarReq {

            /**
             * Constructs a new GetCarReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IGetCarReq);

            /** GetCarReq id. */
            public id: string;

            /**
             * Decodes a GetCarReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.GetCarReq;

            /**
             * Creates a GetCarReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetCarReq
             */
            public static fromObject(object: { [k: string]: any }): car.v1.GetCarReq;

            /**
             * Creates a plain object from a GetCarReq message. Also converts values to other types if specified.
             * @param message GetCarReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.GetCarReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetCarReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetCarsReq. */
        interface IGetCarsReq {
        }

        /** Represents a GetCarsReq. */
        class GetCarsReq implements IGetCarsReq {

            /**
             * Constructs a new GetCarsReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IGetCarsReq);

            /**
             * Decodes a GetCarsReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetCarsReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.GetCarsReq;

            /**
             * Creates a GetCarsReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetCarsReq
             */
            public static fromObject(object: { [k: string]: any }): car.v1.GetCarsReq;

            /**
             * Creates a plain object from a GetCarsReq message. Also converts values to other types if specified.
             * @param message GetCarsReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.GetCarsReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetCarsReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetCarsRsp. */
        interface IGetCarsRsp {

            /** GetCarsRsp cars */
            cars?: (car.v1.ICarEntity[]|null);
        }

        /** Represents a GetCarsRsp. */
        class GetCarsRsp implements IGetCarsRsp {

            /**
             * Constructs a new GetCarsRsp.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IGetCarsRsp);

            /** GetCarsRsp cars. */
            public cars: car.v1.ICarEntity[];

            /**
             * Decodes a GetCarsRsp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetCarsRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.GetCarsRsp;

            /**
             * Creates a GetCarsRsp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetCarsRsp
             */
            public static fromObject(object: { [k: string]: any }): car.v1.GetCarsRsp;

            /**
             * Creates a plain object from a GetCarsRsp message. Also converts values to other types if specified.
             * @param message GetCarsRsp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.GetCarsRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetCarsRsp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LockCarReq. */
        interface ILockCarReq {

            /** LockCarReq id */
            id?: (string|null);
        }

        /** Represents a LockCarReq. */
        class LockCarReq implements ILockCarReq {

            /**
             * Constructs a new LockCarReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ILockCarReq);

            /** LockCarReq id. */
            public id: string;

            /**
             * Decodes a LockCarReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LockCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.LockCarReq;

            /**
             * Creates a LockCarReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LockCarReq
             */
            public static fromObject(object: { [k: string]: any }): car.v1.LockCarReq;

            /**
             * Creates a plain object from a LockCarReq message. Also converts values to other types if specified.
             * @param message LockCarReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.LockCarReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LockCarReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LockCarRsp. */
        interface ILockCarRsp {
        }

        /** Represents a LockCarRsp. */
        class LockCarRsp implements ILockCarRsp {

            /**
             * Constructs a new LockCarRsp.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ILockCarRsp);

            /**
             * Decodes a LockCarRsp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LockCarRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.LockCarRsp;

            /**
             * Creates a LockCarRsp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LockCarRsp
             */
            public static fromObject(object: { [k: string]: any }): car.v1.LockCarRsp;

            /**
             * Creates a plain object from a LockCarRsp message. Also converts values to other types if specified.
             * @param message LockCarRsp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.LockCarRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LockCarRsp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UnlockCarReq. */
        interface IUnlockCarReq {

            /** UnlockCarReq id */
            id?: (string|null);

            /** UnlockCarReq driver */
            driver?: (car.v1.IDriver|null);

            /** UnlockCarReq tripId */
            tripId?: (string|null);
        }

        /** Represents an UnlockCarReq. */
        class UnlockCarReq implements IUnlockCarReq {

            /**
             * Constructs a new UnlockCarReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IUnlockCarReq);

            /** UnlockCarReq id. */
            public id: string;

            /** UnlockCarReq driver. */
            public driver?: (car.v1.IDriver|null);

            /** UnlockCarReq tripId. */
            public tripId: string;

            /**
             * Decodes an UnlockCarReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnlockCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.UnlockCarReq;

            /**
             * Creates an UnlockCarReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnlockCarReq
             */
            public static fromObject(object: { [k: string]: any }): car.v1.UnlockCarReq;

            /**
             * Creates a plain object from an UnlockCarReq message. Also converts values to other types if specified.
             * @param message UnlockCarReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.UnlockCarReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnlockCarReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UnlockCarRsp. */
        interface IUnlockCarRsp {
        }

        /** Represents an UnlockCarRsp. */
        class UnlockCarRsp implements IUnlockCarRsp {

            /**
             * Constructs a new UnlockCarRsp.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IUnlockCarRsp);

            /**
             * Decodes an UnlockCarRsp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnlockCarRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.UnlockCarRsp;

            /**
             * Creates an UnlockCarRsp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnlockCarRsp
             */
            public static fromObject(object: { [k: string]: any }): car.v1.UnlockCarRsp;

            /**
             * Creates a plain object from an UnlockCarRsp message. Also converts values to other types if specified.
             * @param message UnlockCarRsp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.UnlockCarRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnlockCarRsp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UpdateCarReq. */
        interface IUpdateCarReq {

            /** UpdateCarReq id */
            id?: (string|null);

            /** UpdateCarReq status */
            status?: (car.v1.CarStatus|null);

            /** UpdateCarReq position */
            position?: (car.v1.ILocation|null);
        }

        /** Represents an UpdateCarReq. */
        class UpdateCarReq implements IUpdateCarReq {

            /**
             * Constructs a new UpdateCarReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IUpdateCarReq);

            /** UpdateCarReq id. */
            public id: string;

            /** UpdateCarReq status. */
            public status: car.v1.CarStatus;

            /** UpdateCarReq position. */
            public position?: (car.v1.ILocation|null);

            /**
             * Decodes an UpdateCarReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UpdateCarReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.UpdateCarReq;

            /**
             * Creates an UpdateCarReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateCarReq
             */
            public static fromObject(object: { [k: string]: any }): car.v1.UpdateCarReq;

            /**
             * Creates a plain object from an UpdateCarReq message. Also converts values to other types if specified.
             * @param message UpdateCarReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.UpdateCarReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateCarReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UpdateCarResponse. */
        interface IUpdateCarResponse {
        }

        /** Represents an UpdateCarResponse. */
        class UpdateCarResponse implements IUpdateCarResponse {

            /**
             * Constructs a new UpdateCarResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IUpdateCarResponse);

            /**
             * Decodes an UpdateCarResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UpdateCarResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.UpdateCarResponse;

            /**
             * Creates an UpdateCarResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateCarResponse
             */
            public static fromObject(object: { [k: string]: any }): car.v1.UpdateCarResponse;

            /**
             * Creates a plain object from an UpdateCarResponse message. Also converts values to other types if specified.
             * @param message UpdateCarResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.UpdateCarResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateCarResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a CarService */
        class CarService extends $protobuf.rpc.Service {

            /**
             * Constructs a new CarService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls CreateCar.
             * @param request CreateCarReq message or plain object
             * @param callback Node-style callback called with the error, if any, and CarEntity
             */
            public createCar(request: car.v1.ICreateCarReq, callback: car.v1.CarService.CreateCarCallback): void;

            /**
             * Calls CreateCar.
             * @param request CreateCarReq message or plain object
             * @returns Promise
             */
            public createCar(request: car.v1.ICreateCarReq): Promise<car.v1.CarEntity>;

            /**
             * Calls GetCar.
             * @param request GetCarReq message or plain object
             * @param callback Node-style callback called with the error, if any, and Car
             */
            public getCar(request: car.v1.IGetCarReq, callback: car.v1.CarService.GetCarCallback): void;

            /**
             * Calls GetCar.
             * @param request GetCarReq message or plain object
             * @returns Promise
             */
            public getCar(request: car.v1.IGetCarReq): Promise<car.v1.Car>;

            /**
             * Calls GetCars.
             * @param request GetCarsReq message or plain object
             * @param callback Node-style callback called with the error, if any, and GetCarsRsp
             */
            public getCars(request: car.v1.IGetCarsReq, callback: car.v1.CarService.GetCarsCallback): void;

            /**
             * Calls GetCars.
             * @param request GetCarsReq message or plain object
             * @returns Promise
             */
            public getCars(request: car.v1.IGetCarsReq): Promise<car.v1.GetCarsRsp>;

            /**
             * Calls LockCar.
             * @param request LockCarReq message or plain object
             * @param callback Node-style callback called with the error, if any, and LockCarRsp
             */
            public lockCar(request: car.v1.ILockCarReq, callback: car.v1.CarService.LockCarCallback): void;

            /**
             * Calls LockCar.
             * @param request LockCarReq message or plain object
             * @returns Promise
             */
            public lockCar(request: car.v1.ILockCarReq): Promise<car.v1.LockCarRsp>;

            /**
             * Calls UnlockCar.
             * @param request UnlockCarReq message or plain object
             * @param callback Node-style callback called with the error, if any, and UnlockCarRsp
             */
            public unlockCar(request: car.v1.IUnlockCarReq, callback: car.v1.CarService.UnlockCarCallback): void;

            /**
             * Calls UnlockCar.
             * @param request UnlockCarReq message or plain object
             * @returns Promise
             */
            public unlockCar(request: car.v1.IUnlockCarReq): Promise<car.v1.UnlockCarRsp>;

            /**
             * Calls UpdateCar.
             * @param request UpdateCarReq message or plain object
             * @param callback Node-style callback called with the error, if any, and UpdateCarResponse
             */
            public updateCar(request: car.v1.IUpdateCarReq, callback: car.v1.CarService.UpdateCarCallback): void;

            /**
             * Calls UpdateCar.
             * @param request UpdateCarReq message or plain object
             * @returns Promise
             */
            public updateCar(request: car.v1.IUpdateCarReq): Promise<car.v1.UpdateCarResponse>;
        }

        namespace CarService {

            /**
             * Callback as used by {@link car.v1.CarService#createCar}.
             * @param error Error, if any
             * @param [response] CarEntity
             */
            type CreateCarCallback = (error: (Error|null), response?: car.v1.CarEntity) => void;

            /**
             * Callback as used by {@link car.v1.CarService#getCar}.
             * @param error Error, if any
             * @param [response] Car
             */
            type GetCarCallback = (error: (Error|null), response?: car.v1.Car) => void;

            /**
             * Callback as used by {@link car.v1.CarService#getCars}.
             * @param error Error, if any
             * @param [response] GetCarsRsp
             */
            type GetCarsCallback = (error: (Error|null), response?: car.v1.GetCarsRsp) => void;

            /**
             * Callback as used by {@link car.v1.CarService#lockCar}.
             * @param error Error, if any
             * @param [response] LockCarRsp
             */
            type LockCarCallback = (error: (Error|null), response?: car.v1.LockCarRsp) => void;

            /**
             * Callback as used by {@link car.v1.CarService#unlockCar}.
             * @param error Error, if any
             * @param [response] UnlockCarRsp
             */
            type UnlockCarCallback = (error: (Error|null), response?: car.v1.UnlockCarRsp) => void;

            /**
             * Callback as used by {@link car.v1.CarService#updateCar}.
             * @param error Error, if any
             * @param [response] UpdateCarResponse
             */
            type UpdateCarCallback = (error: (Error|null), response?: car.v1.UpdateCarResponse) => void;
        }
    }
}
