import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

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

  constructor(private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
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
    if (!valid) {
      this.flashMessage.show('Please fill out form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      //Add id to client
      value.id = this.id;
      //Update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/client/' + this.id]);
    }
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
