export namespace routing {
    export interface DrivingOpts {  //好处,必须要传入正确的key & data
        trip_id: string
    }

    export function drving(o: DrivingOpts) {
        return `/pages/driving/driving?trip_id=${o.trip_id}`
    }

    export interface LockOpts {
        car_id: string
    }

    export function lock(o: LockOpts) {
        return `/pages/lock/lock?car_id=${o.car_id}`
    }

    //支付页面传递参数
    export interface PayOpts {
        travel_time: string,
        travel_expenses: string
    }

    export function Pay(o: PayOpts) {
        return `/pages/pay/pay?travel_time=${o.travel_time}&travel_expenses=${o.travel_expenses}`
    }

    export interface RegisterOpts {
        redirect?: string
    }

    export interface RegisterParams {
        redirectURL: string
    }

    export function register(p?: RegisterParams) {
        const page = '/pages/register/register'
        if (!p) {
            return page
        }
        return `${page}?redirect=${encodeURIComponent(p.redirectURL)}`
    }

    export function mytrips() {
        return '/pages/mytrips/mytrips'
    }
}
