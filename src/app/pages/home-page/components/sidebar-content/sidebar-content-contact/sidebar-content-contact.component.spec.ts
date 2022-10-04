import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContentContactComponent } from './sidebar-content-contact.component';

describe('SidebarContentContactComponent', () => {
  let component: SidebarContentContactComponent;
  let fixture: ComponentFixture<SidebarContentContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarContentContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContentContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
