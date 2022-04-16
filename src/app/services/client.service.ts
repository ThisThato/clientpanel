import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
//'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})

export class ClientService { //Service Provides Us With Data

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private firestore: AngularFirestore) {
    this.clientsCollection = this.firestore.collection('manage.clients', ref => ref.orderBy('Surname', 'asc'))
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(map((changes) => {
      return changes.map((action) => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        console.log(data);
        return data;
      });
    }));

    return this.clients;
  }

  getClient(id: string): Observable<any> {

    this.clientDoc = this.firestore.doc<Client>(`manage.clients/${id}`); //Get the specific document
    return this.clientDoc.snapshotChanges().pipe(map(action => {

      const data = action.payload.data() as Client;
      data.id = action.payload.id;
      return action.payload.exists ? data : null;

    }))

  }

  updateClient(client: Client) {
    this.clientDoc = this.firestore.doc(`manage.clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientDoc = this.firestore.doc(`manage.clients/${client.id}`);
    this.clientDoc.delete();
  }

  newClient(client: Client): void {
    this.clientsCollection.add(client)
  }

}
