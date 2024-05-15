import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './cabinet.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { GalleriaModule } from 'primeng/galleria';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
  declarations: [CabinetComponent],
  imports: [
    CommonModule,
    FormsModule,
    CabinetRoutingModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    DividerModule,
    DataViewModule,
    TagModule,
    SkeletonModule,
    GalleriaModule,
    InputGroupModule,
    InputGroupAddonModule
  ]
})
export class CabinetModule { }
