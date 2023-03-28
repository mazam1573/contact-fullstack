import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { __param } from 'tslib';
import { Contact } from '../models/contact';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this.apiService.getAllContacts().subscribe(res => {
      this.contacts = res;
    });
  }

  onAddClick() {
    this.router.navigateByUrl('contact-form');
  }

  onEdit(contact: Contact) {
    this.router.navigate(['contact-form', { id: contact.id }]);
  }

  onDelete(id: number) {
    if (window.confirm("Are you sure to delete this record!")) {
      this.apiService.deleteContact(id).subscribe(res => {
        this.getAllContacts();
      });
    } else {
      this.getAllContacts();
    }
  }

}
