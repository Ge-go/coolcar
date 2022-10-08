import { rental } from "./proto_gen/rental/rental_pb";
import { Coolcar } from "./request";

export namespace TripService {
    export function createTrip(req: rental.v1.ICreateTripReq): Promise<rental.v1.ITripEntity> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'POST',
            path: '/v1/trip',
            data: req,
            respMarshaller: rental.v1.TripEntity.fromObject,
        })
    }

    export function GetTrip(id: string): Promise<rental.v1.ITrip> {
        return Coolcar.sendRequestWithAuthRetry({
            method: 'GET',
            path: `/v1/trip/${encodeURIComponent(id)}`,  //保护id,防止入侵
            respMarshaller: rental.v1.Trip.fromObject,
        })
    }

    export function GetTrips(s?: rental.v1.TripStatus): Promise<rental.v1.IGetTripsRsp> {
        let path = '/v1/trips'
        if (s) {
            path += `?status=${s}`
        }
        return Coolcar.sendRequestWithAuthRetry({
            method: 'GET',
            path,
            respMarshaller: rental.v1.GetTripsRsp.fromObject
        })
    }

    export function updateTripPos(id: string, loc?: rental.v1.ILocation) {
        return updateTrip({
            id,
            current: loc,
        })
    }

    export function finishTrip(id: string) {
        return updateTrip({
            id,
            endTrip: true,
        })
    }

    function updateTrip(r: rental.v1.IUpdateTripReq): Promise<rental.v1.ITrip> {
        if (!r.id) {
            return Promise.reject("must specify id")
        }
        return Coolcar.sendRequestWithAuthRetry({
            method: 'POST',
            path: `/v1/trip/${encodeURIComponent(r.id)}`,
            data: r,
            respMarshaller: rental.v1.Trip.fromObject,
        })
    }
}