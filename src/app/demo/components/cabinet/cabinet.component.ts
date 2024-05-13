import { Component, OnInit } from '@angular/core';
import { Auth, User, updateProfile } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { WorksService } from '../../service/works.service';
import { IWork } from 'src/app/models/work';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss'
})
export class CabinetComponent implements OnInit {

  public currentUser: User;
  public displayName: string;
  public phoneNumber: string;
  public password: string;

  public userWorks: IWork[];

  constructor(
    private _auth: Auth, 
    private _store: Firestore,
    private _worksService: WorksService,
    private _messageService: MessageService,
  ){

    this.displayName = this._auth.currentUser.displayName
    this.phoneNumber = this._auth.currentUser.phoneNumber

    this.currentUser = this._auth.currentUser;

  }

  ngOnInit(){
    this._worksService.getUsersWorks(this._auth.currentUser.uid)
      .then((v) => {
        if(v.empty) return;
        this.userWorks = (v.docs.map(snapshot => snapshot.data()) as IWork[]);
      })
      .catch((e) => {
        this._messageService.add({detail: "Ошибка при получении подработок", severity: "error", summary: "Подработки"})
      })
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
