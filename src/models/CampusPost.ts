export class LikeCampusPost{

}

export class RateCampusPost{
    
}

export class ReplyCampusPost{
    private comment: string;
}

export class ReportCampusPost{
    private reason:string;
}

export class CampusPost {
    private message:string;
}

export class CampusMarketPlace {
    private title: string;
    private description: string;
    private email: string;
    private phone: string;
    private price: number;
    private author: string;
    private location: string;
    private edition: string;
    private attachments: MarketplaceAttachment[];
}

export class MarketplaceAttachment{
    
}