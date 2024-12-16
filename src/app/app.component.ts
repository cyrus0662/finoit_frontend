import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

interface Contact {
  recordId: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Contact Form';
  contacts: Contact[] = [];
  contact: Contact = { recordId: '', email: '', firstName: '', lastName: '' };
  message: string = '';
  isCreating: boolean = false;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    const apiUrl = environment.apiUrl;
    this.http.get<Contact[]>(`${apiUrl}/subscriber/all`).subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      },
      error => {
        console.error(error);
        this.message = 'Error fetching contacts';
      }
    );
  }

  createNewContact(): void {
    this.contact = { recordId: '', email: '', firstName: '', lastName: '' };
    this.isCreating = true;
    this.message = '';
  }

  createContact(): void {
    const apiUrl = environment.apiUrl;
    if (this.contact.email && this.contact.firstName && this.contact.lastName) {
      this.http.post<any>(`${apiUrl}/subscriber`, this.contact).subscribe(
        response => {
          this.message = 'Contact created successfully';
          this.getContacts();
          this.contact = { recordId: '', email: '', firstName: '', lastName: '' };
          this.isCreating = false;
        },
        error => {
          this.message = 'Failed to create contact';
        }
      );
    } else {
      this.message = 'Please fill all fields';
    }
  }

  getContactDetails(id: string): void {
    const apiUrl = environment.apiUrl;
    this.http.get<Contact>(`${apiUrl}/subscriber?id=${id}`).subscribe(contact => {
      this.contact = contact;
      this.isCreating = false;
    });
  }
} 