export interface IRequest {
  UID?: string
  coachUID: string;
  message: string;
  senderEmail: string;
}

export default class Request implements IRequest {
  public UID!: string;
  public coachUID: string;
  public message: string;
  public senderEmail: string;
  
  constructor( {UID, coachUID, message, senderEmail}: IRequest) { 
    if(UID) this.UID = UID;
    this.coachUID = coachUID;
    this.message = message;
    this.senderEmail = senderEmail;
  }
}
