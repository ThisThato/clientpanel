import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: Boolean;
  showBalanceUpdateInput: boolean = false;

  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    //Get id from URL
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      console.log(this.client)
      if (client != null) {

        if (client.Balance > 0) {
          this.hasBalance = true;
        }
        this.client = client

      }

    })
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm(`Are you sure you want to delete? ` + this.client.Name + ` ` + this.client.Surname)) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show(`Client Deleted` + this.client.Name + ` ` + this.client.Surname, {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
