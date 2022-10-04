import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContentChatListComponent } from './sidebar-content-chat-list.component';

describe('SidebarContentChatListComponent', () => {
  let component: SidebarContentChatListComponent;
  let fixture: ComponentFixture<SidebarContentChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarContentChatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContentChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
