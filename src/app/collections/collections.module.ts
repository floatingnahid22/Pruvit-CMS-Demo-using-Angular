import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CollectionsComponent } from './collections.component';
import { RecursiveComponent } from './recursive/recursive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AttributesComponent } from './attributes/attributes.component';

@NgModule({
  declarations: [CategoriesComponent, CollectionsComponent, RecursiveComponent, AttributesComponent],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    ReactiveFormsModule
  ],
})
export class CollectionsModule {}
