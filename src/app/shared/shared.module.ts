import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionsModule } from '../collections/collections.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [ SidebarComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CollectionsModule,
  ],
  exports: [SidebarComponent]
})
export class SharedModule {}
