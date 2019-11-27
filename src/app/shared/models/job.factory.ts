import {
  JobModel
} from './job';
import * as moment from 'moment';

export class JobFactory {
  public static createJob (data: any): JobModel {
    return <JobModel> (new JobModel ())
      .assimilate(data);
  }

  public static createManyJob (data: Array<JobModel>): Array<JobModel> {
    return data.map(
      instanceData => JobFactory.createJob(instanceData),
    );
  }
}
