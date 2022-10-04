import { ManipulateDatabaseService } from './../../../../../core/database/manipulate-database.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DatabaseService } from './../../../../../core/database/database.service';
import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { HomepageGetDataService } from '../../../dataService/homepage-get-data.service';
import { User } from 'src/app/core/models/user/user.model';
@Component({
  selector: 'app-sidebar-content-contact',
  templateUrl: './sidebar-content-contact.component.html',
  styleUrls: ['./sidebar-content-contact.component.scss'],
})
export class SidebarContentContactComponent implements OnInit {
  contacts$?: Observable<User[]>;
  constructor(
    public db: DatabaseService,
    private auth: AuthService,
    public manipulateDB: ManipulateDatabaseService,
    private getData: HomepageGetDataService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.getData.contactsSubject.asObservable();
  }

  selectContact(chatWithUID: string) {

    this.getData.selectContact(this.auth.currentUserID(), chatWithUID);
    this.getData.updateIsShowChatRoom(true);
  }
}
