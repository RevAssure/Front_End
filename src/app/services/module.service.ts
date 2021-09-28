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
    this.setAuthorizationHeader(jwt);
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
    this.setAuthorizationHeader(jwt);
    return this.http.post<Module>(`${this.url}`, moduleDto, this.httpOptions);
  }
  
  /**
   * Updates an existing Module with new data when performing PUT /module.
   * @param jwt JWT for authorization
   * @param moduleDto the DTO for with new Module data 
   * @returns an Observable containing the updated Module
   */
  updateModule(jwt: string, moduleDto: any): Observable<Module> {
    this.setAuthorizationHeader(jwt);
    return this.http.put<Module>(`${this.url}`, moduleDto, this.httpOptions);
  }

  /**
   * Helper method to set the authorization header for HTTP requests.
   * @param jwt JWT for authorization
   */
  setAuthorizationHeader(jwt: string): void {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
  }
  
  /**
   * Retrieves a Module from the local cache if the ID exists.
   * Otherwise returns null.
   * @param id the ID of the Module to be retrieved
   * @returns a Module with an ID that matches the ID parameter or null if no Module matches 
   */
  getModuleById(id: number): Module | null {
    for (let module of this.modules) {
      if (module.id === id) {
        return module;
      }
    }
    return null;
  }
}
