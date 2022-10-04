import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Observable, tap, pipe } from 'rxjs';
import { HomepageGetDataService } from '../../dataService/homepage-get-data.service';
import { ManipulateDatabaseService } from 'src/app/core/database/manipulate-database.service';
import { Message } from 'src/app/core/models/message/message.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ChatRoomNUserInfo } from 'src/app/core/models/userchatroom/userinfo-chat-room.model';
@Component({
  selector: 'homepage-chatroom',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  messages$?: Observable<Message[]>;
  selectedChatRoomNUserInfo$?: Observable<ChatRoomNUserInfo>;
  messageForm: FormGroup = new FormGroup({});
  constructor(
    public getData: HomepageGetDataService,
    private manipulateDB: ManipulateDatabaseService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.messages$ = this.manipulateDB.messagesSubject.asObservable();

    this.createMessageForm();
    this.selectedChatRoomNUserInfo$ =
      this.manipulateDB.selectedChatRoomNUserInfoSubject.asObservable();
  }

  createMessageForm() {
    this.messageForm = new FormGroup({
      _message: new FormControl(null, [Validators.required]),
    });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      let message = Message.newMessage(
        this.auth.currentUserID(),
        this.messageForm?.value['_message']
      );
      this.messageForm?.controls['_message'].setValue('');
      this.manipulateDB.createMessage(
        this.manipulateDB.currentChatRoom$.value,
        message
      );
    }
  }
}
