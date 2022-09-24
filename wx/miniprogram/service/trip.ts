import { rental } from "./proto_gen/rental/rental_pb";
import { Coolcar } from "./request";

export namespace TripService {
    export function createTrip(req: rental.v1.ICreateTripReq): Promise<rental.v1.CreateTripRsp> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/trip',
            data: req,
            respMarshaller: rental.v1.CreateTripRsp.fromObject,
        })
    }
}