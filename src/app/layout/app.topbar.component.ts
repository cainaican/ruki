import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { IWork } from '../models/work';
import { WorksService } from '../demo/service/works.service';
import { Auth } from '@angular/fire/auth';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FileUpload, UploadEvent } from 'primeng/fileupload';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {

    @ViewChild("pFileUpload") fileUpload: FileUpload;

    items!: MenuItem[];
    visible: boolean = false;
    uploadedFiles: any = [];
    storageBucket: string = "";

    newWork: IWork = {
        contact: "",
        price: null,
        userId: this._auth.currentUser.uid
    };

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService, 
        private _workService: WorksService, 
        private _auth: Auth,
        private _storage: Storage
    ) { }

    showDialog() {
        this.visible = true;
    }

    saveNewWork() {
        // this._workService.saveWork(this.newWork);
        console.log(this.newWork);

        this.onUpload(this.fileUpload.files);

        this.visible = false;
        this.newWork = {
            contact: "",
            price: null,
            userId: this._auth.currentUser.uid
        };
    }
    
    onUpload(event: File[]) {
        if (!event) return;

        const files: File[] = event;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const storageRef = ref(this._storage, `images/file.name`);
                uploadBytesResumable(storageRef, file).then(v => {
                    debugger
                }).catch(v => {
                    debugger
                });
            }
        }

    }
}
