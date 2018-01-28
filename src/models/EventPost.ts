export class EventPost{
    private message: string;
    private attachments: EventPostAttachment[];
}

export class EventPostAttachment{
    private cloudinaryPublicId: string;
    private usage: string;
}

export class ReportEventPost{
    private reason: string;
}

export class ReplyEventPost{
    private comment: string;
    private eventPostPollOptionId: number;
}

export class LikeEventPost{

}

export class RateEventPost{
    private rating: number;
}