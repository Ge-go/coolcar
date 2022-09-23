import * as $protobuf from "protobufjs";
/** Namespace rental. */
export namespace rental {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a CreateTripReq. */
        interface ICreateTripReq {

            /** CreateTripReq start */
            start?: (string|null);
        }

        /** Represents a CreateTripReq. */
        class CreateTripReq implements ICreateTripReq {

            /**
             * Constructs a new CreateTripReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ICreateTripReq);

            /** CreateTripReq start. */
            public start: string;

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

        /** Properties of a CreateTripRsp. */
        interface ICreateTripRsp {
        }

        /** Represents a CreateTripRsp. */
        class CreateTripRsp implements ICreateTripRsp {

            /**
             * Constructs a new CreateTripRsp.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ICreateTripRsp);

            /**
             * Decodes a CreateTripRsp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateTripRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rental.v1.CreateTripRsp;

            /**
             * Creates a CreateTripRsp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateTripRsp
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.CreateTripRsp;

            /**
             * Creates a plain object from a CreateTripRsp message. Also converts values to other types if specified.
             * @param message CreateTripRsp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.CreateTripRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateTripRsp to JSON.
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
             * @param callback Node-style callback called with the error, if any, and CreateTripRsp
             */
            public createTrip(request: rental.v1.ICreateTripReq, callback: rental.v1.TripService.CreateTripCallback): void;

            /**
             * Calls CreateTrip.
             * @param request CreateTripReq message or plain object
             * @returns Promise
             */
            public createTrip(request: rental.v1.ICreateTripReq): Promise<rental.v1.CreateTripRsp>;
        }

        namespace TripService {

            /**
             * Callback as used by {@link rental.v1.TripService#createTrip}.
             * @param error Error, if any
             * @param [response] CreateTripRsp
             */
            type CreateTripCallback = (error: (Error|null), response?: rental.v1.CreateTripRsp) => void;
        }
    }
}
