import {
  CampusModel,
  CampusPostModel,
  CampusFreshersFeedModel
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

  public static createCampusFreshersFeed (data: any): CampusFreshersFeedModel {
    return <CampusFreshersFeedModel> (new CampusFreshersFeedModel ())
      .assimilate(data);
  }

  public static createManyCampusFreshersFeed (data: Array<CampusFreshersFeedModel>): Array<CampusFreshersFeedModel> {
    return data.map(
      instanceData => CampusFactory.createCampusFreshersFeed(instanceData),
    );
  }
}
