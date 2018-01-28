import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MarketPlaceService {
    constructor(private http:HttpClient){
    }

    getmarketplace(campusId: Number) {
        return this.http.get(`campus/${campusId}/marketplace`)
    }

    getcampusmarketplace(marketpaceId: Number) {
        return this.http.get(`campus/marketplace/${marketpaceId}`)
    }
}