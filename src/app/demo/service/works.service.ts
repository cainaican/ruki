import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IServerResponse } from '../api/product';
import { IWork } from 'src/app/models/work';
import { CollectionReference, DocumentData, DocumentReference, Firestore, QuerySnapshot, addDoc, collection, collectionData, deleteDoc, deleteField, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StorageReference, getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EPubSubEvents, PubSubService } from './pub-sub.service';

@Injectable()
export class WorksService {

    worksCollection: CollectionReference;
    works$: Observable<IWork[]>;

    testRef: StorageReference;

    // private firestore: Firestore = inject(Firestore);

    constructor(
        private _http: HttpClient,
        private _store: Firestore,
        private _router: Router,
        private _messageService: MessageService,
        private _pubSubService: PubSubService<EPubSubEvents>,
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

        addDoc(this.worksCollection, <IWork> work)
            .then((documentReference: DocumentReference) => {
                // window.location.reload();

                this._pubSubService.sub.next(EPubSubEvents.defaultUpdate);
                
                this._messageService.add({severity: "success", detail: "Подработка успешно добавлена"});
            })
            .catch((e) => {
                this._messageService.add({severity: "error", detail: "Возникли проблемы при добавлении подработки"});
            })
    }

    deleteWork(work: IWork) {

        if (!work) return null;

        const q = query(collection(this._store, "works"), where("id", "==", work.id));

        getDocs(q)
            .then((v: QuerySnapshot<DocumentData, DocumentData>) => {

                if (v.empty) {
                    this._messageService.add({severity: "error", detail: "Не найдена подработка с таким id"});
                    return null;
                }

                if (v.docs.length > 1) {
                    this._messageService.add({severity: "error", detail: "Обнаружены одинаковые идентификаторы"});
                    return null;
                }

                return deleteDoc(v.docs[0].ref);
            })
            .then((v) => {
                // window.location.reload();
                this._pubSubService.sub.next(EPubSubEvents.defaultUpdate);

                this._messageService.add({severity: "success", detail: "Подработка успешно удалена"});
            })
            .catch((e) => {
                this._messageService.add({severity: "error", detail: "Обнаружена ошибка при удалении"});
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

