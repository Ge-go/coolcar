import * as $protobuf from "protobufjs";
/** Namespace auth. */
export namespace auth {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a LoginReq. */
        interface ILoginReq {

            /** LoginReq code */
            code?: (string|null);
        }

        /** Represents a LoginReq. */
        class LoginReq implements ILoginReq {

            /**
             * Constructs a new LoginReq.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.ILoginReq);

            /** LoginReq code. */
            public code: string;

            /**
             * Decodes a LoginReq message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoginReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.LoginReq;

            /**
             * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginReq
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.LoginReq;

            /**
             * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
             * @param message LoginReq
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.LoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginReq to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LoginRsp. */
        interface ILoginRsp {

            /** LoginRsp accessToken */
            accessToken?: (string|null);

            /** LoginRsp expiresIn */
            expiresIn?: (number|null);
        }

        /** Represents a LoginRsp. */
        class LoginRsp implements ILoginRsp {

            /**
             * Constructs a new LoginRsp.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.ILoginRsp);

            /** LoginRsp accessToken. */
            public accessToken: string;

            /** LoginRsp expiresIn. */
            public expiresIn: number;

            /**
             * Decodes a LoginRsp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoginRsp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.LoginRsp;

            /**
             * Creates a LoginRsp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginRsp
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.LoginRsp;

            /**
             * Creates a plain object from a LoginRsp message. Also converts values to other types if specified.
             * @param message LoginRsp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.LoginRsp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginRsp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents an AuthService */
        class AuthService extends $protobuf.rpc.Service {

            /**
             * Constructs a new AuthService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Login.
             * @param request LoginReq message or plain object
             * @param callback Node-style callback called with the error, if any, and LoginRsp
             */
            public login(request: auth.v1.ILoginReq, callback: auth.v1.AuthService.LoginCallback): void;

            /**
             * Calls Login.
             * @param request LoginReq message or plain object
             * @returns Promise
             */
            public login(request: auth.v1.ILoginReq): Promise<auth.v1.LoginRsp>;
        }

        namespace AuthService {

            /**
             * Callback as used by {@link auth.v1.AuthService#login}.
             * @param error Error, if any
             * @param [response] LoginRsp
             */
            type LoginCallback = (error: (Error|null), response?: auth.v1.LoginRsp) => void;
        }
    }
}
