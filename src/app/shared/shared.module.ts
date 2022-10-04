import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import {  } from './shared-routing.module';
import { ToastComponent } from './utility/toast/toast.component';
import 'reflect-metadata';
@NgModule({
  declarations: [ToastComponent],
  // , SharedRoutingModule
  imports: [CommonModule],
  exports: [ReactiveFormsModule, ToastComponent],
})
export class SharedModule {}
