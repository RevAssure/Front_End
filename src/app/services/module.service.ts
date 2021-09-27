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
   * Also caches the fetched modules array.
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
   * Performs a POST to "/module" to register a new module to database.
   * @param jwt JWT for authorization
   * @param moduleDto the DTO for the new Module
   * @returns an Observable containing the new Module as it is persisted in database
   */
  createModule(jwt: string, moduleDto: any): Observable<Module> {
    this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
    return this.http.post<Module>(`${this.url}`, moduleDto, this.httpOptions);
  }

  /**
   * Looks up the cached modules array for a module with the passed ID.
   * @param id - (number) ID of requested module.
   * @returns Module with requested ID.
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
