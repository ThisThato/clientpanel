import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser?: string;
  showRegister: boolean;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        console.log(auth);
        this.isLoggedIn = true;
        this.loggedInUser = auth.email?.toString();
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 4000
    } as any);
    this.router.navigate(['/login']);
  }

}
