import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INode } from '../models/INode';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getJsonData(): Observable<INode[]> {
    return this.http.get<INode[]>('assets/json/data.json');
  }
}
