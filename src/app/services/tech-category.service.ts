import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TechnologyCategory, TechnologyCategoryAdapter } from '../technologycategory';


/**
 * The TechCategoryService is used to get a collection of the current TechnologyCategories. 
 */
@Injectable({
  providedIn: 'root'
})
export class TechCategoryService {

constructor(private http: HttpClient, private techCategoryAdapter: TechnologyCategoryAdapter) { }

  url: string = `${environment.revAssureBase}technology_category`;

  categories : TechnologyCategory[] = [];

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": ""
    })
  };

  /**
   * Performs a GET to retrieve all existing TechnologyCategories.
   * @param jwt - JWT for authorization
   * @returns - an Observable with all the TechnologyCategories currently in the database
   */
  getAllCategories(jwt : string): Observable<TechnologyCategory[]> {
      let data : TechnologyCategory[] = [];
      this.httpOptions.headers = this.httpOptions.headers.set("Authorization", `Bearer ${jwt}`);
      return this.http.get<any[]>(this.url, this.httpOptions).pipe(
        map( (result: any[]) => {
          result.forEach( (item : any) => this.categories.push(this.techCategoryAdapter.adapt(item)));
          return this.categories;
        })
      )
  }
}
