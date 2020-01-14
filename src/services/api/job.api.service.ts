import {
    Injectable
} from '@angular/core';
import {
    ApiService
} from '../api.service';
import {
    JobModel, IResponse
} from '../../app/shared/models';
import {
    JobFactory, PostFactory
} from '../../app/shared/models/factory';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class JobApiService extends ApiService {
    public options = {};
    public baseURI = 'job';
    public baseURIPlural = 'jobs';

    public promiseGetUserJobs (userId?: number, limit?: number, offset?: number): Promise<JobModel[]> {
        let params: HttpParams;

        if (userId) {
            params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString())
            .set('userId', userId.toString());
        } else {
            params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString());
        }
        this.options = {
            params: params
        };
        return this.promiseGetAllResponseData(`user-jobs`)
            .then((response: IResponse) => {
                return JobFactory.createManyJob(response.data);
            });
    }

    public promiseGetAllJobs (limit?: number, offset?: number): Promise<JobModel[]> {
        let params: HttpParams;
        params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString());

        return this.promiseGetAllResponseData('', {params: params})
            .then((response: IResponse) => {
                return JobFactory.createManyJob(response.data);
            });
    }

    public promiseGetJobs (): Promise<JobModel[]> {
        return this.promiseGetAllResponseData()
            .then((response: IResponse) => {
                return JobFactory.createManyJob(response.data);
            });
    }

    public promiseGetJob (jobId?: number): Promise<JobModel> {
        return this.promiseGetResponseData(`${jobId}`)
            .then((response: IResponse) => {
                return JobFactory.createJob(response.data);
            });
    }

    public promisePostJob (job: JobModel): Promise<IResponse> {
        return this.promisePostModelData(``, job)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseRemoveJob (jobId: number): Promise<IResponse> {
        return this.promiseRemoveData(`${jobId}`)
            .then((response: IResponse) => {
                return response;
            });
    }
}
