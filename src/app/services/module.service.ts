import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Module } from '../module';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(private http: HttpClient) { }

  url: string = `${environment.revAssureBase}module`;

  modules: Module[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  getAllModules(jwt: string): Observable<Module[]> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Module[]>(`${this.url}`, this.httpOptions).pipe(
      tap(modules => this.modules = modules)
    );
  }

  getModuleById(id: number): Module | null {
    for (let module of this.modules) {
      if (module.id === id) {
        return module;
      }
    }
    return null;
  }
}