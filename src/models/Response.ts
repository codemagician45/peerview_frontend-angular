export class Response {
  public status: string;
  public status_code: number;
  public http_code: number;
}

export class UnfollowUser extends Response {
  public user: any;
}
