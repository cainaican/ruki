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
    DividerModule
  ]
})
export class CabinetModule { }
