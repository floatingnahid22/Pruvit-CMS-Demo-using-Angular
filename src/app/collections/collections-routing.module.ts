import { CollectionsComponent } from './collections.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from '../guards/auth.guard';
import { AttributesComponent } from './attributes/attributes.component';

const routes: Routes = [
  {
    path: 'collections',
    component: CollectionsComponent,
    children: [
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'attributes',
        component: AttributesComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionsRoutingModule {}
