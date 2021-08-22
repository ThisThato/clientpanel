import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  totalOwed: number;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      console.log(clients)
      this.getTotalOwed()
      this.clients = clients;
    })
  }

  getTotalOwed() {
    const total = this.clients.reduce((total, client) => {
      const value = total + Number(client.balance)
      console.log(value)
      return value;
    }, 0)
  }

}
