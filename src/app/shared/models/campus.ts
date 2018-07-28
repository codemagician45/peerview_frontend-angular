import {
  Model
} from './model';

export class CampusModel extends Model {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;

  public init (): void {}
}
