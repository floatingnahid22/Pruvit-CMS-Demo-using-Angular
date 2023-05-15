import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private domain = environment.domain;
  private categoriesEndpoint = 'collections/category/';
  url = `${this.domain}/${this.categoriesEndpoint}`;

  constructor(private http: HttpClient) {}

  //get categories
  getCategories(): Observable<any> {
    return this.http.get(this.url);
  }

  //add new category/sucategory
  addCategories(categoryInfo: any, parentId: string | null): Observable<any> {
    const newCategory = {
      name: categoryInfo.name,
      shortText: categoryInfo.shortText,
      longText: categoryInfo.longText,
      media: categoryInfo.media,
      // set the parent id here
      parent: parentId,
      subCategories: [],
    };
    return this.http.post(this.url, newCategory);
  }

  //delete selected category/subcategory
  deleteCategory(categoryId: any): Observable<any> {
    const deleteUrl = this.url + categoryId;
    return this.http.delete(deleteUrl);
  }

  //update category/subcategory
  editCategoryInfo(categoryId: any, editedCategoryInfo: any): Observable<any> {
    const editUrl = this.url + categoryId;
    return this.http.patch(editUrl, editedCategoryInfo);
  }
}
