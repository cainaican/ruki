import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IServerResponse } from '../api/product';
import { IWork } from 'src/app/models/work';
import { CollectionReference, DocumentData, DocumentReference, Firestore, QuerySnapshot, addDoc, collection, collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StorageReference, getDownloadURL } from '@angular/fire/storage';

@Injectable()
export class WorksService {

    worksCollection: CollectionReference;
    works$: Observable<IWork[]>;

    testRef: StorageReference;

    // private firestore: Firestore = inject(Firestore);

    constructor(
        private _http: HttpClient,
        private _store: Firestore,
    ) {
        this.worksCollection = collection(this._store, "works");
        this.works$ = collectionData(this.worksCollection) as Observable<IWork[]>;
    }

    getProductsSmall() {
        return this._http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }

    getAllWorks() {
        return this.works$;
    }

    getUsersWorks(uid: string): Promise<QuerySnapshot<unknown, DocumentData>> {
        const q = query(collection(this._store, "works"), where("userId", "==", uid));
        return getDocs(q);
    }

    saveWork(work: IWork) {

        if (!work) return;

        addDoc(this.worksCollection, <IWork> work).then((documentReference: DocumentReference) => {
            debugger
        });
    }

    getImageLinks(url: StorageReference ): Promise<string> {
        return getDownloadURL(url);
    }

    getProductsMixed() {
        return this._http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this._http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as IServerResponse[])
            .then(data => data);
    }
}

