import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IServerResponse } from '../api/product';
import { IWork } from 'src/app/models/work';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Storage, StorageReference, ref, getBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable()
export class WorksService {

    worksCollection: CollectionReference;
    works$: Observable<IWork[]>;

    testRef: StorageReference;

    private firestore: Firestore = inject(Firestore);
    private storage: Storage = inject(Storage);

    constructor(private http: HttpClient) {
        this.worksCollection = collection(this.firestore, "works");
        this.works$ = collectionData(this.worksCollection) as Observable<IWork[]>;
        this.testRef = ref(this.storage, 'chp.jpg');
        
    }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }

    getWorks() {
        return this.works$;
    }

    saveWork(work: IWork) {

        if (!work) return;

        addDoc(this.worksCollection, <IWork> work).then((documentReference: DocumentReference) => {
            debugger
        });
    }

    getImageLink(): Promise<string> {
        return getDownloadURL(this.testRef);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }
}

