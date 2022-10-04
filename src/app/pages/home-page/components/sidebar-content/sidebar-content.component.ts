import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomepageGetDataService } from '../../dataService/homepage-get-data.service';

@Component({
  selector: 'homepage-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {

  }
}
