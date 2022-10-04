import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMatDialogComponent } from './angular-mat-dialog.component';

describe('AngularMatDialogComponent', () => {
  let component: AngularMatDialogComponent;
  let fixture: ComponentFixture<AngularMatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularMatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
