import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CabinetComponent } from './cabinet.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CabinetComponent }
    ])],
    exports: [RouterModule]
})
export class CabinetRoutingModule { }
