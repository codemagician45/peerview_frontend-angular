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
    JobFactory
} from '../../app/shared/models/factory';

@Injectable()
export class JobApiService extends ApiService {
    public options = {};
    public baseURI = 'job';
    public baseURIPlural = 'jobs';

    public promiseGetJobs (): Promise<JobModel[]> {
        return this.promiseGetAllResponseData()
            .then((response: IResponse) => {
                return JobFactory.createManyJob(response.data);
            });
    }

    public promiseGetJob (jobId?: number): Promise<IResponse> {
        return this.promiseGetResponseData(`${jobId}`)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promisePostJob (job: JobModel): Promise<IResponse> {
        return this.promisePostModelData(``, job)
            .then((response: IResponse) => {
                return response;
            });
    }
}
