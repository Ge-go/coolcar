import * as $protobuf from "protobufjs";
/** Namespace rental. */
export namespace rental {

    /** Namespace v1. */
    namespace v1 {

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
            constructor(properties?: rental.v1.ILocation);

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
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.Location;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Location
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.Location;

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @param message Location
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Location to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LocationStatus. */
        interface ILocationStatus {

            /** LocationStatus location */
            location?: (rental.v1.ILocation|null);

            /** LocationStatus feeCent */
            feeCent?: (number|null);

            /** LocationStatus kmDriven */
            kmDriven?: (number|null);

            /** LocationStatus poiName */
            poiName?: (string|null);

            /** LocationStatus timestampSec */
            timestampSec?: (number|null);
        }

        /** Represents a LocationStatus. */
        class LocationStatus implements ILocationStatus {

            /**
             * Constructs a new LocationStatus.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ILocationStatus);

            /** LocationStatus location. */
            public location?: (rental.v1.ILocation|null);

            /** LocationStatus feeCent. */
            public feeCent: number;

            /** LocationStatus kmDriven. */
            public kmDriven: number;

            /** LocationStatus poiName. */
            public poiName: string;

            /** LocationStatus timestampSec. */
            public timestampSec: number;

            /**
             * Decodes a LocationStatus message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LocationStatus
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.LocationStatus;

            /**
             * Creates a LocationStatus message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LocationStatus
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.LocationStatus;

            /**
             * Creates a plain object from a LocationStatus message. Also converts values to other types if specified.
             * @param message LocationStatus
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.LocationStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LocationStatus to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** TripStatus enum. */
        enum TripStatus {
            TS_NOT_SPECIFIED = 0,
            IN_PROGRESS = 1,
            FINISHED = 2
        }

        /** Properties of a TripEntity. */
        interface ITripEntity {

            /** TripEntity id */
            id?: (string|null);

            /** TripEntity trip */
            trip?: (rental.v1.ITrip|null);
        }

        /** Represents a TripEntity. */
        class TripEntity implements ITripEntity {

            /**
             * Constructs a new TripEntity.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ITripEntity);

            /** TripEntity id. */
            public id: string;

            /** TripEntity trip. */
            public trip?: (rental.v1.ITrip|null);

            /**
             * Decodes a TripEntity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TripEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.TripEntity;

            /**
             * Creates a TripEntity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TripEntity
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.TripEntity;

            /**
             * Creates a plain object from a TripEntity message. Also converts values to other types if specified.
             * @param message TripEntity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.TripEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TripEntity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Trip. */
        interface ITrip {

            /** Trip accountId */
            accountId?: (string|null);

            /** Trip carId */
            carId?: (string|null);

            /** Trip start */
            start?: (rental.v1.ILocationStatus|null);

            /** Trip current */
            current?: (rental.v1.ILocationStatus|null);

            /** Trip end */
            end?: (rental.v1.ILocationStatus|null);

            /** Trip status */
            status?: (rental.v1.TripStatus|null);

            /** Trip identityId */
            identityId?: (string|null);
        }

        /** Represents a Trip. */
        class Trip implements ITrip {

            /**
             * Constructs a new Trip.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ITrip);

            /** Trip accountId. */
            public accountId: string;

            /** Trip carId. */
            public carId: string;

            /** Trip start. */
            public start?: (rental.v1.ILocationStatus|null);

            /** Trip current. */
            public current?: (rental.v1.ILocationStatus|null);

            /** Trip end. */
            public end?: (rental.v1.ILocationStatus|null);

            /** Trip status. */
            public status: rental.v1.TripStatus;

            /** Trip identityId. */
            public identityId: string;

            /**
             * Decodes a Trip message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Trip
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.Trip;

            /**
             * Creates a Trip message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Trip
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.Trip;

            /**
             * Creates a plain object from a Trip message. Also converts values to other types if specified.
             * @param message Trip
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.Trip, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Trip to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateTripReq. */
        interface ICreateTripReq {

            /** CreateTripReq start */
            start?: (rental.v1.ILocation|null);

            /** CreateTripReq carId */
            carId?: (string|null);
        }

        /** Represents a CreateTripReq. */
        class CreateTripReq implements ICreateTripReq {

            /**
             * Constructs a new CreateTripReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ICreateTripReq);

            /** CreateTripReq start. */
            public start?: (rental.v1.ILocation|null);

            /** CreateTripReq carId. */
            public carId: string;

            /**
             * Decodes a CreateTripReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateTripReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.CreateTripReq;

            /**
             * Creates a CreateTripReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateTripReq
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.CreateTripReq;

            /**
             * Creates a plain object from a CreateTripReq message. Also converts values to other types if specified.
             * @param message CreateTripReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.CreateTripReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateTripReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTripReq. */
        interface IGetTripReq {

            /** GetTripReq id */
            id?: (string|null);
        }

        /** Represents a GetTripReq. */
        class GetTripReq implements IGetTripReq {

            /**
             * Constructs a new GetTripReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetTripReq);

            /** GetTripReq id. */
            public id: string;

            /**
             * Decodes a GetTripReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTripReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.GetTripReq;

            /**
             * Creates a GetTripReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTripReq
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetTripReq;

            /**
             * Creates a plain object from a GetTripReq message. Also converts values to other types if specified.
             * @param message GetTripReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetTripReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTripReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTripsReq. */
        interface IGetTripsReq {

            /** GetTripsReq status */
            status?: (rental.v1.TripStatus|null);
        }

        /** Represents a GetTripsReq. */
        class GetTripsReq implements IGetTripsReq {

            /**
             * Constructs a new GetTripsReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetTripsReq);

            /** GetTripsReq status. */
            public status: rental.v1.TripStatus;

            /**
             * Decodes a GetTripsReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTripsReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.GetTripsReq;

            /**
             * Creates a GetTripsReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTripsReq
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetTripsReq;

            /**
             * Creates a plain object from a GetTripsReq message. Also converts values to other types if specified.
             * @param message GetTripsReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetTripsReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTripsReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTripsRsp. */
        interface IGetTripsRsp {

            /** GetTripsRsp trips */
            trips?: (rental.v1.ITripEntity[]|null);
        }

        /** Represents a GetTripsRsp. */
        class GetTripsRsp implements IGetTripsRsp {

            /**
             * Constructs a new GetTripsRsp.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetTripsRsp);

            /** GetTripsRsp trips. */
            public trips: rental.v1.ITripEntity[];

            /**
             * Decodes a GetTripsRsp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetTripsRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.GetTripsRsp;

            /**
             * Creates a GetTripsRsp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTripsRsp
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetTripsRsp;

            /**
             * Creates a plain object from a GetTripsRsp message. Also converts values to other types if specified.
             * @param message GetTripsRsp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetTripsRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTripsRsp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UpdateTripReq. */
        interface IUpdateTripReq {

            /** UpdateTripReq id */
            id?: (string|null);

            /** UpdateTripReq current */
            current?: (rental.v1.ILocation|null);

            /** UpdateTripReq endTrip */
            endTrip?: (boolean|null);
        }

        /** Represents an UpdateTripReq. */
        class UpdateTripReq implements IUpdateTripReq {

            /**
             * Constructs a new UpdateTripReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IUpdateTripReq);

            /** UpdateTripReq id. */
            public id: string;

            /** UpdateTripReq current. */
            public current?: (rental.v1.ILocation|null);

            /** UpdateTripReq endTrip. */
            public endTrip: boolean;

            /**
             * Decodes an UpdateTripReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UpdateTripReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.UpdateTripReq;

            /**
             * Creates an UpdateTripReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateTripReq
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.UpdateTripReq;

            /**
             * Creates a plain object from an UpdateTripReq message. Also converts values to other types if specified.
             * @param message UpdateTripReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.UpdateTripReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateTripReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a TripService */
        class TripService extends $protobuf.rpc.Service {

            /**
             * Constructs a new TripService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls CreateTrip.
             * @param request CreateTripReq message or plain object
             * @param callback Node-style callback called with the error, if any, and TripEntity
             */
            public createTrip(request: rental.v1.ICreateTripReq, callback: rental.v1.TripService.CreateTripCallback): void;

            /**
             * Calls CreateTrip.
             * @param request CreateTripReq message or plain object
             * @returns Promise
             */
            public createTrip(request: rental.v1.ICreateTripReq): Promise<rental.v1.TripEntity>;

            /**
             * Calls GetTrip.
             * @param request GetTripReq message or plain object
             * @param callback Node-style callback called with the error, if any, and Trip
             */
            public getTrip(request: rental.v1.IGetTripReq, callback: rental.v1.TripService.GetTripCallback): void;

            /**
             * Calls GetTrip.
             * @param request GetTripReq message or plain object
             * @returns Promise
             */
            public getTrip(request: rental.v1.IGetTripReq): Promise<rental.v1.Trip>;

            /**
             * Calls GetTrips.
             * @param request GetTripsReq message or plain object
             * @param callback Node-style callback called with the error, if any, and GetTripsRsp
             */
            public getTrips(request: rental.v1.IGetTripsReq, callback: rental.v1.TripService.GetTripsCallback): void;

            /**
             * Calls GetTrips.
             * @param request GetTripsReq message or plain object
             * @returns Promise
             */
            public getTrips(request: rental.v1.IGetTripsReq): Promise<rental.v1.GetTripsRsp>;

            /**
             * Calls UpdateTrip.
             * @param request UpdateTripReq message or plain object
             * @param callback Node-style callback called with the error, if any, and Trip
             */
            public updateTrip(request: rental.v1.IUpdateTripReq, callback: rental.v1.TripService.UpdateTripCallback): void;

            /**
             * Calls UpdateTrip.
             * @param request UpdateTripReq message or plain object
             * @returns Promise
             */
            public updateTrip(request: rental.v1.IUpdateTripReq): Promise<rental.v1.Trip>;
        }

        namespace TripService {

            /**
             * Callback as used by {@link rental.v1.TripService#createTrip}.
             * @param error Error, if any
             * @param [response] TripEntity
             */
            type CreateTripCallback = (error: (Error|null), response?: rental.v1.TripEntity) => void;

            /**
             * Callback as used by {@link rental.v1.TripService#getTrip}.
             * @param error Error, if any
             * @param [response] Trip
             */
            type GetTripCallback = (error: (Error|null), response?: rental.v1.Trip) => void;

            /**
             * Callback as used by {@link rental.v1.TripService#getTrips}.
             * @param error Error, if any
             * @param [response] GetTripsRsp
             */
            type GetTripsCallback = (error: (Error|null), response?: rental.v1.GetTripsRsp) => void;

            /**
             * Callback as used by {@link rental.v1.TripService#updateTrip}.
             * @param error Error, if any
             * @param [response] Trip
             */
            type UpdateTripCallback = (error: (Error|null), response?: rental.v1.Trip) => void;
        }

        /** Gender enum. */
        enum Gender {
            G_NOT_SPECIFIED = 0,
            MALE = 1,
            FEMALE = 2
        }

        /** Properties of an Identity. */
        interface IIdentity {

            /** Identity licNumber */
            licNumber?: (string|null);

            /** Identity name */
            name?: (string|null);

            /** Identity gender */
            gender?: (rental.v1.Gender|null);

            /** Identity birthDateMillis */
            birthDateMillis?: (number|null);
        }

        /** Represents an Identity. */
        class Identity implements IIdentity {

            /**
             * Constructs a new Identity.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IIdentity);

            /** Identity licNumber. */
            public licNumber: string;

            /** Identity name. */
            public name: string;

            /** Identity gender. */
            public gender: rental.v1.Gender;

            /** Identity birthDateMillis. */
            public birthDateMillis: number;

            /**
             * Decodes an Identity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Identity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.Identity;

            /**
             * Creates an Identity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Identity
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.Identity;

            /**
             * Creates a plain object from an Identity message. Also converts values to other types if specified.
             * @param message Identity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.Identity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Identity to JSON.
             * @returns JSON object
             */
        }

        /** IdentityStatus enum. */
        enum IdentityStatus {
            UNSUBMITTED = 0,
            PENDING = 1,
            VERIFIED = 2
        }

        /** Properties of a Profile. */
        interface IProfile {

            /** Profile identity */
            identity?: (rental.v1.IIdentity|null);

            /** Profile identityStatus */
            identityStatus?: (rental.v1.IdentityStatus|null);
        }

        /** Represents a Profile. */
        class Profile implements IProfile {

            /**
             * Constructs a new Profile.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IProfile);

            /** Profile identity. */
            public identity?: (rental.v1.IIdentity|null);

            /** Profile identityStatus. */
            public identityStatus: rental.v1.IdentityStatus;

            /**
             * Decodes a Profile message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Profile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.Profile;

            /**
             * Creates a Profile message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Profile
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.Profile;

            /**
             * Creates a plain object from a Profile message. Also converts values to other types if specified.
             * @param message Profile
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.Profile, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Profile to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetProfileReq. */
        interface IGetProfileReq {
        }

        /** Represents a GetProfileReq. */
        class GetProfileReq implements IGetProfileReq {

            /**
             * Constructs a new GetProfileReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetProfileReq);

            /**
             * Decodes a GetProfileReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetProfileReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.GetProfileReq;

            /**
             * Creates a GetProfileReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetProfileReq
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetProfileReq;

            /**
             * Creates a plain object from a GetProfileReq message. Also converts values to other types if specified.
             * @param message GetProfileReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetProfileReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetProfileReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ClearProfileReq. */
        interface IClearProfileReq {
        }

        /** Represents a ClearProfileReq. */
        class ClearProfileReq implements IClearProfileReq {

            /**
             * Constructs a new ClearProfileReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IClearProfileReq);

            /**
             * Decodes a ClearProfileReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClearProfileReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.ClearProfileReq;

            /**
             * Creates a ClearProfileReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClearProfileReq
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.ClearProfileReq;

            /**
             * Creates a plain object from a ClearProfileReq message. Also converts values to other types if specified.
             * @param message ClearProfileReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.ClearProfileReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClearProfileReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a ProfileService */
        class ProfileService extends $protobuf.rpc.Service {

            /**
             * Constructs a new ProfileService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls GetProfile.
             * @param request GetProfileReq message or plain object
             * @param callback Node-style callback called with the error, if any, and Profile
             */
            public getProfile(request: rental.v1.IGetProfileReq, callback: rental.v1.ProfileService.GetProfileCallback): void;

            /**
             * Calls GetProfile.
             * @param request GetProfileReq message or plain object
             * @returns Promise
             */
            public getProfile(request: rental.v1.IGetProfileReq): Promise<rental.v1.Profile>;

            /**
             * Calls SubmitProfile.
             * @param request Identity message or plain object
             * @param callback Node-style callback called with the error, if any, and Profile
             */
            public submitProfile(request: rental.v1.IIdentity, callback: rental.v1.ProfileService.SubmitProfileCallback): void;

            /**
             * Calls SubmitProfile.
             * @param request Identity message or plain object
             * @returns Promise
             */
            public submitProfile(request: rental.v1.IIdentity): Promise<rental.v1.Profile>;

            /**
             * Calls ClearProfile.
             * @param request ClearProfileReq message or plain object
             * @param callback Node-style callback called with the error, if any, and Profile
             */
            public clearProfile(request: rental.v1.IClearProfileReq, callback: rental.v1.ProfileService.ClearProfileCallback): void;

            /**
             * Calls ClearProfile.
             * @param request ClearProfileReq message or plain object
             * @returns Promise
             */
            public clearProfile(request: rental.v1.IClearProfileReq): Promise<rental.v1.Profile>;
        }

        namespace ProfileService {

            /**
             * Callback as used by {@link rental.v1.ProfileService#getProfile}.
             * @param error Error, if any
             * @param [response] Profile
             */
            type GetProfileCallback = (error: (Error|null), response?: rental.v1.Profile) => void;

            /**
             * Callback as used by {@link rental.v1.ProfileService#submitProfile}.
             * @param error Error, if any
             * @param [response] Profile
             */
            type SubmitProfileCallback = (error: (Error|null), response?: rental.v1.Profile) => void;

            /**
             * Callback as used by {@link rental.v1.ProfileService#clearProfile}.
             * @param error Error, if any
             * @param [response] Profile
             */
            type ClearProfileCallback = (error: (Error|null), response?: rental.v1.Profile) => void;
        }
    }
}
