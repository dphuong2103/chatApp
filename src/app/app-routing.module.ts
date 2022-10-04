import { SidebarContentProfileComponent } from './pages/home-page/components/sidebar-content/sidebar-content-profile/sidebar-content-profile.component';
import { SidebarContentChatListComponent } from './pages/home-page/components/sidebar-content/sidebar-content-chat-list/sidebar-content-chat-list.component';
import { AuthenticationGuard } from './core/auth/authentication.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupComponent } from './pages/login-page/components/signup/signup.component';
import { LoginComponent } from './pages/login-page/components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarContentContactComponent } from './pages/home-page/components/sidebar-content/sidebar-content-contact/sidebar-content-contact.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/loginPage']);
const routes: Routes = [
  {
    path: '',
    redirectTo: '/loginPage',
    pathMatch: 'full',
  },

  {
    path: 'loginPage',
    component: LoginPageComponent,

  children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  {
    path: 'homepage',
    component: HomePageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'chat', component: SidebarContentChatListComponent },
      {
        path: 'profile',
        component: SidebarContentProfileComponent,
      },
      { path: 'contact', component: SidebarContentContactComponent },
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
