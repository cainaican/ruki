import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { WorksService } from '../../service/works.service';
import { SkeletonModule } from 'primeng/skeleton';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    SkeletonModule,
    GalleriaModule,
    DialogModule,
    CardModule
  ],
  providers: [WorksService]
})
export class ListModule { }
