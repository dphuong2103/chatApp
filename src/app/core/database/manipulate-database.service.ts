import { ChatRoomNUserInfo } from './../models/userchatroom/userinfo-chat-room.model';
import { ChatRoomNUID } from './../models/userchatroom/userid-chat-room.model';
import { ChatRoom } from './../models/chatroom/chat-room.model';
import { User } from 'src/app/core/models/user/user.model';

import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import {
  map,
  Observable,
  switchMap,
  merge,
  BehaviorSubject,
  catchError,
  EMPTY,
  toArray,
  combineLatest,
  distinctUntilChanged,
} from 'rxjs';

import { from, tap, of, mergeMap } from 'rxjs';
import { Message } from '../models/message/message.model';

@Injectable({
  providedIn: 'root',
})
export class ManipulateDatabaseService {
  constructor(private db: DatabaseService) {}

  db_Users_Collection = 'users';
  db_Messages_Collection = 'messages';
  db_ChatRooms_Collection = 'chatRooms';
  db_UserChatRooms_Collection = 'userChatRoom';

  currentChatRoom$ = new BehaviorSubject<string>('');

  messages = new BehaviorSubject<Message[]>([]);

  chatRoomsNUserInfo$? = new BehaviorSubject<ChatRoomNUserInfo[]>([]);
  userChatRoomsNInfo: ChatRoomNUserInfo[] = [];

  messagesSubject = new BehaviorSubject<any>([]);

  selectedChatRoomNUserInfoSubject = new BehaviorSubject<ChatRoomNUserInfo>(
    new ChatRoomNUserInfo()
  );

  // return list UserChatRoom from Users/_chatRooms ONCE
  // support addChatRoom2UserChatRooms
  getUserChatRoomList(uid: string): Observable<string[]> {
    return this.db.afsDB
      .collection(this.db_Users_Collection)
      .doc(uid)
      .get()
      .pipe(map((result: any) => result.data()._chatRooms)) as Observable<
      string[]
    >;
  }

  //1. get chatRooms from users/_chatRooms
  //2. loop through each chatRoomID and get from database
  // Used to display list of chatRoom on UI on chatlist component
  getUserChatRoomInfo(uid: string) {
    return this.getUserChatRoomList(uid).pipe(
      map((chatRoomIDs) =>
        chatRoomIDs.map((chatRoomID) =>
          this.getChatRoomInfo(chatRoomID).pipe(
            map((chatRoom) => {
              return ChatRoomNUID.newChatRoomNUIDFromChatRoom(chatRoom);
            }),

            mergeMap((chatRoom) => {
              let members = chatRoom.members.filter((member) => member !== uid);
              return this.getMultiUsersInfo(members).pipe(
                map((users) => {
                  return ChatRoomNUserInfo.newChatRoomNUUserInfoFromChatRoom(
                    chatRoom,
                    users
                  );
                })
              );
            })
          )
        )
      ),
      switchMap((chatRoomsNUserInfo) => {
        return combineLatest(chatRoomsNUserInfo);
      }),
      tap((result) => this.chatRoomsNUserInfo$?.next(result)),
      distinctUntilChanged()
    );
  }

  //Check if user exists, if not exists => create new, if exists => update
  setUserInfo(user: User) {
    let uid = user._uid;
    return this.db.afsDB
      .collection(this.db_Users_Collection)
      .doc(uid)
      .get()
      .pipe(
        switchMap((getUser) => {
          if (getUser.exists) {
            return from(
              this.db.afsDB
                .collection(this.db_Users_Collection)
                .doc(uid)
                .update(Object.assign({}, user))
            );
          } else {
            return from(
              this.db.afsDB
                .collection(this.db_Users_Collection)
                .doc(uid)
                .set(Object.assign({}, user))
            );
          }
        })
      );
  }

  // get list of contacts and show on contacts component
  //TODO: create filter
  getContacts(currentUserID: string): Observable<User[]> {
    return this.db.afsDB
      .collection<User>(this.db_Users_Collection, (ref) =>
        ref.where('_uid', '!=', currentUserID)
      )
      .valueChanges()
      .pipe(
        map((users) =>
          users.map((user) => {
            let updatedUser = new User(user._uid!, user);
            updatedUser.chatRooms = user._chatRooms || [];
            return updatedUser;
          })
        )
      );
  }

  // return list of messages as Observables
  getChatMessage(chatRoomID: string): Observable<Message[]> {
    console.log(chatRoomID);
    this.currentChatRoom$.next(chatRoomID);
    return this.db.afsDB
      .collection<ChatRoom>(this.db_ChatRooms_Collection)
      .doc(chatRoomID)
      .collection<Message>(this.db_Messages_Collection, (ref) =>
        ref.orderBy('_timeStamp', 'desc')
      )
      .valueChanges()
      .pipe(
        catchError(() => EMPTY),
        tap((messages) => this.messagesSubject.next(messages))
      );
  }

  // check if there is already room between 2 users, return chatRoom id observable
  checkIfUserRoomExists(uid: string, chatWithUID: string): Observable<string> {
    return this.db.afsDB
      .collection(this.db_ChatRooms_Collection)
      .doc(`${uid}${chatWithUID}`)
      .get()
      .pipe(
        switchMap((result1) =>
          this.db.afsDB
            .collection(this.db_ChatRooms_Collection)
            .doc(`${chatWithUID}${uid}`)
            .get()
            .pipe(
              map((result2) => {
                if (result1.exists) {
                  return result1.id;
                } else if (result2.exists) {
                  return result2.id;
                } else return '';
              })
            )
        )
      );
  }

  // Return messages (observable)  from after selecting contact in  contacts(if any)
  openChatRoomInContacts(
    uid: string,
    chatWithUID: string
  ): Observable<Message[]> {
    return this.checkIfUserRoomExists(uid, chatWithUID)
      .pipe(
        switchMap((chatRoomID) => {
          if (chatRoomID) {
            return this.getChatMessage(chatRoomID);
          } else {
            return this.createNewChatRoom(
              [uid, chatWithUID],
              ChatRoom.TYPE_ONE
            ).pipe(switchMap((chatRoomID) => this.getChatMessage(chatRoomID)));
          }
        })
      )
      .pipe(tap((messages) => this.messagesSubject.next(messages)));
  }

  // create new ChatRoom to chatRooms collection && AddChatRoom2UserChatRooms
  // main function to create new chatroom
  createNewChatRoom(uids: string[], chatRoomType: string) {
    if (chatRoomType === ChatRoom.TYPE_MANY) {
      //TODO: fix type_many
      return from(
        this.db.afsDB
          .collection(this.db_ChatRooms_Collection)
          .add({ _id: '1', _lastMessage: 2 })
      ).pipe(
        switchMap((newChatRoom) =>
          from(uids).pipe(
            mergeMap((uid) => {
              this.addChatRoom2UserChatRooms(uid, newChatRoom.id).subscribe();
              return from(newChatRoom.id);
            })
          )
        )
      );
    } else {
      let chatRoom = new ChatRoom(`${uids[0]}${uids[1]}`);
      chatRoom.members = uids;
      chatRoom.type = ChatRoom.TYPE_ONE;
      let createChatRoom$ = merge(
        from(uids).pipe(
          mergeMap((uid) => {
            {
              return this.addChatRoom2UserChatRooms(
                uid,
                `${uids[0]}${uids[1]}`
              );
            }
          })
        ),
        from(
          this.db.afsDB
            .collection(this.db_ChatRooms_Collection)
            .doc(chatRoom.id)
            .set(Object.assign({}, chatRoom))
            .then(() => {
              return 'chatRoomCreated';
            })
        ).pipe((result) =>
          from(
            this.db.afsDB
              .collection(this.db_ChatRooms_Collection)
              .doc(chatRoom.id)
              .collection(this.db_Messages_Collection)
              .doc('1')
              .set({})
          )
        )
      );

      return createChatRoom$.pipe(
        switchMap(() => {
          return of(chatRoom.id);
        })
      );
    }
  }

  //Get users/_chatRooms list then add new chatRoom to Users/_chatRooms list
  addChatRoom2UserChatRooms(uid: string, chatRoomID: string) {
    return this.getUserChatRoomList(uid).pipe(
      map((chatRooms: string[]) => {
        chatRooms.push(chatRoomID);
        return chatRooms;
      }),

      switchMap((updatedChatRooms) =>
        from(
          this.db.afsDB
            .collection<User>(this.db_Users_Collection)
            .doc(`${uid}`)
            .update({ _chatRooms: updatedChatRooms })
            .then(() => {
              return 'chatRoomCreated';
            })
        )
      )
    );
  }

  createMessage(chatRoomID: string, message: Message) {
    return this.db.afsDB
      .collection(this.db_ChatRooms_Collection)
      .doc(chatRoomID)
      .collection(this.db_Messages_Collection)
      .add(Object.assign({}, message))
      .then(() => this.updateLastMessage(chatRoomID, message))
      .catch((error) => console.log(error));
  }

  getUserInfo(uid: string): Observable<User> {
    return this.db.afsDB
      .collection<User>(this.db_Users_Collection)
      .doc(uid)
      .get()
      .pipe(map((result) => result.data()!));
  }

  getMultiUsersInfo(uids: string[]) {
    return from(uids).pipe(
      mergeMap((uid) => this.getUserInfo(uid as string)),
      toArray()
    );
  }

  updateLastMessage(chatRoomID: string, message: Message) {
    return this.db.afsDB
      .collection(this.db_ChatRooms_Collection)
      .doc(chatRoomID)
      .update({
        _lastMessage: Object.assign({}, message),
      });
  }

  // testing methods

  getChatRoomInfo(chatRoomID: string): Observable<ChatRoom> {
    return this.db.afsDB
      .collection<ChatRoom>(this.db_ChatRooms_Collection)
      .doc(chatRoomID)
      .valueChanges() as Observable<ChatRoom>;
  }
}
