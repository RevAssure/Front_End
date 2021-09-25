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

  /**
   * Gets an array of all Modules owned by the current user if they are a trainer when performing GET /module.
   * @param jwt JWT for authorization
   * @returns an Observable containing an array of all the current user's Modules
   */
  getAllModules(jwt: string): Observable<Module[]> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.get<Module[]>(`${this.url}`, this.httpOptions).pipe(
      tap(modules => this.modules = modules)
    );
  }

  /**
   * Persists a new Module using a provided Module DTO object when performing POST /module.
   * @param jwt JWT for authorization
   * @param moduleDto the DTO for creating a new Module
   * @returns an Observable containing the new Module that has been created
   */
  createModule(jwt: string, moduleDto: any): Observable<Module> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.post<Module>(`${this.url}`, moduleDto, this.httpOptions);
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
