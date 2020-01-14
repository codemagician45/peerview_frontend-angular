import {
    Model
} from './model';

export class ProfileCompleteModel extends Model {
    public status?: boolean;
    public aboutme?: boolean;
    public workExperience?: boolean;
    public skills?: boolean;
    public initialized?: boolean;

    public init (): void { }
}
