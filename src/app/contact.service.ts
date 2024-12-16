import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Contact {
  contactId: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/subscriber';

  constructor(private http: HttpClient) {}

  // Get all contacts
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:8080/all');
  }

  // Get single contact details by ID
  getContacts(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}?id=${id}`);
  }

  // Create a new contact
  createContact(contact: Contact): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }
}
