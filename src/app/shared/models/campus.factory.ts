import {
  CampusModel,
  CampusPostModel
} from './campus';

export class CampusFactory {
  public static createCampus (data: any): CampusModel {
    return <CampusModel> (new CampusModel ())
      .assimilate(data);
  }

  public static createManyCampus (data: Array<CampusModel>): Array<CampusModel> {
    return data.map(
      instanceData => CampusFactory.createCampus(instanceData),
    );
  }

  public static createCampusPost (data: any): CampusPostModel {
    return <CampusPostModel> (new CampusPostModel ())
      .assimilate(data);
  }

  public static createManyCampusPost (data: Array<CampusPostModel>): Array<CampusPostModel> {
    return data.map(
      instanceData => CampusFactory.createCampusPost(instanceData),
    );
  }
}
