import { Component, OnDestroy, inject } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, signOut, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { em } from '@fullcalendar/core/internal-common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
})
export class LoginComponent implements OnDestroy {

    private auth: Auth = inject(Auth);

    passwordString: string;
    passwordRepeatString: string;
    loginString: string;

    loggedIn: boolean;
    signedIn: boolean;

    user$ = user(this.auth);
    userSubscription: Subscription;

    constructor(
        public layoutService: LayoutService, 
        private messageService: MessageService,
        private router: Router
    ) { 
        this.userSubscription = this.user$.subscribe((aUser: User | null) => {
            //handle user state changes here. Note, that user will be null if there is no currently logged in user.
         console.log(aUser);

         if (aUser) {
            this.loggedIn = true;
            return;
         } 
         this.loggedIn = false;

        })
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    login() {
        signInWithEmailAndPassword(this.auth, this.loginString, this.passwordString)
        .then((v) => {
            const mes: Message = {detail: `Здравствуйте ${v.user.email}`, severity: "success", summary: "Аутентификация"}
            this.messageService.add(mes);

            this.router.navigateByUrl("/");
        })
        .catch((e) => {
            const mes: Message = {detail: e.message, severity: "error", summary: "Аутентификация"}
            this.messageService.add(mes);
        })
    }

    logout() {
       signOut(this.auth);
    }

    signIn() {

        if (this.passwordString.length < 6) {
            const mes: Message = {detail: "Пароль должен быть более 6 символов", severity: "error", summary: "Регистрация"};
            this.messageService.add(mes);
            return;
        }

        if (this.passwordString !== this.passwordRepeatString) {
            const mes: Message = {detail: "Пароли не совпадают", severity: "error", summary: "Регистрация"};
            this.messageService.add(mes);
            return;
        }

        createUserWithEmailAndPassword(this.auth, this.loginString, this.passwordString)
        .then(v => {
            const mes: Message = {detail: "Вы успешно зарегистрированы", severity: "success", summary: "Регистрация"};
            this.loginString = "";
            this.passwordString = "";
            this.passwordRepeatString = "";
            this.messageService.add(mes);
            this.router.navigateByUrl("/");
        })
        .catch((e) => {
            const mes: Message = {detail: e.message, severity: "error", summary: "Регистрация"}
            this.messageService.add(mes);
        })
    }

    changeForm() {
        this.signedIn = !this.signedIn;
    }

}
