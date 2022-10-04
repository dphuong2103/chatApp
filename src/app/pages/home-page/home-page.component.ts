import { Unsubscriber } from './../../shared/unsubscribe/unscriber';
import { ManipulateDatabaseService } from 'src/app/core/database/manipulate-database.service';
import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HomepageGetDataService } from './dataService/homepage-get-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent extends Unsubscriber implements OnInit {
  constructor(
    public auth: AuthService,
    public getData: HomepageGetDataService,
    public manipulateDB: ManipulateDatabaseService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getChatRooms();
    this.getContacts();
  }

  // get list of contacts and show on contacts component
  getContacts() {
    this.getData.getContacts();
  }

  getChatRooms() {
    console.log(123)
    this.anotherSubscription = this.manipulateDB
      .getUserChatRoomInfo(this.auth.currentUserID())
      .subscribe();
  }
}
