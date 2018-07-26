import {
  CampusModel
} from './campus';

export class CampusFactory {
  public static create (data: any): CampusModel {
    return <CampusModel> (new CampusModel ())
      .assimilate(data);
  }

  public static createMany (data: Array<CampusModel>): Array<CampusModel> {
    return data.map(
      instanceData => CampusFactory.create(instanceData),
    );
  }
}
