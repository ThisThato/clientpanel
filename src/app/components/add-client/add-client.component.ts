import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    id: '',
    Name: '',
    Surname: '',
    Email: '',
    Phone: '',
    Balance: 0
  }

  disableBalanceonAdd: boolean = true
  @ViewChild('clientForm') form: any

  constructor(private flashMessage: FlashMessagesService, private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit({ value, valid }: { value: Client, valid: any }): void {
    if (this.disableBalanceonAdd) {
      value.Balance = 0;
    }
    if (!valid) {
      this.flashMessage.show('Please fill the form out correctly', { cssClass: 'alert-danger', timeout: 4000 });

    } else {
      this.clientService.newClient(value);
      this.flashMessage.show('New client added', { cssClass: 'alert-success', timeout: 4000 });

      this.router.navigate(['/'])
    }
  }

}
