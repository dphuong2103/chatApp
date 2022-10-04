import { Unsubscriber } from './../../../shared/unsubscribe/unscriber';
import { ChatRoomNUserInfo } from 'src/app/core/models/userchatroom/userinfo-chat-room.model';
import { ComponentFactoryResolver, Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  Observable,
  Subscription,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import { ChatRoom } from 'src/app/core/models/chatroom/chat-room.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ManipulateDatabaseService } from 'src/app/core/database/manipulate-database.service';
import { Message } from 'src/app/core/models/message/message.model';
import { User } from 'src/app/core/models/user/user.model';
@Injectable({
  providedIn: 'root',
})
export class HomepageGetDataService extends Unsubscriber implements OnDestroy {
  // getChatRoomsSubscription?: any;

  contactsSubject = new BehaviorSubject<User[]>([]);
  // getContactsSubscription?: any;

  isShowChatRoom = new BehaviorSubject<boolean>(true);

  chatRoomNUserInfoSubject = new BehaviorSubject<
    Observable<ChatRoomNUserInfo>[]
  >([]);

  chatRoomNUserInfo$?: Observable<ChatRoomNUserInfo>;
  chatRoomNUserInfoTestSubject? = new BehaviorSubject<any[]>([]);

  constructor(
    private manipulateDB: ManipulateDatabaseService,
    private auth: AuthService
  ) {
    super();
  }

  // get list of contacts and show on contacts component
  getContacts() {
    this.anotherSubscription = this.manipulateDB
      .getContacts(this.auth.currentUserID())
      .subscribe((contacts) => this.contactsSubject.next(contacts));
  }

  selectContact(uid: string, chatWithUID: string) {
    this.anotherSubscription = this.manipulateDB
      .openChatRoomInContacts(uid, chatWithUID)
      .subscribe();
  }

  getMessages(chatRoomID: string) {
    this.anotherSubscription = this.manipulateDB.getChatMessage(chatRoomID).subscribe();
  }

  getCurrentChatRoomID() {
    return this.manipulateDB.currentChatRoom$.value;
  }

  updateIsShowChatRoom(isShown: boolean) {
    this.isShowChatRoom.next(isShown);
  }
}
