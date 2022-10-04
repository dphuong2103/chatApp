import { Message } from '../message/message.model';

export class ChatRoom {
  static TYPE_ONE = 'ONE';
  static TYPE_MANY = 'MANY';
  _id?: string;
  _otherInfo?: string;
  _lastMessage?: Message;
  _name?: string;
  // _messages?: Message[];
  _type?: string;
  _members?: string[];
  
  constructor(id?: string) {
    this._id = id;
  }

  get lastMessage(): Message {
    return this._lastMessage!;
  }

  set type(type: string) {
    this._type = type;
  }

  get type() {
    return this._type || '';
  }

  set id(id: string) {
    this._id = id;
  }

  get id() {
    return this._id || '';
  }

  set members(members: string[]) {
    this._members = members;
  }

  get members(): string[] {
    return this._members || [];
  }

  set lastMessage(lastMessage: Message) {
    this._lastMessage = lastMessage || new Message();
  }

}
