import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/Publication.interface';
import { Author } from '../models/Author.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  getPublications() {
    return this.http.get<Publication[]>(`${this.API}publications?_sort=date&_order=desc`);
  }

  getAuthorPublications(id: string) {
    return this.http.get<Publication[]>(`${this.API}authors/${id}/publications?_sort=date&_order=desc`);
  }

  getAuthors() {
    return this.http.get<Author[]>(`${this.API}authors?_sort=lastName&_order=asc`);
  }

  getAuthor(id: string) {
    return this.http.get<Author>(`${this.API}authors/${id}`);
  }
}
