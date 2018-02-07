import {
  User
} from './models';

export class LikeCommunityPost {}

export class RateCommunityPost {}

export class ReplyCommunityPost {
  private comment: string;
  private communityPostPollOptionId?: number;
  private courseId?: number;
  private studyLevelId?: number;
  private averageRating?: number;
}

export class ReportCommunityPost {
  private reason: string;
}

export class CommunityPost {
  private courseId: number;
  private message: string;
}

export class CommunityCareer {
  private title: string;
  private description: string;
}

export class CommunityBrainstormingMap {
  private name: string;
  private node_id: number;
  private closed: boolean;
  private children: CommunityBrainstormingMap[];
}

export class Community {
  private communityName: string;
  private institutionName: string;
  private users: User[];
}
