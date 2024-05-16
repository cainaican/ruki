import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth, User, updatePassword } from "@angular/fire/auth";
import { CollectionReference, DocumentData, Firestore, QuerySnapshot, collection, collectionData, getDocs, query, where } from "@angular/fire/firestore";
import { Observable } from "rxjs";

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
    ) { 
        this.usersCollection = collection(this._store, "users");
        this.users$ = collectionData(this.usersCollection) as Observable<IUserItem[]>;
    }

    getUserByPhoneNumber(number: string): Promise<QuerySnapshot<unknown, DocumentData>> {

        const q = query(collection(this._store, "users"), where("phoneNumber", "==", number));

        return getDocs(q);
    }
}
