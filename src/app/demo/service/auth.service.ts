import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth, User, updatePassword } from "@angular/fire/auth";
import { CollectionReference, DocumentData, DocumentReference, Firestore, QuerySnapshot, addDoc, collection, collectionData, getDocs, query, where } from "@angular/fire/firestore";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { IWork } from "src/app/models/work";

export interface IUserItem {
    name: string;
    phoneNumber: string;
    userId: string;
}

@Injectable()
export class AuthService {

    private usersCollection: CollectionReference;
    private users$: Observable<IUserItem[]>;

    constructor(
        private _auth: Auth,
        private _store: Firestore,
        private _messageService: MessageService,
    ) { 
        this.usersCollection = collection(this._store, "users");
        this.users$ = collectionData(this.usersCollection) as Observable<IUserItem[]>;
    }

    getUserByPhoneNumber(number: string): Promise<QuerySnapshot<unknown, DocumentData>> {

        const q = query(collection(this._store, "users"), where("phoneNumber", "==", number));

        return getDocs(q);
    }

    saveUser(user: IUserItem) {

        if (!user) return null;

        return addDoc(this.usersCollection, <IUserItem> user);
            
    }

}
