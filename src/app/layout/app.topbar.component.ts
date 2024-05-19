import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { IWork, IWorkImages } from '../models/work';
import { WorksService } from '../demo/service/works.service';
import { Auth } from '@angular/fire/auth';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FileUpload } from 'primeng/fileupload';
import { HttpClient, HttpParams } from '@angular/common/http';
import { debounceTime } from 'rxjs';
import uniqid from 'uniqid';

export interface INominatimFullAdress {
    house_number: string;
    road: string;
    city: string;
} 
export interface INominatimAddressResponse {
    display_name: string;
    lat: string;
    lon: string;
    address: INominatimFullAdress;
}

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

    suggestions: any[] | undefined;

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
        private _storage: Storage,
        public config: PrimeNGConfig,
        public httpClient: HttpClient,
        public messageService: MessageService
    ) {
        this.config.translation.choose = "Выбрать";
        this.config.translation.cancel = "Очистить";
     }

    showDialog() {
        this.visible = true;
    }

    saveNewWork() {
        this.onUpload(this.fileUpload.files);
    }
    
    onUpload(event: File[]) {

        this.newWork.address = this.newWork.address ?? "Без адреса";

        if (event.length === 0) {

            this.newWork.contact = this._auth.currentUser.displayName;
            this.newWork.phone = this._auth.currentUser.phoneNumber;
            this.newWork.id = uniqid();
            this.newWork.images = [{
                alt: "Нет фото",
                itemImageSrc: "./assets/ruki/notfound.jpg",
                title: "Фото"
            }];

            this._workService.saveWork(this.newWork);
            this.newWork = {
                contact: "",
                price: null,
                userId: this._auth.currentUser.uid,
                location: null,
                phone: null,
                id: null
            };
            this.visible = false;
            this.messageService.add({detail: "Подработка добавлена", severity: "succes", summary: "Подработка"});
            return;
        };

        const files: File[] = event;
        const images: IWorkImages[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file) {
                const pathToImage = `images/${this._auth.currentUser.phoneNumber}_${this._auth.currentUser.uid}/work_${i}${new Date().getTime()}`
                const storageRef = ref(this._storage, pathToImage);
                
                uploadBytesResumable(storageRef, file).then(v => {
                    this._workService.getImageLinks(storageRef).then((v) => {
                        const itemImageSrc = v;
                        images.push({
                            alt: `Фото подработки-${i}`,
                            itemImageSrc,
                            title: `Заголовок-${i}`
                        })

                        if(images.length === files.length) {
                            this.newWork.images = images;

                            this.newWork.contact = this._auth.currentUser.displayName;
                            this.newWork.phone = this._auth.currentUser.phoneNumber;
                            this.newWork.id = uniqid();

                            this._workService.saveWork(this.newWork);
                            this.newWork = {
                                contact: "",
                                price: null,
                                userId: this._auth.currentUser.uid,
                                location: null,
                                phone: null,
                                id: null
                            };
                            this.visible = false;
                            this.messageService.add({detail: "Подработка добавлена", severity: "succes", summary: "Подработка"});
                        }

                    });

                }).catch(v => {
                    debugger
                });
            }
        }
    }

    searchAddress(event) {

        if (event.query.split(" ").length < 2) return;

        const params = new HttpParams()
            .set("q", event.query)
            .set("format", "json")
            .set("limit", "5")
            .set("accept-language", "ru-RUS")
            .set("addressdetails", "1");


        this.httpClient.get("https://nominatim.openstreetmap.org/search", { params }).pipe(
		    debounceTime(300),
        ).subscribe({
            next: (v: INominatimAddressResponse[]) => {

                this.suggestions = v.map((address) => {

                    const res = {
                        coordinates: [address.lon, address.lat],
                        toString(): string {
                            return this.value;
                        },
                        value: ""
                    };

                    const city = address.address?.city ?? "";
                    const road = address.address?.road ?? "";
                    const house_number = address.address?.house_number ?? "";


                    if (city && road && house_number)
                        res.value = `${city}, ${road}, ${house_number}`;

                    if (!city && road && house_number)
                        res.value = `Выберите город, ${road}, ${house_number}`;

                    if (!city && road && !house_number)
                        res.value = `Выберите город, ${road}, введите номер дома`;
                    
                    if (city && !road && !house_number)
                        res.value = `${city},выберите улицу, введите номер дома`;

                    if (!city && !road && !house_number)
                        res.value = `выберите город, выберите улицу, введите номер дома`;

                    return res;

                });

            },
            error: (e) => {
                debugger
            }
        })

    }

    onSelect(event: {value: {
        coordinates: [number, number],
        value: string
    }}) {

        this.newWork.location = event.value.coordinates;
        this.newWork.address = event.value.value;
        
    }
}
