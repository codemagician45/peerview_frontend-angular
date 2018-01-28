export class User {

    constructor(
        public firstname: String,
        public lastname: String,
        public email: String,
        public isactive: boolean,
        public token: string,
    ) {

    }
    public id: number;
}


export class UserOnboardingDetails{
    public courseIds: number[];
    public userStudyLevelId: number;
    public userTypeId: number;
    public schoolName: string;
    public city: string;
    public gender: string;
    public role: string;
    public company: string;
    public birthDate: Date;
    public institutionName: string;
    public yearOfIncorporation: string;
    public website: string;
}