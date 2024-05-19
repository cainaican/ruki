import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, User, updateProfile } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { WorksService } from '../../service/works.service';
import { IWork } from 'src/app/models/work';
import { MessageService } from 'primeng/api';
import { EPubSubEvents, PubSubService } from '../../service/pub-sub.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss'
})
export class CabinetComponent implements OnInit, OnDestroy {

  public currentUser: User;
  public displayName: string;
  public phoneNumber: string;
  public password: string;

  public userWorks: IWork[];
  public subs: Subscription[] = [];

  public editingEnabled = false;
  public editingButtonIcon = "pi pi-pencil";



  constructor(
    private _auth: Auth, 
    private _store: Firestore,
    private _worksService: WorksService,
    private _messageService: MessageService,
    private _pubSubService: PubSubService<EPubSubEvents>,
    private _router: Router,
  ){

    this.defaultUpdate = this.defaultUpdate.bind(this);
  }

  ngOnInit(){

    const sub = this._pubSubService.sub.subscribe({
      next: () => {
        this.defaultUpdate();
      },
      error:(e) => {
        console.log("cabinet comp, redirect error");
      }
    });
    
    this.displayName = this._auth.currentUser.displayName
    this.phoneNumber = this._auth.currentUser.phoneNumber

    this.currentUser = this._auth.currentUser;

    this._worksService.getUsersWorks(this._auth.currentUser.uid)
      .then((v) => {
        if(v.empty) return;
        this.userWorks = (v.docs.map(snapshot => snapshot.data()) as IWork[]);
      })
      .catch((e) => {
        this._messageService.add({detail: "Ошибка при получении подработок", severity: "error", summary: "Подработки"})
      })

      this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  updateCurrentUser(){

    const user = {...this._auth.currentUser, phoneNumber: this.phoneNumber }

    updateProfile(this._auth.currentUser, {
      displayName: this.displayName,
      
    })
    .then((v) => {
      this.displayName = this._auth.currentUser.displayName;
      this._messageService.add({severity: "success", detail: "Данные обновлены", summary: "Данные"})
    })
    .catch((e) => {
      this._messageService.add({severity: "error", detail: "Произошла оишбка при обновлении данных", summary: "Данные"})
    })
  }

  deleteWork(work: IWork){
    this._worksService.deleteWork(work);
  }

  toggleEditing() {
    if (this.editingEnabled) {
      this.updateCurrentUser();
      this.editingButtonIcon = "pi pi-pencil";
      this.editingEnabled = false;
      return;
    }
    this.editingEnabled = true;
    this.editingButtonIcon = "pi pi-save";

  }

  defaultUpdate(){

    this.ngOnDestroy();

    this._router.navigateByUrl("cabinet", {
			replaceUrl: true
		}).then(() => {
			this.ngOnInit();
		});

  }


}
