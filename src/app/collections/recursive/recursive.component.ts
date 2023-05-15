import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

export class subCategories {
  id: string = '';
  name: string = '';
  shortText: string = '';
  longText: string = '';
  parent: string = '';
  media: Array<string>[] = [];
  subCategories: subCategories[] = [];
}

@Component({
  selector: 'app-recursive',
  templateUrl: './recursive.component.html',
  styleUrls: ['./recursive.component.css'],
})
export class RecursiveComponent implements OnInit {
  @Input() subCategories: subCategories[] | undefined;
  @Output() deleteSubCategoryEvent = new EventEmitter<any>();
  @Output() addSubCategoryEvent = new EventEmitter<any>();
  @Output() editSubCategoryEvent = new EventEmitter<any>();

  ngOnInit(): void {}

  deleteSubCategory(subcategoryId: any) {
    this.deleteSubCategoryEvent.emit(subcategoryId);
  }

  addSubcategory(subcategoryId: any) {
    this.addSubCategoryEvent.emit(subcategoryId);
  }

  editSubcategory(subcategoryId: any) {
    this.editSubCategoryEvent.emit(subcategoryId);
  }
}
