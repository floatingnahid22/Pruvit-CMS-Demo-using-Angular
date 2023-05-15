import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  private domain = environment.domain;
  private attributeEndpoint = 'collections/attribute/';
  private choiceEndpoint = 'collections/choice/';
  attributeUrl = `${this.domain}/${this.attributeEndpoint}`;
  choiceUrl = `${this.domain}/${this.choiceEndpoint}`;

  constructor(private http: HttpClient) {}

  // to show attributes
  getAttributes(): Observable<any> {
    return this.http.get(this.attributeUrl);
  }

  // to add attribute
  addAttributes(attribute: any): Observable<any> {
    return this.http.post(this.attributeUrl, attribute);
  }

  //to delete selected attribute
  deleteAttribute(attributeId: string): Observable<any> {
    const deleteUrl = this.attributeUrl + attributeId;
    return this.http.delete(deleteUrl);
  }

  //to update attribute
  editAttribute(
    attributeId: string,
    editedAttributeInfo: any
  ): Observable<any> {
    const editUrl = this.attributeUrl + attributeId;
    return this.http.patch(editUrl, editedAttributeInfo);
  }

  // to show choice
  getChoices(): Observable<any> {
    return this.http.get(this.choiceUrl);
  }

  // to add choice
  addChoices(choice: any): Observable<any> {
    return this.http.post(this.choiceUrl, choice);
  }

  // to add choice
  addBulkChoices(attributeId: string, choices: any): Observable<any> {
    const bulkAddUrl = this.attributeUrl + attributeId;
    return this.http.patch(bulkAddUrl, choices);
  }

  //to delete selected choice
  deleteChoice(choiceId: string): Observable<any> {
    const deleteUrl = this.choiceUrl + choiceId;
    return this.http.delete(deleteUrl);
  }

  //to update choice
  editChoice(choiceId: string, editedChoiceIdInfo: any): Observable<any> {
    const editUrl = this.choiceUrl + choiceId;
    return this.http.patch(editUrl, editedChoiceIdInfo);
  }
}
