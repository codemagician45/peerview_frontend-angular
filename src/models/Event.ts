export class Event {

    constructor(
    ) {

    }
    public id: number;
    public title: String;
    public description: String;
    public startdate: string;
    public starttime: string;
    public enddate: String;
    public endtime: string;
    public ticketsalescloses: string;
    public venueAddress: string;
    public cityId: number;
    public ticketPrice: number;
    public institutionName: string;
    public eventDressCodeId: number;
    public eventTypeId: number;
    public organizerBankAccount: string;
    public organizerContactDetails: string;
    public attachments: EventAttachments[];
}

export class EventVip{
    public name: string;
    public phoneNumberOrEmail: string;
}

export class EventGuest {
    
}

export class EventAttachments {
    public cloudinaryPublicId: string;
    public usage: string;
}