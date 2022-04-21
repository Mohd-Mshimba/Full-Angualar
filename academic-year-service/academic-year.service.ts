import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
import { AcademicYear } from 'src/app/models/academic-year';

@Injectable({
  providedIn: 'root'
})

export class AcademicYearService {

  private baseUrl: string = environment.baseUrl + 'academicYear';
  constructor(private http: HttpClient) { }

  getAll(): Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(this.baseUrl+"/");
  }

  getAllPage(page:any,itempage:any): Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(this.baseUrl+"/?page="+page+"&&size="+itempage);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl+"/", data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}