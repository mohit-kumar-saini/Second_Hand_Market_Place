import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/products/categories'; 
  
  private categorySubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  changeCategory(category: string): void {
    this.categorySubject.next(category);
  }

  getCategoryUpdates(): Observable<string> {
    return this.categorySubject.asObservable();
  }
}
