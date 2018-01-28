import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OnboardingService {
    constructor(private http:HttpClient){
    }

    getUserTypeId(typecode: String){
        return this.http.get(`user/type/${typecode}`);
    }
}