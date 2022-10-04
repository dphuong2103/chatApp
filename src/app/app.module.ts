import { DatabaseService } from './core/database/database.service';
import { LoginComponent } from './pages/login-page/components/login/login.component';
import { AuthModule } from './core/auth/auth.module';
import { InputComponent } from './pages/login-page/shared/utility/input/input.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatRoomComponent } from './pages/home-page/components/chat-room/chat-room.component';
import { SidebarComponent } from './pages/home-page/components/sidebar/sidebar.component';
import { SidebarContentComponent } from './pages/home-page/components/sidebar-content/sidebar-content.component';
import { SidebarContentChatListComponent } from './pages/home-page/components/sidebar-content/sidebar-content-chat-list/sidebar-content-chat-list.component';
import { SidebarContentProfileComponent } from './pages/home-page/components/sidebar-content/sidebar-content-profile/sidebar-content-profile.component';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './pages/login-page/components/signup/signup.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularMatDialogComponent } from './shared/utility/angular-mat-dialog/angular-mat-dialog.component';
import { SidebarContentContactComponent } from './pages/home-page/components/sidebar-content/sidebar-content-contact/sidebar-content-contact.component';
import { HomepageGetDataService } from './pages/home-page/dataService/homepage-get-data.service';
@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    HomePageComponent,
    SidebarComponent,
    SidebarContentComponent,
    SidebarContentChatListComponent,
    SidebarContentProfileComponent,
    LoginComponent,
    SignupComponent,
    LoginPageComponent,
    InputComponent,
    AngularMatDialogComponent,
    SidebarContentContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AuthModule,
  ],
  providers: [DatabaseService, HomepageGetDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
