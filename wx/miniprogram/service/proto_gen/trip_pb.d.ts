import * as $protobuf from "protobufjs";
/** Namespace coolcar. */
export namespace coolcar {

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
        constructor(properties?: coolcar.ILocation);

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
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): coolcar.Location;

        /**
         * Creates a Location message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Location
         */
        public static fromObject(object: { [k: string]: any }): coolcar.Location;

        /**
         * Creates a plain object from a Location message. Also converts values to other types if specified.
         * @param message Location
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: coolcar.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Location to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** TripStatus enum. */
    enum TripStatus {
        TS_NOT_SPECIFIED = 0,
        NOT_STARTED = 1,
        IN_PROGRESS = 2,
        FINISHED = 3,
        PAID = 4
    }

    /** Properties of a Trip. */
    interface ITrip {

        /** Trip start */
        start?: (string|null);

        /** Trip startPos */
        startPos?: (coolcar.ILocation|null);

        /** Trip pathPos */
        pathPos?: (coolcar.ILocation[]|null);

        /** Trip end */
        end?: (string|null);

        /** Trip durationSec */
        durationSec?: (number|null);

        /** Trip feeCent */
        feeCent?: (number|null);

        /** Trip status */
        status?: (coolcar.TripStatus|null);
    }

    /** Represents a Trip. */
    class Trip implements ITrip {

        /**
         * Constructs a new Trip.
         * @param [properties] Properties to set
         */
        constructor(properties?: coolcar.ITrip);

        /** Trip start. */
        public start: string;

        /** Trip startPos. */
        public startPos?: (coolcar.ILocation|null);

        /** Trip pathPos. */
        public pathPos: coolcar.ILocation[];

        /** Trip end. */
        public end: string;

        /** Trip durationSec. */
        public durationSec: number;

        /** Trip feeCent. */
        public feeCent: number;

        /** Trip status. */
        public status: coolcar.TripStatus;

        /**
         * Decodes a Trip message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Trip
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): coolcar.Trip;

        /**
         * Creates a Trip message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Trip
         */
        public static fromObject(object: { [k: string]: any }): coolcar.Trip;

        /**
         * Creates a plain object from a Trip message. Also converts values to other types if specified.
         * @param message Trip
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: coolcar.Trip, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Trip to JSON.
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
         * Calls GetTrip.
         * @param request GetTripReq message or plain object
         * @param callback Node-style callback called with the error, if any, and GetTripRsp
         */
        public getTrip(request: coolcar.IGetTripReq, callback: coolcar.TripService.GetTripCallback): void;

        /**
         * Calls GetTrip.
         * @param request GetTripReq message or plain object
         * @returns Promise
         */
        public getTrip(request: coolcar.IGetTripReq): Promise<coolcar.GetTripRsp>;
    }

    namespace TripService {

        /**
         * Callback as used by {@link coolcar.TripService#getTrip}.
         * @param error Error, if any
         * @param [response] GetTripRsp
         */
        type GetTripCallback = (error: (Error|null), response?: coolcar.GetTripRsp) => void;
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
        constructor(properties?: coolcar.IGetTripReq);

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
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): coolcar.GetTripReq;

        /**
         * Creates a GetTripReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetTripReq
         */
        public static fromObject(object: { [k: string]: any }): coolcar.GetTripReq;

        /**
         * Creates a plain object from a GetTripReq message. Also converts values to other types if specified.
         * @param message GetTripReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: coolcar.GetTripReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetTripReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GetTripRsp. */
    interface IGetTripRsp {

        /** GetTripRsp id */
        id?: (string|null);

        /** GetTripRsp trip */
        trip?: (coolcar.ITrip|null);
    }

    /** Represents a GetTripRsp. */
    class GetTripRsp implements IGetTripRsp {

        /**
         * Constructs a new GetTripRsp.
         * @param [properties] Properties to set
         */
        constructor(properties?: coolcar.IGetTripRsp);

        /** GetTripRsp id. */
        public id: string;

        /** GetTripRsp trip. */
        public trip?: (coolcar.ITrip|null);

        /**
         * Decodes a GetTripRsp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GetTripRsp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): coolcar.GetTripRsp;

        /**
         * Creates a GetTripRsp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GetTripRsp
         */
        public static fromObject(object: { [k: string]: any }): coolcar.GetTripRsp;

        /**
         * Creates a plain object from a GetTripRsp message. Also converts values to other types if specified.
         * @param message GetTripRsp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: coolcar.GetTripRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GetTripRsp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
