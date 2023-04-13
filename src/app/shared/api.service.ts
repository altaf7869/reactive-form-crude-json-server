import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { companymodel } from '../Model/companymodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  apiUrl='http://localhost:3000/company';

  GetAllCompany():Observable<companymodel[]>{
    return this.http.get<companymodel[]>(this.apiUrl);
  }

  CreateCompany(companydata:any){
    return this.http.post(this.apiUrl, companydata)
  }

  GetCompanyById(id:any):Observable<companymodel[]>{
    return this.http.get<companymodel[]>(this.apiUrl+ '/'+id);

  }

  RemoveCompanyById(id:any){
    return this.http.delete(this.apiUrl+ '/'+ id);
  }

  UpdateCompany(id:any,companydata:any){
    return this.http.put(this.apiUrl + '/' + id, companydata)
  }

}
