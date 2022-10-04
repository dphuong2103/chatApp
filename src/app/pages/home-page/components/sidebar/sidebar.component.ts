import { AuthService } from './../../../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { map, pipe, take } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'homepage-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuLink = {
    chatList: 'chat',
    profile: 'profile',
    contact: 'contact',
    friends: 'friend',
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signOut() {
    this.auth.signOut();
  }
}
