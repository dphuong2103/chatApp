import { AuthService } from 'src/app/core/auth/auth.service';
import { DatabaseService } from './../../../../../core/database/database.service';
import { ManipulateDatabaseService } from './../../../../../core/database/manipulate-database.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { HomepageGetDataService } from '../../../dataService/homepage-get-data.service';

import { ChatRoomNUserInfo } from 'src/app/core/models/userchatroom/userinfo-chat-room.model';
import { ChatRoom } from 'src/app/core/models/chatroom/chat-room.model';
import { User } from 'src/app/core/models/user/user.model';
@Component({
  selector: 'sidebar-content-chat-list',
  templateUrl: './sidebar-content-chat-list.component.html',
  styleUrls: ['./sidebar-content-chat-list.component.scss'],
})
export class SidebarContentChatListComponent implements OnInit {
  chatRoomsNUserInfo$?: Observable<ChatRoomNUserInfo[]>;

  constructor(
    private manipulateDB: ManipulateDatabaseService,
    private db: DatabaseService,
    private auth: AuthService,
    public getData: HomepageGetDataService
  ) {}

  ngOnInit(): void {
    this.getChatRooms();
  }

  getChatRooms() {
    this.chatRoomsNUserInfo$ =
      this.manipulateDB.chatRoomsNUserInfo$?.asObservable();
  }
  log() {}

  selectChatRoom(chatRoomID: string, chatRoomNUserInfo: ChatRoomNUserInfo) {
    console.log('123');
    this.getData.updateIsShowChatRoom(true);
    this.manipulateDB.getChatMessage(chatRoomID).subscribe();
    this.manipulateDB.selectedChatRoomNUserInfoSubject.next(chatRoomNUserInfo);
  }
}
