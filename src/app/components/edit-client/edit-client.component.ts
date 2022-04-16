import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    id: '',
    Name: '',
    Surname: '',
    Email: '',
    Phone: '',
    Balance: 0
  }

  disableBalanceOnEdit: boolean = true;

  hasBalance: Boolean;
  showBalanceUpdateInput: boolean = false;

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    //Get id from URL
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      console.log(this.client)
      if (client != null) {
        this.client = client
      }

    })
  }


  onSubmit({ value, valid }: { value: Client, valid: any }): void {

  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {

  }

}
