import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { IWork } from '../models/work';
import { WorksService } from '../demo/service/works.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {

    items!: MenuItem[];
    visible: boolean = false;

    newWork: IWork = {
        contact: "",
        price: null,
    };

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private _workService: WorksService) { }

    showDialog() {
        this.visible = true;
    }

    saveNewWork() {
        this._workService.saveWork(this.newWork);
        this.visible = false;
        this.newWork = {
            contact: "",
            price: null
        };
    }
}
