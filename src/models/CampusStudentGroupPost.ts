export class LikeCampusStudentGroupPost {}

export class RateCampusStudentGroupPost {}

export class ReplyCampusStudentGroupPost {
  private comment: string;
}

export class ReportCampusStudentGroupPost {
  private reason: string;
}

export class CampusStudentGroupPost {
  private message: string;
}

export class CampusStudentGroup {
  private title: string;
  private description: string;
  private adminEmail: string;
}

export class CampusStudentGroupBrainstormingMap {
  private name: string;
  private node_id: number;
  private closed: boolean;
  private children: CampusStudentGroupBrainstormingMap[];
}
