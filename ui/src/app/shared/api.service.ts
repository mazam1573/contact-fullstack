import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllContacts() {
    return this.http.get<Contact[]>(this.baseUrl + '/Contacts');
  }

  getContactById(id: number) {
    return this.http.get<Contact>(this.baseUrl + '/Contacts/' + id);
  }

  saveContact(data) {
    return this.http.post(this.baseUrl + '/Contacts', data);
  }

  updateContact(id, data) {
    return this.http.put(this.baseUrl + '/Contacts/' + id, data);
  }

  deleteContact(id) {
    return this.http.delete(this.baseUrl + '/Contacts/' + id);
  }
}
