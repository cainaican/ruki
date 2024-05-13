import { Component } from '@angular/core';
import { Auth, User, updateProfile } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss'
})
export class CabinetComponent {

  public currentUser: User;
  public displayName: string;
  public email: string;
  public phoneNumber: string;
  public password: string;

  constructor(private _auth: Auth, private _store: Firestore){
    // this.currentUser = structuredClone(this._auth.currentUser);

    this.displayName = this._auth.currentUser.displayName
    this.email = this._auth.currentUser.email
    this.phoneNumber = this._auth.currentUser.phoneNumber

    this.currentUser = this._auth.currentUser;

  }

  updateCurrentUser(){

    const user = {...this._auth.currentUser, phoneNumber: this.phoneNumber }

    updateProfile(this._auth.currentUser, {
      displayName: this.displayName,
      
    })
    .then((v) => {
      debugger
    })
    .catch((e) => {
      debugger
    })
  }


}
