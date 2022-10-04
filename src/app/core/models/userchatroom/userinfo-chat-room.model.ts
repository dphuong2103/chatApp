import { ChatRoom } from '../chatroom/chat-room.model';
import { User } from '../user/user.model';
import { ChatRoomNUID } from './userid-chat-room.model';

export class ChatRoomNUserInfo {
  _chatRoom?: ChatRoom;
  _members?: User[];

  public get chatRoom(): ChatRoom {
    return this._chatRoom || new ChatRoom();
  }

  public set chatRoom(chatRoom: ChatRoom) {
    this._chatRoom = chatRoom;
  }

  public get members(): User[] {
    return this._members || [];
  }

  public set members(members: User[]) {
    this._members = members;
  }

  constructor() {}

  static newChatRoomNUUserInfoFromChatRoom(
    chatRoomNUID: ChatRoomNUID,
    members: User[]
  ) {
    let chatRoomNUserInfo = new ChatRoomNUserInfo();
    chatRoomNUserInfo.chatRoom = chatRoomNUID.chatRoom;
    chatRoomNUserInfo.members = members;
    return chatRoomNUserInfo;
  }
  
}
