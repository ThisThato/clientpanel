import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService,
    private flashMessageService: FlashMessagesService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.authService.register(this.email, this.password).then(res => {
      this.flashMessageService.show('You are now registered and logged in', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }).catch(err => {
      this.flashMessageService.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

}
