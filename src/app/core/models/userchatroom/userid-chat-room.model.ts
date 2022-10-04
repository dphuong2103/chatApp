import { ChatRoom } from '../chatroom/chat-room.model';
import { User } from '../user/user.model';

export class ChatRoomNUID {
  _chatRoom?: ChatRoom;
  _members?: string[];

  public get chatRoom(): ChatRoom {
    return this._chatRoom || new ChatRoom();
  }

  public set chatRoom(chatRoom: ChatRoom) {
    this._chatRoom = chatRoom;
  }

  public get members(): string[] {
    return this._members || [];
  }

  public set members(members: string[]) {
    this._members = members;
  }

  constructor() {}

  static newChatRoomNUIDFromChatRoom(chatRoom: ChatRoom) {
    let chatRoomNUID = new ChatRoomNUID();
    chatRoomNUID.chatRoom = chatRoom;
    chatRoomNUID.members = chatRoom._members || [];
    return chatRoomNUID;
  }
}
