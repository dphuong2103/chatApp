export class Message {
  _message?: string;
  _timeStamp?: number;
  _senderID?: string;

  constructor() {}

  static newMessage(senderID: string, message: string) {
    let newMessage = new Message();
    newMessage._senderID = senderID;
    newMessage._timeStamp = new Date().getTime();
    newMessage._message = message;
    return newMessage;
  }

  get message() {
    if (this._message) {
      return this._message;
    } else return '';
  }

  set message(message: string) {
    this._message = message;
  }

  get timeStamp() {
    return this._timeStamp || 0;
  }

  set senderID(senderID: string) {
    this._senderID = senderID;
  }
}
