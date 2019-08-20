import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
   }

   private list(endpoint: string): Observable<any[]> {
     return this.http.get<any[]>(`${this.baseUrl}${endpoint}/`);
   }

   private detail(endpoint: string, objId: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}${endpoint}/${objId}/`);
   }

   private create(endpoint: string, obj: any): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}${endpoint}/`, obj);
   }

   private patch(endpoint: string, obj: any): Observable<any> {
    return this.http.patch<any[]>(`${this.baseUrl}${endpoint}/${obj.id}/`, obj);
   }

   private update(endpoint: string, obj: any): Observable<any> {
    return this.http.put<any[]>(`${this.baseUrl}${endpoint}/${obj.id}/`, obj);
   }

   private remove(endpoint: string, obj: any): Observable<any> {
    return this.http.delete<any[]>(`${this.baseUrl}${endpoint}/${obj.id}/`);
   }

   getAllAddresses(): Observable<Address[]> {
     return this.list('addresses');
   }

   getSelectedAddress(objId: number): Observable<Address> {
    return this.detail('addresses', objId);
  }

  createAddress(obj: Address): Observable<Address> {
    return this.create('addresses', obj);
  }

  updateAddress(obj: Address): Observable<Address> {
    return this.update('addresses', obj);
  }

  patchAddress(obj: Address): Observable<Address> {
    return this.patch('addresses', obj);
  }

  removeAddress(obj: Address): Observable<Address> {
    return this.remove('addresses', obj);
  }
}
